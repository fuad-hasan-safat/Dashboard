'use client'
import React, { useEffect, useRef, useState } from 'react'
import { apiBasePath } from '../../utils/constant'
import { useRouter } from 'next/router'
import axios from 'axios'
import { convertToBengaliDate } from '../../utils/convertToBanglaDate'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DialugueModal from './notification/DialugueModal'
import Link from 'next/link'

export default function UserPostTitleAndcover({
  id,
  title = '',
  writer = '',
  writer_id,
  writer_image = '',
  image = '',
  postStatus = false,
  isProfile = false,
  uploadedBy = '',
  profileName = '',
  updatedAt = '',
}) {

  console.log('single post banner ', title, image)
  const router = useRouter()

  const [isMounted, setIsMounted] = useState(false)

  const dialogueRef = useRef()
  const editPostRef = useRef()
  useOutsideAlerter(editPostRef);

  let notification = '';
  const [isMoreClick, setIsMoreClick] = useState(false)
  const formattedDate = formatDate(updatedAt);

  function moreOptionHandler() {
    setIsMoreClick((prevState) => !prevState)
  }



  useEffect(() => {
    setIsMounted(true);
  }, [])

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          // alert("You clicked outside of me!");
          setIsMoreClick(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }


  if(!isMounted) return null;

  function formatDate(isoString) {
    const date = new Date(isoString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function reloadPage() {
    setTimeout(() => {
      router.reload()
    }, 2500)
  }

  async function deletePost() {
    console.log('Delete id----', id)
    try {
      const response = await axios.delete(`${apiBasePath}/posts/${id}`);
      console.log('Delete successful:', response.data);

      notification = 'পোস্টটি মুছে ফেলা হয়েছে'
      notify();

      dialogueRef.current.close();

      reloadPage();
      return response.data;
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }


  }



  const banglaDate = convertToBengaliDate(formattedDate)

  let bannerImage = image;

  if (image === undefined || image === null || image === 'undefined') {
    bannerImage = writer_image;
  }

  let writerImage = writer_image

  if (writer_image === undefined || writer_image === null || writer_image === 'undefined') {
    writerImage = ''
  }



  // let shortenTitle = title?.length > 23 ? `${title?.slice(0, 22)}...` : title;
  // let shortenWriter = writer?.length > 26 ? `${writer?.slice(0, 25)}...` : writer;
  // let shortenUploadedBy = postuploadedBy?.length > 12 ? `${postuploadedBy?.slice(0, 12)}...` : postuploadedBy;

  let shortenTitle = title;
  let shortenWriter = writer;

  let defaultBannerImage = '/images/defaultUserPic/square/null.png'



  const notify = () => toast.warn(notification, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,

  });

  let writerClickLink = `/postswriter/${writer_id}`;

  if (localStorage.getItem('uuid')?.trim() === uploadedBy) {
    writerClickLink = `/user/${uploadedBy}`;
  }

  return (
    <>
      <DialugueModal ref={dialogueRef} alert='আপনি কি পোস্ট মুছে ফেলতে চান' address={deletePost} type='delete' />

      <div className="profile__auth__wrap space-x-[15px]">

        <div className="profile__auth__img">

          <img className="object-cover lg:w-[120px] lg:h-[120px] md:w-[110px] md:h-[110px] sm:w-[100px] sm:h-[100px] xs:w-[80px] xs:h-[80px] rounded-[16px] block m-auto" src={bannerImage === '' ? defaultBannerImage : `${apiBasePath}/${bannerImage?.slice(bannerImage?.indexOf('/') + 1)}`} alt="" />

        </div>

        <div className="hm__post__profile__grid  relative">
          <div className="">
            <h1 className="lg:text-[32] md:text-[25px] sm:text-[23px] xs:text-[14px] leading-7 pr-[40px] text-[#FCD200] font-bold" style={{ lineHeight: '1.2' }}>{shortenTitle}</h1>
          </div>

          <Link className="flex items-center lg:text-[18px] md:text-[16px] sm:text-[14px] xs:text-[12px]  font-semibold text-[#595D5B] " href={writerClickLink} >
            <span className='inline-block mr-[10px]'>
              <img className="lg:w-[24px] lg:h-[24px] md:w-[22px] md:h-[22px] sm:w-[20px] sm:h-[20px] xs:w-[18px] xs:h-[18px] rounded-full block m-auto shadow-lg" src={writerImage === '' ? defaultBannerImage : `${apiBasePath}/${writerImage?.slice(writerImage.indexOf('/') + 1)}`} alt="" />
            </span>

            <span className='inline-block'> {shortenWriter} </span></Link>
          <div className="hm__post__profile__info text-[16px] font-thin leading-1 pt-[5px]">
            <Link className="flex place-content-start items-center leading-1 lg:text-[16px] md:text-[15px] sm:text-[14px] xs:text-[12px]  text-[#595D5B]" href={writerClickLink} style={{ lineHeight: '1' }} >

              {/* {((uploadedBy !== null) && uploadedBy.length > 0) && <> <span className='inline-block mr-[10px]'>
                <img className="w-[24px] h-[24px] rounded-full block m-auto shadow-lg" src={writerImage === '' ? defaultBannerImage : `${apiBasePath}/${writerImage?.slice(writerImage.indexOf('/') + 1)}`} alt="" />
              </span>
                <span className='inline-block lg:text-[16px] md:text-[15px] sm:text-[14px] xs:text-[11px] text-[#595D5B] mr-[15px]'>
                  {shortenUploadedBy}

                </span></>} */}
              {updatedAt.length > 0 && <>  <span className='inline-block '>
                <img src='/images/usericons/calender.svg' />
              </span>
                <span className='inline-block leading-1 ml-[10px] lg:text-[16px] md:text-[15px] sm:text-[14px] xs:text-[11px] text-[#595D5B]'>
                  {banglaDate}
                </span></>}
            </Link>
          </div>

          {isProfile &&
            <>
              <button
                onClick={moreOptionHandler}
                className='absolute top-0 right-[-40px] text-[20px] rounded-full bg-[#EFEFEF] w-[38px]'><i class="ri-more-2-line"></i>
              </button>
              {isMoreClick &&
                <ul ref={editPostRef} className=' mt-[15px] absolute top-[35px] right-0 lg:text-[15px] sm:text-[13px] xs:text-[13px] backdrop-blur-md shadow-xl bg-[#FCF7E8] z-[1000] origin-top-right w-[110px] rounded-md  ring-opacity-5 focus:outline-none'>
                  <li
                    className="block cursor-pointer hover:bg-[#F9A106]  hover:text-white"

                  >
                    <button onClick={() => router.push(`/user/editpost/${id}`)} className=' w-full text-center'>সম্পাদন</button>
                  </li>
                  <hr />


                  <li
                    className="block cursor-pointer  hover:bg-[#F9A106]  hover:text-white"

                  >
                    <button onClick={() => dialogueRef.current.showModal()} className=' w-full text-center'>মুছে ফেলুন</button>
                  </li>


                </ul>}
            </>
          }

        </div>

      </div>

      <div className='text-[16px]'>
        <ToastContainer />
      </div>


    </>
  )
}
