import React, { useState } from 'react'
import { apiBasePath } from '../../../../utils/constant';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateRating({ setUserComments }) {
    const router = useRouter();

    const [userRating, setUserRating] = useState('');
    let notification = '';

    function reloadPage(){
        setTimeout(()=>{
        router.reload();
        }, 1000)
      }

    async function submitRating() {
        if (localStorage.getItem('uuid').length > 0 && localStorage.getItem('uuid')) {
            const postData = {
                ebook_id: `${router.query.slug}`,
                name: localStorage.getItem('name'),
                comment: userRating,
                user_id: localStorage.getItem('uuid')
            };

            console.log({ postData })

            if (postData.comment.trim() === '') {
                notification = 'দয়া করে আপনার মন্তব্য লিখুন ।';
                notify();
                return;
            };

            try {
                const response = await axios.post(`${apiBasePath}/commentaudiobook`, postData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const result = response.data;
                notification = 'আপনার মন্তব্য প্রেরণ সফল হয়েছে।';
                notify1();
                setUserRating('')
                setUserComments((prevData) => ([
                    ...prevData,
                    postData
                ]))
                console.log('Response:', result); // Handle the response as needed
                // reloadPage();
            } catch (error) {
                console.error('Error submitting rating:', error);
                notification = 'আপনার মন্তব্য যায়নি।';
                notify();
            }

        }

    }



    const notify1 = () => toast.success(notification, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,

    });
    const notify = () => toast.warn(notification, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,

    });

    return (
        <div className={``}>
            <ToastContainer />

            <textarea
                id="message"
                name="message"
                placeholder='আপনার মন্তব্য'
                value={userRating}
                onChange={(e) => setUserRating(e.target.value)}
                required
                className='bg-[#FCF7E8] text-gray-500 text-[20px] w-full lg:h-[270px] md:h-[240px] sm:h-[220px] xs:h-[180px] rounded-[5px] p-5 focus:outline-none focus:border-b-[3px] focus:border-b-[#F9A106]'
            />

            <button
                onClick={submitRating}
                className={`page__common__btn contact__form__btn font-[600] bg-[#F9A106] w-full h-[50px] mt-[10px] rounded-[5px] lg:text-[20px] md:text-[18px] sm:text-[17px] xs:text-[16px] pt-[5px] text-white`}
            >
                সাবমিট
            </button>

        </div>
    );
}
