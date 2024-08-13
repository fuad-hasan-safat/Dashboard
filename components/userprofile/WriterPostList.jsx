
"use client";
import { useEffect, useState } from "react";
import MainContentDivider from "../common/mainContentDivider";
import Loading from "../common/loading";
import SinglePostConponent from "../common/singlePostComponent";

export default function WriterPostList({profileInfo, postList }) {
  //   const [selectedId, setSelectedId] = useState("sob");


  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const postsPerPage = 5; // Number of posts to display per page



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

      <>
        {/* <div className='container'> */}
        {postList.length > 0 ?
          <div className='flex'>
            <div className="lakha__main__content pt-[15px] text-3xl lg:mr-[100px] md:mr-[50px]">

              {postList.length && (
                postList.map((post, index) => (
                  <>
                    <div key={index}>
                      <SinglePostConponent
                        id={post._id} // Assuming '_id' is the unique identifier
                        title={post.title}
                        writer={post.writer}
                        writer_id={post.writer_id}
                        image={post?.image}
                        content={post.category === 'কবিতা' ? `${post.content.split(/\s+/).slice(0, 20).join(" ")}` : `${post.content.split(/\s+/).slice(0, 40).join(" ")}`} // Truncate content
                        category={post.category}
                        postStatus={post.status}
                        uploadedBy={post?.uploader_name}
                        writer_image={profileInfo?.image}
                        profileName={post?.profile_name}
                        updatedAt={post?.updatedAt}

                      />
                    </div>
                    {index < postList.length - 1 && <MainContentDivider />}
                  </>
                ))
              )}
            </div>
          </div> :
          <div className="pt-10"> এই মুহূর্তে কোনো লেখা নেই </div>

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

    </div>

  )
}

