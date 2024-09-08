'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import Classes from './slider.module.css';
import { apiBasePath } from '../../../utils/constant';
import NotFound from '../../common/nofFound';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateSliderPage = () => {

    const [highlight, setHighlight] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [caption, setCaption] = useState('');
    const [related, setRelated] = useState('');
    const [optionList, setOptionList] = useState([])
    const [userType, setUserType] = useState("");

    let notification = '';


    useEffect(() => {
        setUserType(localStorage.getItem("usertype") || "");
    }, []);


    const customStyles = {
        menu: (provided) => ({
            ...provided,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            color: "#000"
        }),
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();


        const formData = new FormData();
        formData.append('profile_pic', imageFile);
        formData.append('')

        if (typeof window !== 'undefined') {
            // Perform localStorage action
            // const item = localStorage.getItem('key')
            const token = JSON.parse(localStorage.getItem('token'));
        }

    };

    useEffect(() => {
        fetch(`${apiBasePath}/posts`)
            .then((res) => res.json())
            .then(data => setOptionList(data))
    }, [])

    const options = optionList.map((value, index) => <option value={value._id} key={index}>{value.title}</option>)



    const saveData = async () => {


        if (!imageFile) {
            notification = "ইমেজ আপলোড করুন!";
            notify();
            return;
        }

        if (title?.trim()?.length <= 0) {
            notification = "শিরোনাম লিখুন!";
            notify();
            return;
        }

        if (caption?.trim()?.length <= 0) {
            notification = "লেখক এর নাম লিখুন!";
            notify();
            return;
        }

        if (content?.trim()?.length <= 0) {
            notification = "সংক্ষিপ্ত বিবরণ লিখুন!";
            notify();
            return;
        }

        if (content?.trim()?.length > 350) {
            notification = "সংক্ষিপ্ত বিবরণ ৩৫০ ক্যারেক্টার এর লিখুন!";
            notify();
            return;
        }


        if (related === '') {
            notification = "দয়া করে লেখা নির্বাচন করুন!";
            notify();
            return;
        }



        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('title', title);
        formData.append('caption', caption);
        formData.append('content', content);
        formData.append('related_content', related);


        try {
            const response = await fetch(`${apiBasePath}/sliders`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                notification = 'স্লাইড ক্রিয়েট হয়েছে';
                notify1();
                setImageFile(null);
                setTitle('');
                setCaption('');
                setContent('');
                setRelated('');

            } else {
                console.error('Failed to update Slider:', response.statusText);
                notification = 'স্লাইড ক্রিয়েট হয় নি!';
                notify();
            }
        } catch (error) {
            console.error('Error updating Slider:', error);
            notification = 'স্লাইড ক্রিয়েট হয় নি!';
            notify();
        }
    }


    const handleUpload = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setHighlight(false);
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result); // Set preview image
            };
            reader.readAsDataURL(file);
        }
    };


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

    if (userType === 'admin') {
        return (
            <div className='admin__add__slider__wrap'>
                <ToastContainer />
                <div className='admin__upload__wrap'>
                    <div className='profile__image__upload'>
                        <div
                            onDragEnter={(e) => setHighlight(true)}
                            onDragLeave={(e) => setHighlight(false)}
                            onDragOver={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                            onDrop={(e) => handleUpload(e)} className={`${Classes.upload__slider__img}${highlight ? ' is-highlight' : ''}`} style={{ backgroundImage: `url(${preview || '/default-image.jpg'})`, borderRadius: '5px', border: '1px solid#ddd' }}>
                            <form className='my__form'>
                                <div className='upload__button'>
                                    <input
                                        type='file'
                                        className='upload__file'
                                        accept='image/*'
                                        onChange={(e) => handleUpload(e)}
                                    />
                                    <button className='button'><i className='ri-camera-line'></i></button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='admin__form__wrap clearfix'>
                        <form onSubmit={handleProfileUpdate}>
                            <div className='admin__input__flds clearfix'>
                                <div className='admin__input'>
                                    <label>শিরোনাম</label>
                                    <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='স্লাইড এর শিরোনাম লিখুন...' />
                                </div>
                                <div className='admin__input text-black'>
                                    <label>লেখা নির্বাচন করুন </label>
                                    <select
                                        name="optons" id="options"
                                        onChange={(e) => setRelated(e.target.value)} >
                                        <option value="">লেখা নির্বাচন করুন</option>
                                        {options}
                                    </select>
                                </div>
                            </div>
                            <div className='admin__input__flds clearfix'>
                                <div className='admin__input'>
                                    <label>লেখক এর নাম লিখুন</label>
                                    <textarea type='text' value={caption} onChange={(e) => setCaption(e.target.value)} placeholder='লেখক এর নাম ...' />
                                </div>
                                <div className='admin__input'>
                                    <label>সংক্ষিপ্ত বিবরণ</label>
                                    <textarea type='text' value={content} onChange={(e) => setContent(e.target.value)} placeholder='সংক্ষিপ্ত বিবরণ...' />
                                </div>
                            </div>
                            <div className='admin__submit clearfix'>
                                <button type='button' onClick={saveData}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        <NotFound />
    }
};

export default CreateSliderPage;