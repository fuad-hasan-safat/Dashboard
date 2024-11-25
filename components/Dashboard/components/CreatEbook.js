
'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ColorPicker, { themes } from 'react-pick-color';
import dynamic from 'next/dynamic';
import { apiBasePath } from '../../../utils/constant';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const JoditEditor = dynamic(() => import('jodit-react'), {
    ssr: false, // Disable SSR for this component
});

function MyAudioUploadForm({placeholder=''}) {
    const [message, setMessage] = useState('');
    const [category, setCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    let notification = '';

    const summaryEditor = useRef(null);
    const infoEditor = useRef(null);
    const messageEditor = useRef(null);

    const options = [
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'center',
        'left',
        'right',
        'justify',
        'undo',
        'redo',
    ];

    const config = useMemo(() => ({
        buttons: options,

        buttonsMD: options,
        buttonsSM: options,
        buttonsXS: options,
        statusbar: false,
        toolbarAdaptive: false,

        style: {
            color: '#737373',
        },

        readonly: false, // all options from https://xdsoft.net/jodit/docs/,


        placeholder: 'লিখুন'

    }),
        [placeholder]
    );


    const [ebook, setEbook] = useState({
        file: null,
        thumb_image: null,
        pro_image: null,
        title: '',
        writer: '',
        voice: '',
        duration: '',
        color: null,
        background: 'no_background',
        category: '',
        mature_content: false,
        premium: false,
        type: '',
        summary: '',
        info: '',
        message: ''
    })


    function resetEbook() {
        setEbook({
            file: null,
            thumb_image: null,
            pro_image: null,
            title: '',
            writer: '',
            voice: '',
            duration: '',
            color: null,
            background: 'no_background',
            category: '',
            mature_content: false,
            premium: false,
            type: '',
            summary: '',
            info: '',
            message: ''
        })
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

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        if (type === 'file') {
            const selectedFile = files[0];
            if (!selectedFile.type.match('image/*')) {
                alert('Please select an image file.');
                return;
            } else {
                if (name === 'thumb_image') {
                    setEbook(prevState => ({ ...prevState, thumb_image: selectedFile }));
                } else if (name === 'pro_image') {
                    setEbook(prevState => ({ ...prevState, pro_image: selectedFile }));
                } else {
                    setEbook(prevState => ({ ...prevState, file: selectedFile }));

                }
            }
        } else if (type === 'radio') {
            if (value === 'true' || value === 'false') {
                if (value === 'true') {
                    setEbook(prevState => ({ ...prevState, [name]: true }));
                } else {
                    setEbook(prevState => ({ ...prevState, [name]: false }));
                }
            } else {
                setEbook(prevState => ({ ...prevState, [name]: value }));
            }
        } else {
            setEbook(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const validateFields = () => {
        for (const key in ebook) {
            if (ebook[key] === '' || ebook[key] === null) {
                notification = `${key} ফিল্ড পূরণ করুন`;
                notify();
                setMessage(`Please fill in the ${key} field.`);
                return false;
            }
        }
        return true;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateFields()) {

            return
        };

        if (ebook.color === null) {
            notification = "দয়া করে কালার নির্বাচন করুন!";
            notify();
            return
        }

        setIsLoading(true);

        const formData = new FormData();
        for (const key in ebook) {
            formData.append(key, ebook[key]);
        }

        console.log('ebook -', ebook);


        try {
            const response = await fetch(`${apiBasePath}/createbook`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
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

    return (
        <div className='admin__add__slider__wrap'>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <div className='audio__book__input__fields clearfix'>
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
                        <label>বইয়ের থাম্ব ইমেজ</label>
                        <div className='audio__file__upload'>
                            <input
                                name='thumb_image'
                                type="file"
                                accept="image/*"
                                id="audioFileInput"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='admin__input text-black'>
                        <label>বইয়ের প্রো ইমেজ</label>
                        <div className='audio__file__upload'>
                            <input
                                name='pro_image'
                                type="file"
                                accept="image/*"
                                id="audioFileInput"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='admin__input text-black'>
                        <label>বইয়ের কভার ইমেজ</label>
                        <div className='audio__file__upload'>
                            <input
                                name='file'
                                type="file"
                                accept="image/*"
                                id="audioFileInput"
                                onChange={handleChange}
                            />
                        </div>
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

                        <JoditEditor
                            ref={summaryEditor}
                            value={ebook.summary}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setEbook(prevState => ({ ...prevState, summary: newContent }))} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => { }}
                        />


                        {/* <textarea type='text' placeholder='বইয়ের সারসংক্ষেপ' /> */}
                    </div>
                </div>
                <div className='audio__book__input__fields clearfix'>
                    <div className='admin__input dashboardCk'>
                        <label>কলাকুশলী</label>

                        <JoditEditor
                            ref={infoEditor}
                            value={ebook.info}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setEbook(prevState => ({ ...prevState, info: newContent }))} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => { }}
                        />

                        {/* <textarea type='text' placeholder='info' /> */}
                    </div>
                    <div className='admin__input dashboardCk'>
                        <label>লেখকের মন্তব্য</label>

                        <JoditEditor
                            ref={messageEditor}
                            value={ebook.message}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setEbook(prevState => ({ ...prevState, message: newContent }))} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => { }}
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
                        disabled={isLoading}
                    >
                        {isLoading ? 'Uploading...' : 'ক্রিয়েট করুন'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MyAudioUploadForm;