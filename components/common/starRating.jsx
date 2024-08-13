'use client'

import { useRouter } from 'next/router'
import { apiBasePath } from '../../utils/constant'
import React, { useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function RatingComponent({ post_id, setRating, rating, notification }) {
  const router = useRouter()
  const [status, setStatus] = useState("");
  const [username, setUsername] = useState("");
  const [userUuid, setUserUuid] = useState("");
  const [userToken, setUserToken] = useState("");
  // let notification = ''

  // check if user is logged in
  useEffect(() => {
    setStatus(localStorage.getItem("status") || "");
    setUsername(localStorage.getItem("name") || "");
    setUserToken(localStorage.getItem("token") || "");
    setUserUuid(localStorage.getItem("uuid") || "");
  }, []);

  // Catch Rating value
  const handleRating = (rate) => {

    setRating(rate)

  }


  async function submitRating(id) {

    if (userUuid.length > 0) {

      const data = {
        rating: rating,
      }

      const response = await fetch(`${apiBasePath}/rating/${id}`, {

        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),

      });


      if (!response.ok) {

        throw new Error(`Error updating data: ${response.statusText}`);

      } else {

        // alert('রেটিং সফলভাবে সম্পন্ন হয়েছে');
        notification = 'রেটিং সফলভাবে সম্পন্ন হয়েছে';
        notify1();

      }

    } else {

      notification = 'দয়া করে লগইন করুন';
      notify();

      //   const confirmLogout = window.confirm('দয়া করে লগইন করুন');

      //   if (confirmLogout) {
      //     router.push('/account/login')
      //   }

    }

  }
  // Optinal callback functions
  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value, index) => console.log(value, index, rating)

  const notify = () => toast.warn(notification, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,

  });

  const notify1 = () => toast.success(notification, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,

  });



  return (
    <div className=''>


      <div className='relative start__rating place-content-center justify-center  mt-[50px] pt-[50px] pb-[50px] mx-[40px] mb-[50px] rounded-xl float-left text-center border-2 text-black border-gray-400'>

        <div className=''>
          <ToastContainer />
        </div>
        <p>রেটিং দিন ।</p>

        <div>

          <Rating
            style={{ float: 'left', textAlign: 'center' }}
            onClick={handleRating}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onPointerMove={onPointerMove}
          /* Available Props */
          />

        </div>

        <button
          onClick={() => submitRating(post_id)}
          className='bg-orange-400 px-2 py-1 text-white h-[34px] w-[195px] rounded-md'
        >
          সাবমিট
        </button>

      </div>
    </div>
  )
}