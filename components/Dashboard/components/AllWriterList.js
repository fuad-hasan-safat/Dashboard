import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { apiBasePath } from "../../../utils/constant";
import NotFound from "../../common/nofFound";
import DialugueModal from "../../common/notification/DialugueModal";

const WriterList = () => {

  const dialogueRef = useRef();
  const [userType, setUserType] = useState("");
  const [writerList, setWriterList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [writersPerPage] = useState(5); // Number of writers per page
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [selectedWriterId, settSelectedWriterId] = useState(null);

  useEffect(() => {
    setUserType(localStorage.getItem("usertype") || "");
  }, []);

  useEffect(() => {
    fetchWriterList();
  }, []);

  const fetchWriterList = () => {
    fetch(`${apiBasePath}/writers`)
      .then((response) => response.json())
      .then((data) => {
        setWriterList(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const deletSelectedWriter = (id) => {
    setWriterList((prevWriterList) =>
      prevWriterList.filter((writer) => writer._id !== id)
    );
  };

  const deleteData = async (id) => {
    try {
      const response = await axios.delete(`${apiBasePath}/writers/${id}`);
      console.log("Delete successful:", response.data);
      deletSelectedWriter(id);
      return response.data;
    } catch (error) {
      console.error("Error deleting data:", error);
      throw error;
    }
  };

  const deleteWriter = async () => {
    try {
      await deleteData(selectedWriterId);
      dialogueRef.current.close();
    } catch (error) {
      alert("Failed to Delete");
    }
  };

  // Pagination logic
  const indexOfLastWriter = currentPage * writersPerPage;
  const indexOfFirstWriter = indexOfLastWriter - writersPerPage;
  const currentWriters = writerList.slice(indexOfFirstWriter, indexOfLastWriter);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredWriterList.length / writersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle search input change
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset pagination when search term changes
  };

  // Filter writers based on search term
  const filteredWriterList = writerList.filter((writer) =>
    writer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleWriterDlete(id){
    settSelectedWriterId(id);
    dialogueRef.current.showModal();
  }

  if (userType === "admin") {
    return (
      <div className="all__page__content__block clearfix">
      <DialugueModal ref={dialogueRef} alert='আপনি কি লেখক মুছে ফেলতে চান' address={deleteWriter} type='delete' />
       <div className="clearfix">
        <div className="all__post__search">
          <input
            type="search"
            placeholder="Enter Search.."
            value={searchTerm}
            onChange={handleChange}
          />
          <button>
            <i className="ri-search-eye-line"></i>
          </button>
        </div>
        </div>
        <div className="all__post__list__wrap clearfix">
          <div className="all__post__category all__post__list__overflow clearfix">
          <table className="table">
            <thead>
              <tr className="clearfix">
                <th>No</th>
                <th scope="col">Writer Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredWriterList.length > 0 ? (
                filteredWriterList.map((writer, index) => (
                  <tr key={writer._id} className="clearfix">
                    <td>{indexOfFirstWriter + index + 1}</td>
                    <td>{writer.name}</td>
                    <td>
                      {/* <i className="ri-eye-fill"></i> */}
                      {/* <i className="ri-edit-line"></i> */}
                      <i
                        className="ri-delete-bin-6-line"
                        onClick={() => handleWriterDlete(writer._id)}
                      ></i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="clearfix">
                  <td colSpan="3">No writers found</td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </div>
        <div className="dashboard__pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            <i class="ri-arrow-left-double-line"></i>
          </button>
          {Array.from(
            { length: Math.ceil(filteredWriterList.length / writersPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            )
          )}
          <button
            onClick={nextPage}
            disabled={currentPage === Math.ceil(filteredWriterList.length / writersPerPage)}
          >
            <i class="ri-arrow-right-double-fill"></i>
          </button>
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
};

export default WriterList;