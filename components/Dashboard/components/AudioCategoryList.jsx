import React, { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { apiBasePath } from "../../../utils/constant";
import NotFound from "../../common/nofFound";
import ContentList from "./ContentList";
import DialugueModal from "../../common/notification/DialugueModal";
import CreateCategory from "../../category/createCategory";
import { AdminContext } from "../../store/adminpanel-context";
import EditQuote from "./EditQuote";
import EdidtAudioCategory from "./EdidtAudioCategory";

const AudioCategoryList = () => {
  const router = useRouter();
  const dialogueRef = useRef();
  const {isEditCategory, setEditCategory} = useContext(AdminContext);

  const [userType, setUserType] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [selectedCatId, setSelectedId] = useState(null);
  const [isCategoryAdded, setIsCategoryAdded] = useState(false)

  useEffect(() => {
    setUserType(localStorage.getItem("usertype") || "");
  }, []);

  useEffect(() => {
    fetchCategoryList();
  }, [isCategoryAdded]);

  const fetchCategoryList = () => {
    fetch(`${apiBasePath}/audiocategories`)
      .then((response) => response.json())
      .then((data) => {
        setCategoryList(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const deleteCategory = () => {
    axios
      .delete(`${apiBasePath}/deletecategory/${selectedCatId}`)
      .then((response) => {
        console.log("Delete successful:", response.data);
        setCategoryList((prevCategoryList) =>
          prevCategoryList.filter((category) => category._id !== selectedCatId)
        );
        dialogueRef.current.close();
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        alert("Failed to Delete");
      });
  };

  // Pagination logic
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;

  // Filter categories based on search term
  const filteredCategories = categoryList.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentCategories = filteredCategories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredCategories.length / categoriesPerPage)) {
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


  function handleCategoryDelete(id){
    setSelectedId(id);
    dialogueRef.current.showModal();
  }

  function handleCategoryEdit(id, title, image = null, color, background){
    setEditCategory({
        id: id,
        title: title,
        image: image,
        color: color,
        background: background,
        apiUrl: 'updateaudiocategory'
    },'audiocategory')
  }

  if(isEditCategory === 'audiocategory'){
    return <EdidtAudioCategory setIsCategoryAdded={setIsCategoryAdded}/>
  }


    return (
      <div className="all__page__content__block clearfix">
      <DialugueModal ref={dialogueRef} alert='আপনি কি লেখার ধরণ মুছে ফেলতে চান' address={deleteCategory} type='delete' />

      {/* <div>
        <CreateCategory setIsCategoryAdded={setIsCategoryAdded}/>
      </div> */}
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
          <div className="all__post__category all__post__list__overflow">
            <table className="table">
              <thead>
                <tr className="clearfix">
                  <th>No</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentCategories.length > 0 ? (
                  currentCategories.map((category, index) => (
                    <tr key={category._id} className="clearfix">
                      <td>{indexOfFirstCategory + index + 1}</td>
                      <td>{category.title}</td>
                      <td>
                        {/* <i className="ri-eye-fill"></i> */}
                        <i className="ri-edit-line"
                        onClick={()=>handleCategoryEdit(category._id,  category.title, category.image, category.color, category.background)}

                        ></i>
                        <i
                          className="ri-delete-bin-6-line"
                          onClick={() => handleCategoryDelete(category._id)}
                        ></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="clearfix">
                    <td colSpan="3">No categories found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="dashboard__pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            <i className="ri-arrow-left-double-line"></i>
          </button>
          {Array.from(
            { length: Math.ceil(filteredCategories.length / categoriesPerPage) },
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
            disabled={currentPage === Math.ceil(filteredCategories.length / categoriesPerPage)}
          >
            <i className="ri-arrow-right-double-fill"></i>
          </button>
        </div>
      </div>
    );
  }

export default AudioCategoryList;