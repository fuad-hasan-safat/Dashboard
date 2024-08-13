'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import Classes from './slider.module.css';
import { apiBasePath } from '../../../utils/constant';
import NotFound from '../../common/nofFound';



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
            } else {
                console.error('Failed to update Slider:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating Slider:', error);
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
    if (userType === 'admin') {
        return (
            <div className='admin__add__slider__wrap'>
                <div className='admin__upload__wrap'>
                    <div className='profile__image__upload'>
                        <div
                            onDragEnter={(e) => setHighlight(true)}
                            onDragLeave={(e) => setHighlight(false)}
                            onDragOver={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                            onDrop={(e) => handleUpload(e)} className={`${Classes.upload__slider__img}${highlight ? ' is-highlight' : ''}`} style={{ backgroundImage: `url(${preview || '/default-image.jpg'})`,borderRadius:'5px',border:'1px solid#ddd' }}>
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
                                    <label>Title</label>
                                    <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
                                </div>
                                <div className='admin__input text-black'>
                                    <label>Post Title</label>
                                    <select
                                        name="optons" id="options"
                                        onChange={(e) => setRelated(e.target.value)} >
                                        {options}
                                    </select>
                                </div>
                            </div>
                            <div className='admin__input__flds clearfix'>
                                <div className='admin__input'>
                                    <label>Content</label>
                                    <textarea type='text' value={content} onChange={(e) => setContent(e.target.value)} placeholder='Content' />
                                </div>
                                <div className='admin__input'>
                                    <label>Caption</label>
                                    <textarea type='text' value={caption} onChange={(e) => setCaption(e.target.value)} placeholder='Caption' />
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