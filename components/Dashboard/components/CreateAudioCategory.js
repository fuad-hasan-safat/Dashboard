import React, { useState } from 'react'
import ColorPicker, { themes } from 'react-pick-color'
import { apiBasePath } from '../../../utils/constant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateAudioCategory() {
    let notification = '';
    const [audioCategory, setAudioCategory] = useState({
        file: null,
        title: '',
        background: '',
        color: '',
    })


    const resetAudioCategory = () => {
        setAudioCategory({
            file: null,
            title: '',
            background: '',
            color: '',
        })
    }

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;

        if (type === 'file') {
            const selectedFile = files[0];
            if (!selectedFile.type.match('image/*')) {
                notification = "দয়া করে ইমেজ নির্বাচন করুন";
                notify();
                return;
            } else {
                setAudioCategory((prevAudiocategory) => ({ ...prevAudiocategory, file: selectedFile }));
            }
        } else {
            setAudioCategory((prevAudioCategory) => ({ ...prevAudioCategory, [name]: value }));
        }
    };

    const validateFields = () => {
        for (const key in audioCategory) {
            if (audioCategory[key] === '' || audioCategory[key] === null) {
                notification = `দয়া করে ${key} ফিল্ড পূরণ করুন.`;
                notify();
                return false;
            }
        }
        return true;
    };

    const createAudioCategory = async (event) => {
        event.preventDefault();
        if (!validateFields()) {
            // alert("সব ফিল্ড পূরণ করুন")
            return
        };

        const formData = new FormData();
        for (const key in audioCategory) {
            const data = audioCategory[key];
            console.log(typeof (data))
            let solidData = data
            if (typeof (data) === 'string') {
                solidData = data.trim();
            }

            console.log({ data, solidData })
            formData.append(key, solidData);
        }

        
        try {

            const response = await fetch(`${apiBasePath}/createaudiocategory`, {
                method: 'POST',
                body: formData
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log('Success:', result);
            notification = 'বইয়ের ধরণ সফলভাবে ক্রিয়েট হয়েছে';
            notify1();
            resetAudioCategory();
        } catch (error) {
            console.log('Audio category create error', error);
            notification = "বইয়ের ধরণ সম্পন্ন হয়নি";
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


    return (
        <div className='admin__add__slider__wrap'>
            <ToastContainer />
            <form onSubmit={createAudioCategory}>
                <div className='audio__book__input__fields clearfix'>
                    <div className='audio__book__input__field'>
                        <label>বইয়ের ধরণ লিখুন</label>
                        <input
                            name='title'
                            type='text'
                            placeholder='বইয়ের ধরণ লিখুন'
                            value={audioCategory.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='admin__input text-black'>
                        <label>বইয়ের ধরণ কভার ইমেজ</label>
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
                <div className='audio__book__input__fields clearfix'>
                    <div className='admin__input'>
                        <label>ব্যাকগ্রাউন্ড কালার</label>
                        <ColorPicker
                            color={audioCategory.color}
                            theme={themes.dark}
                            onChange={(color) => setAudioCategory(prevState => ({ ...prevState, color: color.hex }))}
                        />
                    </div>
                    <label>ব্যাকগ্রাউন্ড</label>
                    <div className=''>
                        <label>
                            <input
                                type="radio"
                                name="background"
                                value="background"
                                checked={audioCategory.background === 'background'}
                                onChange={handleChange}
                            />
                            ব্যাকগ্রাউন্ড সহ
                        </label>
                        <label className='ml-[30px]'>
                            <input
                                type="radio"
                                name="background"
                                value="no_background"
                                checked={audioCategory.background === 'no_background'}
                                onChange={handleChange}
                            />
                            ব্যাকগ্রাউন্ড ছাড়া
                        </label>
                    </div>
                </div>
                <div className='audio__book__input__radio w-[33.333%] text-black'>
                    
                </div>
            </form>
            <div className='submit__btn'>
                <div className='w-full place-content-end flex justify-end '>
                    <button
                        type='submit'
                        onClick={createAudioCategory}
                        className="page__common__yello__btn max-w-[310px] w-full h-[50px] bg-[#FCA000] rounded-md text-[16px] text-white items-center profile__btn__midl"
                    >
                        ক্রিয়েট করুন
                    </button>
                </div>
            </div>
        </div>
    )
}
