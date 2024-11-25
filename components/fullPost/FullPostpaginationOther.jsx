'use client'

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { apiBasePath } from '../../utils/constant';
import axios from 'axios';

const FullPostPaginationOthers = ({ logText, customclass }) => {
  const router = useRouter()
  const slug = router.query.slug

  const [currentPage, setCurrentPage] = useState(0);
  const linesPerPage = 60;
  const logLines = logText?.split(`/</p>| <br>/`);
  const totalLines = logLines?.length;
  const totalPages = Math.ceil(totalLines / linesPerPage);
  const startIndex = currentPage * linesPerPage;
  const endIndex = startIndex + linesPerPage;
  const [userUuid, setUserUuid] = useState("");


  useEffect(() => {

    setUserUuid(localStorage.getItem("uuid") || "");

    getSavedpage();

    const uuid = localStorage.getItem("uuid") || "";

    if (uuid?.length <= 0) {
      setCurrentPage(0);
    }

  }, [router.query])

  // useEffect(() => {

  //   if (currentPage !== -1) {
  //     saveCurrentPage();
  //   }

  // }, [currentPage, router.query])

  const getSavedpage = async () => {
    
    const userUUID = localStorage.getItem("uuid") || ''
    console.log({ userUUID, slug, userUuid })

    if(userUUID?.length > 0){

      try {
        const response = await axios.post(
          `${apiBasePath}/getpostpage`,
          {
            userId: userUUID,
            postId: slug,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log('get page---', response)
  
        if (response.data.status === 'success') {
          setCurrentPage(response.data.saved_page)
        } else {
          console.log('response  eeeerrrrroooorrrr')
          setCurrentPage(0)
        }
  
      } catch (error) {
        console.log('api  eeeerrrrroooorrrr')

        setCurrentPage(0)
  
      }
    }else{
      setCurrentPage(0);
    }


  }


  const saveCurrentPage = async (selected) => {

    const userUUID = localStorage.getItem("uuid")

    console.log({ userUUID })

    if (userUUID?.length > 0) {
      console.log('current selected page-->>>', selected)
      try {
        const response = await axios.post(
          `${apiBasePath}/recordpostpage`,
          {
            userId: userUUID,
            postId: slug,
            currentPage: selected,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log('save  page---', response)


        if (response.status === 'success') {
          console.log("page save ----", response.msg)
        }

        if (response.status === 'failed') {
          console.log("page save ----", response.msg)
        }

      } catch (error) {

      }

    }


  }

  const handlePageChange = ({ selected }) => {

    setCurrentPage(selected);
    saveCurrentPage(selected);

  };



  if(currentPage > totalPages -1 ){
    setCurrentPage(totalPages-1)
  }


  return (
    router.isReady &&
    <div>

      <div>

        {logLines
          ?.slice(startIndex, endIndex)
          .map((line, index) => (
            <div key={startIndex + index} className={`mt-[15px] lg:text-[18px] md:text-[17px] sm:text-[16px] xs:text-[14px] text-justify  mb-[20px] ${customclass} linecntrl`} dangerouslySetInnerHTML={{ __html: line }} ></div>

          ))}

      </div>


      {totalPages > 1 && <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        forcePage={currentPage}
        containerClassName="pagination"
        activeClassName="active"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousLabel={'পূর্ববর্তী'}
        nextLabel={'পরবর্তী'}
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"

      />
      }

    </div>
    
  );
};

export default FullPostPaginationOthers;
