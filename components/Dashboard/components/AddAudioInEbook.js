import React, { useEffect, useState } from 'react'
import { apiBasePath } from '../../../utils/constant';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddAudioInEbook() {

    const [audioData, setAudioData] = useState({
        file: [],
        image: null,
        ebook_id: '',
    });

    let notification = '';
    const [allBooks, setAllBooks] = useState([]);

    useEffect(() => {
        getAudioBookList()
    }, [])


    const resetAudioData = () => {
        setAudioData({
            file: null,
            image: null,
            ebook_id: '',
        })
    }

    async function getAudioBookList() {
        try {
            console.log('Inside try')
            const result = await axios.get(
                `${apiBasePath}/books`
            );
            console.log(result)
            setAllBooks(result.data)
        } catch (error) {
            console.log(error)
        }
    }


    const validateFields = () => {
        for (const key in audioData) {
            if (audioData[key] === '' || audioData[key] === null) {
                notification = `দয়া করে ${key} ফিল্ড পূরণ করুন.`;
                notify();
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Audio file', audioData)

        if (!validateFields()) {
            return
        };

        const formData = new FormData();
        for (const key in audioData) {
            console.log(key, audioData[key]);
            formData.append(key, audioData[key]);
        }


        try {
            console.log('before add audio api')
            const response = await fetch(`${apiBasePath}/addaudio`, {
                method: 'POST',
                body: formData
            });
            console.log('after add audio api')


            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
            notification = 'অডিও সফলভাবে যুক্ত হয়েছে';
            resetAudioData();
            notify1();
        } catch (error) {
            console.error('Error:', error);
            notification = "অডিও সফলভাবে যুক্ত হয়নি";
            notify();
        }
    }

    const handleChange = async (event) => {
        let audioFiles = []
        const { name, value, type, files } = event.target;
        if (type === 'file') {
            if (name === 'image') {
                const selectedFile = files[0];
                setAudioData((prevData) => ({
                    ...prevData,
                    image: selectedFile
                }))
            }
            if (name === 'audio') {
                const selectedFile = files[0];
                console.log('audio file ---', selectedFile)
                setAudioData((prevData) => ({
                    ...prevData,
                    file: selectedFile
                }))
            }
        }

        if (name === 'book') {
            setAudioData((prevData) => ({
                ...prevData,
                ebook_id: value
            }))
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

    return (
        <div className='admin__add__slider__wrap'>
            <ToastContainer/>
            <form onSubmit={handleSubmit}>
                <div className='audio__book__input__fields clearfix'>
                    <div className='admin__input  text-black'>
                        <label>অডিও ফাইল আপলোড করুন</label>
                        <input
                            name='audio'
                            type='file'
                            accept='audio/*'
                            multiple
                            onChange={handleChange}
                        />

                    </div>
                    <div className='admin__input text-black'>
                        <label>অডিও কভার ইমেজ</label>
                        <div className='audio__file__upload'>
                            <input
                                name='image'
                                type="file"
                                accept="image/*"
                                id="audioFileInput"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className='audio__book__input__fields clearfix'>
                    <div className='admin__input  text-black'>
                        <label>বই নির্বাচন করুন</label>
                        <select
                            name="book"
                            id="book"
                            value={audioData.ebook_id}
                            onChange={handleChange}
                        >
                            <option>বই নির্বাচন করুন</option>
                            {allBooks.map((book) => (
                                <option key={book._id} value={book._id}>
                                    {book.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </form>

            <div className='submit__btn flex  !mt-[40px]'>
                <div className='w-[50%] '>
                    <button
                        className="page__common__yello__btn w-[100%] max-w-[300px] h-[50px] bg-[#FCA000] rounded-md text-[16px] text-white items-center profile__btn__midl"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        'ক্রিয়েট করুন
                    </button>
                </div>
            </div>
        </div>
    )
}
