import React, { useState } from 'react'
import { apiBasePath } from '../../../utils/constant';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateAudioQuote() {

    let notification = '';

    const [quote, setQuote] = useState({
        title: ''
    })
    const handleChange = (event) => {
        const { value } = event.target;
        setQuote(prevState => ({ ...prevState, title: value }))
    }

    const validateFields = () => {
        for (const key in quote) {
            if (quote[key].trim() === '' || quote[key] === null) {
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateFields()) {
            notification = "সব ফিল্ড পূরণ করুন";
            notify();
            return
        };


        console.log('Submit quote --', quote.title)

        try {
            const response = await axios.post(`${apiBasePath}/createquote`, {
                title: quote.title
            });

            console.log('Success:', response.data);
            notification = 'বাণী সফলভাবে ক্রিয়েট হয়েছে';
            notify1();
            setQuote({ title: '' });
        } catch (error) {
            console.error('Error:', error);
            notification = "বাণী ক্রিয়েট হয়নি";
            notify();
        }
    }


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

    console.log('Quote --->>', quote.title)
    return (
        <div className='admin__add__slider__wrap clearfix'>
            <ToastContainer/>
            <form onSubmit={handleSubmit}>
                <div className='audio__book__input__field'>
                    <label>উক্তি লিখুন</label>
                    <input
                        name='title'
                        type='text'
                        placeholder='উক্তি লিখুন'
                        value={quote.title}
                        onChange={handleChange}
                    />
                </div>
            </form>
            <div className='submit__btn flex  !mt-[27px]'>
                <div className='w-[50%] pl-[12px]'>
                    <button
                        className="page__common__yello__btn w-[80%] h-[45px] bg-[#FCA000] rounded-md text-[16px] text-white items-center profile__btn__midl"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        ক্রিয়েট করুন
                    </button>
                </div>
            </div>
        </div>
    )
}
