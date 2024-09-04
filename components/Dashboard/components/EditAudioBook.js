// import { color } from 'jodit/types/plugins/color/color';
'use client';
import React, { useEffect, useState } from 'react';
import ColorPicker, { themes } from 'react-pick-color';
import dynamic from 'next/dynamic';
import { apiBasePath } from '../../../utils/constant';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const CustomEditor = dynamic(() => {
    return import('../../custom-editor');
}, { ssr: false });

export default function EditAudioBook() {
    const [message, setMessage] = useState('');
    const [category, setCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [audioData, setAudioData] = useState({
        audioId: '',
        audioTitle: '',
        ebook_id: '',
        ebookTitle: '',
        deleteType: ''   // 'audio' or 'ebook'
    });
    const [allBooks, setAllBooks] = useState([]);

    let notification = '';

    const [editedEbook, setEditedEbook] = useState({});
    const [ebook, setEbook] = useState({
        file: null,
        title: '',
        writer: '',
        voice: '',
        duration: '',
        color: '#fff',
        background: 'no_background',
        category: '',
        mature_content: false,
        premium: false,
        type: '',
        summary: '',
        info: '',
        message: '',
    })


    function resetEbook() {
        setEbook({
            file: null,
            title: '',
            writer: '',
            voice: '',
            duration: '',
            color: '#fff',
            background: 'no_background',
            category: '',
            mature_content: false,
            premium: false,
            type: '',
            summary: '',
            info: '',
            message: '',
            audio: null
        })
    }


    useEffect(() => {
        getAudioBookList()
    }, []);

    useEffect(() => {
        if (audioData.ebook_id?.length > 0) {
            getAudioBookData()
        }
    }, [audioData.ebook_id])


    const fetchFile = async (fileUrl) => {
        try {
            const response = await fetch(`${apiBasePath}/${fileUrl.slice(fileUrl.indexOf('/') + 1)}`);
            const blob = await response.blob();
            const filename = `${fileUrl.slice(fileUrl.indexOf('/') + 9)}`; // Replace with actual filename
            const fileType = response.headers.get('Content-Type');
            const file = new File([blob], filename, { type: fileType });
            return file;
        } catch (error) {
            console.error('Error fetching file:', error);
        }
    };


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

    async function getAudioBookData() {
        try {
            console.log('Inside try get audiolist', audioData.ebook_id)
            const result = await axios.get(
                `${apiBasePath}/getaudiobook/${audioData.ebook_id}`
            );
            console.log(result.data);
            // const file = fetchFile(result.data.banner_img)
            // var bannerImage;
            // file.then((data) => setEbook((prevData) => ({
            //     ...prevData,
            //     file: data,
            // })))



            setEbook((prevData) => ({
                file: result.data.banner_img,
                title: result.data.title,
                writer: result.data.writer,
                voice: result.data.voice,
                duration: result.data.duration,
                color: result.data.color,
                background: result.data.background || 'no_background',
                category: result.data.category,
                mature_content: result.data.mature_content,
                premium: result.data.premium,
                type: result.data.type,
                summary: result.data.summary || '',
                info: result.data.technical_team || '',
                message: result.data.comment_of_writer || '',

            }))

            setIsLoading(true)

            setIsMounted(true)

        } catch (error) {
            console.log(error)
        }
    }

    async function getAudioCategory() {
        try {
            console.log('Inside try')
            const result = await axios.get(
                `${apiBasePath}/audiocategories`
            );
            console.log(result)
            setCategory(result.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAudioCategory();

    }, [])

    const selectBook = (event) => {
        const { name, value, type, files } = event.target;
        if (name === 'book') {
            const arr = value.split(',');
            console.log({ value, arr });
            setAudioData((prevData) => ({
                ...prevData,
                ebook_id: arr[0],
                ebookTitle: arr[1]
            }))
        }

    }

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;

        if (name === 'audio') {
            const arr = value.split(',');
            console.log({ value, arr });
            setEditedEbook((prevData) => ({
                ...prevData,
                audioId: arr[0],
                audioTitle: arr[1]
            }))

            setEbook((prevData) => ({
                ...prevData,
                audioId: arr[0],
                audioTitle: arr[1]
            }))
        }

        if (name === 'book') {
            const arr = value.split(',');
            console.log({ value, arr });
            setEditedEbook((prevData) => ({
                ...prevData,
                ebook_id: arr[0],
                ebookTitle: arr[1]
            }))
            setEbook((prevData) => ({
                ...prevData,
                ebook_id: arr[0],
                ebookTitle: arr[1]
            }))
        }

        if (type === 'file') {
            const selectedFile = files[0];
            if (!selectedFile.type.match('image/*')) {
                alert('Please select an image file.');
                return;
            } else {
                setEditedEbook(prevState => ({ ...prevState, file: selectedFile }));
                // setEditedEbook(prevState => ({ ...prevState, file: selectedFile }));

            }
        } else if (type === 'radio') {
            if (value === 'true' || value === 'false') {
                if (value === 'true') {
                    setEditedEbook(prevState => ({ ...prevState, [name]: true }));
                } else {
                    setEditedEbook(prevState => ({ ...prevState, [name]: false }));
                }
            } else {
                setEditedEbook(prevState => ({ ...prevState, [name]: value }));
                setEbook(prevState => ({ ...prevState, [name]: value }));

            }
        } else {
            setEditedEbook(prevState => ({ ...prevState, [name]: value }));
            setEbook(prevState => ({ ...prevState, [name]: value }));

        }
    };

    const validateFields = () => {
        for (const key in ebook) {
            if (ebook[key] === '' || ebook[key] === null) {
                setMessage(`Please fill in the ${key} field.`);
                return false;
            }
        }
        return true;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();



        const formData = new FormData();
        for (const key in editedEbook) {
            formData.append(key, editedEbook[key]);
            console.log(key, editedEbook[key])
        }

        console.log(`${apiBasePath}/updatebook/${audioData.ebook_id}`)

        try {
            const response = await axios.put(`${apiBasePath}/updatebook/${audioData.ebook_id}`, editedEbook);

            console.log('Edit book response', response)
            resetEbook();
            notification = 'ইবুক সফলভাবে ক্রিয়েট হয়েছে';
            setMessage('Ebook created successfully!');
            notify1();
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error creating ebook');
            notification = "ইবুক সম্পন্ন হয়নি";
            notify();
        }

        setIsLoading(false);
    };


    const deleteCoverImage = () =>{
        setEbook((prevData) =>({
            ...prevData,
            file: null,
        }))
    }

    console.log('ebook data', ebook);

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



    // if(!isMounted) return null;

    return (
        <div className='admin__add__slider__wrap'>



            <ToastContainer />

            <div className='admin__input contents audio__book__input__field text-black'>
                <label>বই নির্বাচন করুন</label>
                <select
                    name="book"
                    id="book"
                    value={`${audioData.ebook_id},${audioData.ebookTitle}`}
                    onChange={selectBook}
                >
                    <option>বই নির্বাচন করুন</option>
                    {allBooks.map((book) => (
                        <option key={book._id} value={`${book._id},${book.title}`}>
                            {book.title}
                        </option>
                    ))}
                </select>
            </div>


            {isMounted &&
                <>
                    <form onSubmit={handleSubmit}>
                        <div className='audio__book__input__fields clearfix mt-[10px]'>
                            <div className='audio__book__input__field'>
                                <label>বইয়ের নাম</label>
                                <input
                                    name='title'
                                    type='text'
                                    placeholder='বইয়ের নাম লিখুন'
                                    value={ebook.title}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='audio__book__input__field'>
                                <label>লেখক</label>
                                <input
                                    name='writer'
                                    type='text'
                                    placeholder='লেখকের নাম লিখুন'
                                    value={ebook.writer}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='audio__book__input__fields clearfix'>
                            <div className='audio__book__input__field'>
                                <label>সময়</label>
                                <input
                                    name='duration'
                                    type='text'
                                    placeholder='অডিও কত মিনিটের সেটা লিখুন'
                                    value={ebook.duration}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='audio__book__input__field'>
                                <label>কণ্ঠ</label>
                                <input
                                    name='voice'
                                    type='text'
                                    placeholder='যিনি কণ্ঠ দিয়েছেন তার নাম লিখুন'
                                    value={ebook.voice}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='audio__book__input__fields clearfix'>
                            <div className='admin__input  text-black'>
                                <label>বইয়ের ধরণ</label>
                                <select
                                    name="category"
                                    id="category"
                                    value={ebook.category}
                                    onChange={handleChange}
                                >
                                    <option>বইয়ের ধরণ নির্বাচন করুন</option>
                                    {category.map((cat) => (
                                        <option key={cat._id} value={cat.title}>
                                            {cat.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className='admin__input text-black'>
                                {ebook.file === null &&
                                    <> <label>বইয়ের কভার ইমেজ</label>
                                        <div className='audio__file__upload'>
                                            <input
                                                name='file'
                                                type="file"
                                                accept="image/*"
                                                id="audioFileInput"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </>}

                                { ebook.file &&
                                    <div className='relative'>
                                        <label>বর্তমান বইয়ের কভার</label>
                                        <img width={100} src={`${apiBasePath}/${ebook.file.slice(ebook.file.indexOf('/') + 1)}`} />
                                        <button onClick={deleteCoverImage} className='absolute top-8 left-1 text-white bg-black/60 px-[5px] z-[9999]'><i class="ri-delete-bin-6-fill"></i></button>
                                    </div>}

                            </div>
                        </div>
                        <div className='audio__book__input__fields clearfix flex w-full'>
                            <div className='audio__book__input__radio w-[33.333%] text-black mr-[10px] ml-[10px]'>
                                <label>পূর্ণবয়স্ক উপাদান?</label>
                                <div>
                                    <label>
                                        <input
                                            type="radio"
                                            name="mature_content"
                                            value={true}
                                            checked={ebook.mature_content === true}
                                            onChange={handleChange}
                                        />
                                        হ্যাঁ
                                    </label>
                                    <label className='ml-[30px]'>
                                        <input
                                            type="radio"
                                            name="mature_content"
                                            value={'false'}
                                            checked={ebook.mature_content === false}
                                            onChange={handleChange}
                                        />
                                        না
                                    </label>
                                </div>
                            </div>
                            <div className='audio__book__input__radio w-[33.333%] text-black'>
                                <label>বইটি কি প্রিমিয়াম ?</label>
                                <div>
                                    <label>
                                        <input
                                            type="radio"
                                            name="premium"
                                            value={'true'}
                                            checked={ebook.premium === true}
                                            onChange={handleChange}
                                        />
                                        হ্যাঁ
                                    </label>
                                    <label className='ml-[30px]'>
                                        <input
                                            type="radio"
                                            name="premium"
                                            value={false}
                                            checked={ebook.premium === false}
                                            onChange={handleChange}
                                        />
                                        না
                                    </label>
                                </div>
                            </div>
                            <div className='audio__book__input__radio w-[33.333%] text-black'>
                                <label>ব্যাকগ্রাউন্ড</label>
                                <div className=''>
                                    <label>
                                        <input
                                            type="radio"
                                            name="background"
                                            value="background"
                                            checked={ebook.background === 'background'}
                                            onChange={handleChange}
                                        />
                                        ব্যাকগ্রাউন্ড সহ
                                    </label>
                                    <label className='ml-[30px]'>
                                        <input
                                            type="radio"
                                            name="background"
                                            value="no_background"
                                            checked={ebook.background === 'no_background'}
                                            onChange={handleChange}
                                        />
                                        ব্যাকগ্রাউন্ড ছাড়া
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='audio__book__input__fields clearfix'>
                            <div className='admin__input'>
                                <label>ব্যাকগ্রাউন্ড কালার</label>
                                <ColorPicker
                                    color={ebook.color}
                                    theme={themes.dark}
                                    onChange={(color) => setEbook(prevState => ({ ...prevState, color: color.hex }))}
                                />
                            </div>
                            <div className='audio__book__input__field'>
                                <label>টাইপ</label>
                                <input
                                    name='type'
                                    type='text'
                                    placeholder='বইয়ের টাইপ লিখুন'
                                    value={ebook.type}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='admin__input dashboardCk '>
                                <label className='mt-[15px]'>সারসংক্ষেপ</label>
                                <CustomEditor
                                    initialData={ebook.summary}
                                    setContent={(data) => setEbook(prevState => ({ ...prevState, summary: data }))}

                                />
                                {/* <textarea type='text' placeholder='বইয়ের সারসংক্ষেপ' /> */}
                            </div>
                        </div>
                        <div className='audio__book__input__fields clearfix'>
                            <div className='admin__input dashboardCk'>
                                <label>কলাকুশলী</label>
                                <CustomEditor
                                    initialData={ebook.info}
                                    setContent={(data) => setEbook(prevState => ({ ...prevState, info: data }))}
                                />
                                {/* <textarea type='text' placeholder='info' /> */}
                            </div>
                            <div className='admin__input dashboardCk'>
                                <label>লেখকের মন্তব্য</label>
                                <CustomEditor
                                    initialData={ebook.message}
                                    setContent={(data) => setEbook(prevState => ({ ...prevState, message: data }))}

                                />
                                {/* <textarea type='text' placeholder='message' /> */}
                            </div>
                        </div>
                    </form>
                    <div className='submit__btn flex  !mt-[40px]'>
                        <div className='w-[50%] pl-[12px]'>
                            <button
                                className="page__common__yello__btn w-[80%] h-[50px] bg-[#FCA000] rounded-md text-[16px] text-white items-center profile__btn__midl"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                {'আপডেট করুন'}
                            </button>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}
