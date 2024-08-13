"use client";

import { useEffect, useState } from "react";
import MainContentDivider from "../common/mainContentDivider";
import { apiBasePath } from "../../utils/constant";
import Loading from "../common/loading";
import axios from "axios";
import SinglePostConponent from "../common/singlePostComponent";


export default function ProfilePostLeftContentUnApproved() {
  const [postList, setPostList] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null); // State to store fetched data
  const [error, setError] = useState(null); // State to store any errors
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const postsPerPage = 5; // Number of posts to display per page
  const [username, setUsername] = useState("");
  const [slug, setUserUuid] = useState("");
  const [userToken, setUserToken] = useState("");

  useEffect(() => {

    setUsername(localStorage.getItem("name") || "");
    setUserToken(localStorage.getItem("token") || "");
    setUserUuid(localStorage.getItem("uuid") || "");

  }, []);


  useEffect(() => {

    const fetchPosts = async () => {
      try {

        const response = await axios.get(`${apiBasePath}/unverifiedpostsbyuser/${localStorage.getItem("uuid")}`); // Use Axios
        const data = response.data;
        console.log('UN-APPROVED POST----->>', data)


        setPostList(data.object);
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

    <div className="text-black ">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <></>
      ) : (
        <>
          {/* <div className='container'> */}
          {postList.length > 0 &&
            <div className='flex'>
              <div className="lakha__main__content pt-[40px] text-3xl lg:mr-[100px] md:mr-[50px]">

                {/* <h1 className='lg:text-5xl md:text-3xl sm:text-xl xs:text-2xl text-black mb-[35px]'>অনুমোদনহীন  পোস্ট </h1> */}

                {postList.length && (
                  postList.map((post, index) => (
                    <>
                      <div key={index}>
                        <SinglePostConponent
                          id={post._id} // Assuming '_id' is the unique identifier
                          title={post.title}
                          writer={post.writer}
                          writer_id={post?.writer_id}
                          image={post?.image}
                          content={post.category === 'কবিতা' ? `${post.content.split(/\s+/).slice(0, 20).join(" ")}` : `${post.content.split(/\s+/).slice(0, 30).join(" ")}`} // Truncate content
                          category={post.category}
                          postStatus={post.status}
                          uploadedBy={post?.uploaded_by}
                          writer_image={post?.writer_image}
                          profileName={post?.profile_name}
                          updatedAt={post?.updatedAt}
                          isProfile={true}

                        />
                        <span className='page__common__yello__btn inline-block bg-[#F9A106] text-white rounded text-[13px] px-[10px] mt-[15px]'>অনুমোদনহীন</span>

                      </div>

                      {index < postList?.length && <MainContentDivider />}

                    </>
                  ))

                )}
              </div>

              <hr></hr>

            </div>


          }
          {/* {totalPages > 1 && <div className="py-10 space-x-4">

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
          } */}

        </>
      )}
    </div>

  )
}

