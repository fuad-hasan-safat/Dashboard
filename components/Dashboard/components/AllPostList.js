import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import NotFound from "../../common/nofFound";
import { apiBasePath } from "../../../utils/constant";
import { AdminContext } from "../../store/adminpanel-context";
import PostDetails from "./SeePost";
import EditPost from "./EditPost";
import DialugueModal from "../../common/notification/DialugueModal";

const AllPostList = () => {

  const dialogueRef = useRef();
  const {setViewPost, isViewPost, setEditPost, isEditpost, setDeletepostId, deletePostId} = useContext(AdminContext);
  const [userType, setUserType] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    setUserType(localStorage.getItem("usertype") || "");
  }, []);

  useEffect(() => {
    fetchPostList();
  }, []);

  const fetchPostList = () => {
    fetch(`${apiBasePath}/postlist`)
      .then((response) => response.json())
      .then((datas) => {
        const filteredPost = datas.map((data) => ({
          title: data.title,
          writer: data.writer,
          content: data.content,
          _id: data._id,
          status: data.status,
          category: data.category,
        }));
        setPostList(filteredPost);
        setIsLoaded(true);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  function recoveStatusOfSelectedPost(id) {
    setPostList((prevPostList) =>
      prevPostList.map((post) =>
        post._id === id ? { ...post, status: !post.status } : post
      )
    );
  }

  async function revokeStatus(id, status) {
    const data = {
      status: !status,
    };
    const jsonData = JSON.stringify(data);

    try {
      const response = await fetch(`${apiBasePath}/toggleposts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });
      const updatedData = await response.json();
      recoveStatusOfSelectedPost(id);
      console.log("Data updated successfully:", updatedData);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }

  async function deletePost() {
    try {
      await axios.delete(`${apiBasePath}/posts/${deletePostId}`);
      setPostList((prevPostList) =>
        prevPostList.filter((post) => post._id !== deletePostId)
      );
      dialogueRef.current.close();
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Failed to Delete");
    }
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Filter posts based on search term
  const filteredPosts = postList.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredPosts.length / postsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset pagination when search term changes
  };

  function handleDeletePost(id){
    setDeletepostId(id);
    dialogueRef.current.showModal();
  }

  if (!isLoaded) return null;

  if(isViewPost) {
    return(
      <PostDetails/>
    )
  }

  if(isEditpost){
    return <EditPost/>
  }

  if (userType === "admin") {
    return (
      <div className="all__page__content__block clearfix">
      <DialugueModal ref={dialogueRef} alert='আপনি কি পোস্ট মুছে ফেলতে চান' address={deletePost} type='delete' />
       <div className="w-full clearfix">
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
          <div className="all__post__list__overflow">
            <table className="table">
              <thead>
                <tr className="clearfix">
                  <th>No</th>
                  <th scope="col">Post Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Created By</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.length > 0 ? (
                  currentPosts.map((post, index) => (
                    <tr key={post._id} className="clearfix">
                      <td>{indexOfFirstPost + index + 1}</td>
                      <td>{post.title}</td>
                      <td>{post.category}</td>
                      <td>{post.writer}</td>
                      <td>
                        <button
                          className={`${
                            post.status ? "text-green-500" : "text-red-500"
                          }`}
                          onClick={() => {
                            revokeStatus(post._id, post.status);
                          }}
                        >
                          {post.status ? "Revoke Status" : "Give Status"}
                        </button>
                      </td>
                      <td>

                        <i onClick={()=>setViewPost(post._id, true)} className="ri-eye-fill"></i>
                        <i onClick={()=>setEditPost(post._id, true) } className="ri-edit-line"></i>
                        <i
                          className="ri-delete-bin-6-line"
                          onClick={() => handleDeletePost(post._id)}
                        ></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No posts found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="dashboard__pagination">
          <button
            className="dashboard__prev_next"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <i className="ri-arrow-left-double-line"></i>
          </button>
          {Array.from(
            { length: Math.ceil(filteredPosts.length / postsPerPage) },
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
            onClick={handleNextPage}
            disabled={
              currentPage === Math.ceil(filteredPosts.length / postsPerPage)
            }
          >
            <i className="ri-arrow-right-double-fill"></i>
          </button>
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
};

export default AllPostList;