
"use client";
import { useEffect, useState } from "react";
import MainContentDivider from "../common/mainContentDivider";
import { apiBasePath } from "../../utils/constant";
import SobUserPostBody from "./SobUserPostBody";
import Loading from "../common/loading";
import axios from "axios";
import { countWords } from "../../function/api";
import SinglePostConponent from "../common/singlePostComponent";

export default function ProfilePostLeftContent({ slug }) {
  //   const [selectedId, setSelectedId] = useState("sob");
  const [postList, setPostList] = useState([])
  const [isLoading, setIsLoading] = useState(true);


  const [data, setData] = useState(null); // State to store fetched data
  const [error, setError] = useState(null); // State to store any errors
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const postsPerPage = 5; // Number of posts to display per page


  useEffect(() => {

    console.log("user profile post---------------------->>>>>>>>>>>>><<<<<<<<<<<<<<<< SLUG ", slug)

    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${apiBasePath}/postsbyuser/${slug}`); // Use Axios
        const data = response.data; // Assuming the response structure
        setPostList(data.object);

        console.log("user profile post writer---------------------->>>>>>>>>>>>><<<<<<<<<<<<<<<< data ", data.object)


        // Calculate total pages based on posts and postsPerPage
        setTotalPages(Math.ceil(data.object.length / postsPerPage));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();


  }, []);


  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = Math.min(startIndex + postsPerPage, postList.length); // Ensure endIndex doesn't exceed posts length

  const displayedPosts = postList.slice(startIndex, endIndex);


  return (

    <div className="text-black">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <div>Error fetching posts: {error.message}</div>
      ) : (
        <>
          {/* <div className='container'> */}
          {postList.length > 0 ?
            <div className='flex'>
              <div className="lakha__main__content pt-20 text-3xl lg:mr-[100px] md:mr-[50px]">
                {displayedPosts.length && (
                  displayedPosts.map((post, index) => (
                    <>
                      <div key={index}>
                        <SinglePostConponent
                          id={post._id} // Assuming '_id' is the unique identifier
                          title={post.title}
                          writer={post.writer}
                          writer_id={post?.writer_id}
                          image={post?.image}
                          category={post.category}
                          content={post.category === 'কবিতা' ? countWords(post.content, 20) : countWords(post.content, 50)}


                        />
                      </div>
                      {index < displayedPosts.length - 1 && <MainContentDivider />}
                    </>
                  ))
                )}
              </div>
            </div> :
            <div className="pt-10"> এই মুহূর্তে কোনো লেখা নেই </div>

          }
          {totalPages > 1 && <div className="py-10 space-x-4"> {/* Add a class for styling */}
            <button
              className="text-[16px] bg-orange-400 px-2 text-white rounded-2xl h-[40px]"

              onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
              প্রথম পৃষ্ঠা
            </button>
            <button
              className="text-[16px] bg-orange-400 px-2 text-white rounded-2xl h-[40px]"

              onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              পূর্ববর্তী পৃষ্ঠা
            </button>
            <span
              className="text-sm "
            >পৃষ্ঠা {currentPage} এর {totalPages}</span>
            <button
              className="text-[16px] bg-orange-400 px-2 text-white rounded-2xl h-[40px]"

              onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              পরবর্তী পৃষ্ঠা
            </button>
            <button
              className="text-[16px] bg-orange-400 px-2 text-white rounded-2xl h-[40px]"

              onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
              শেষ পৃষ্ঠা
            </button>
          </div>
          }
          {/* </div> */}
        </>
      )}
    </div>

  )
}

