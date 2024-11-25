import React, { useContext, useState } from 'react';
import { apiBasePath } from '../../../utils/constant';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from '../../store/adminpanel-context';
import ColorPicker, { themes } from 'react-pick-color';

export default function EditAudioCategory({ setIsCategoryAdded }) {
    let notification = '';

    const { setIsEditCategory, editCategoryData } = useContext(AdminContext);
    const [selectedAudioCategory, setSelectedAudioCategory] = useState({
        id: editCategoryData?.id,
        title: editCategoryData?.title,
        image: `${apiBasePath}/${editCategoryData?.image?.slice(editCategoryData?.image?.indexOf('/') + 1)}`,
        background: editCategoryData?.background,
        color: editCategoryData?.color
    });

    const [updateData, setUpdateData] = useState(null);

    function handleChange(event) {
        const { name, value, type, files } = event.target;

        if (type === 'file') {
            const selectedFile = files[0];
            if (!selectedFile.type.match('image/*')) {
                alert('Please select an image file.');
                return;
            } else {
                const file = event.target.files[0];
                if (file) {
                    const url = URL.createObjectURL(file);
                    setSelectedAudioCategory(prevState => ({ ...prevState, image: url }));
                }

                setUpdateData(prevState => ({ ...prevState, file: file }));


            }
        } else {
            setSelectedAudioCategory(prevState => ({ ...prevState, [name]: value }));
            setUpdateData(prevState => ({ ...prevState, [name]: value }));
        }
    }

    const validateFields = () => {
        for (const key in selectedAudioCategory) {
            if (selectedAudioCategory[key] === '' || selectedAudioCategory[key] === null) {
                notification = `দয়া করে ${key} ফিল্ড পূরণ করুন.`;
                notify();
                return false;
            }
        }
        return true;
    };

    async function updateAudioCategory(event) {
        event.preventDefault();  // Prevent default form submission behavior

        if (!validateFields()) {
            return;
        }

        const formData = new FormData();
        for (const key in updateData) {
            formData.append(key, updateData[key]);
            console.log(key, updateData[key])
        }

        const apiUrl = `${apiBasePath}/${editCategoryData?.apiUrl}/${editCategoryData?.id}`;
        console.log('Data to send', updateData);

        if (!updateData) {
            notification = 'কোন ডাটা পরিবর্তন করেন নি!';
            notify();

            return;
        }

        try {
            const response = await axios.put(apiUrl, formData);  // No need to stringify
            console.log('Update category response -->', response.data);
            notification = 'ক্যাটাগরি সফলভাবে আপডেট হয়েছে!';
            notify1();  // Success notification
            setIsCategoryAdded(prev => !prev)
            // setIsEditCategory(false);

        } catch (error) {
            console.log('Update category error', error);
            notification = 'ক্যাটাগরি আপডেট করতে ব্যর্থ হয়েছে!';
            notify();  // Error notification
        } finally {
            setTimeout(() => {
                setIsEditCategory('');
            }, 1000);  // Delays the execution by 1000ms (1 second)
        }


    }

    function deleteThumbImage() {
        setSelectedAudioCategory((prevData) => ({
            ...prevData,
            image: null,
        }))
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
        <div className='admin__add__slider__wrap relative'>
            <div onClick={() => setIsEditCategory('')} className="absolute text-black hover:text-white text-[26px] cursor-pointer  z-[99] top-[-18px] left-0">
                <i class="fixed bg-[#FFD700] hover:bg-[#F9A106] hover:text-white px-[15px] ri-arrow-left-line"></i>
            </div>
            <ToastContainer />
            <form onSubmit={updateAudioCategory}>
                <div className='audio__book__input__fields clearfix pt-[10px]'>
                    <div className='audio__book__input__field'>
                        <label>বইয়ের ধরণ আপডেট করুন</label>
                        <input
                            name='title'
                            type='text'
                            placeholder='বইয়ের ধরণ লিখুন'
                            value={selectedAudioCategory.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='admin__input text-black'>
                        <label>বইয়ের ধরণ কভার ইমেজ</label>
                        {selectedAudioCategory.image ?
                            <div className='relative'>
                                <img
                                    className='object-cover'
                                    src={`${selectedAudioCategory.image}`}
                                    alt="category"
                                    height={200}
                                    width={100}
                                />
                                <button onClick={deleteThumbImage} className='absolute top-1 left-1 text-white bg-black/60 px-[5px] z-[9999]'><i class="ri-delete-bin-6-fill"></i></button>

                            </div>
                            :
                            <div className='audio__file__upload'>
                                <input
                                    name='file'
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChange}
                                />
                            </div>
                        }
                    </div>
                </div>

                <div className='audio__book__input__fields clearfix'>
                    <div className='admin__input'>
                        <label>ব্যাকগ্রাউন্ড কালার</label>
                        <ColorPicker
                            color={selectedAudioCategory.color}
                            theme={themes.dark}
                            onChange={(color) => {
                                setSelectedAudioCategory(prevState => ({ ...prevState, color: color.hex }));
                                setUpdateData(prevState => ({ ...prevState, color: color.hex }));
                            }}
                        />
                    </div>
                    <label>ব্যাকগ্রাউন্ড</label>
                    <div className=''>
                        <label>
                            <input
                                type="radio"
                                name="background"
                                value="background"
                                checked={selectedAudioCategory.background === 'background'}
                                onChange={handleChange}
                            />
                            ব্যাকগ্রাউন্ড সহ
                        </label>
                        <label className='ml-[30px]'>
                            <input
                                type="radio"
                                name="background"
                                value="no_background"
                                checked={selectedAudioCategory.background === 'no_background'}
                                onChange={handleChange}
                            />
                            ব্যাকগ্রাউন্ড ছাড়া
                        </label>
                    </div>
                </div>

                <div className='submit__btn'>
                    <div className='w-full place-content-end flex justify-end'>
                        <button
                            type='submit'
                            className="page__common__yellow__btn max-w-[310px] w-full h-[50px] bg-[#FCA000] rounded-md text-[16px] text-white"
                        >
                            আপডেট করুন
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
