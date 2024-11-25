import React, { useContext, useState } from 'react';
import { AdminContext } from '../../store/adminpanel-context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiBasePath } from '../../../utils/constant';
import axios from 'axios';

export default function EditLekharPokaCategory({ setIsCategoryAdded }) {

    let notification = '';

    const { setIsEditCategory, editCategoryData } = useContext(AdminContext);
    const [selectedAudioCategory, setSelectedAudioCategory] = useState({
        id: editCategoryData?.id,
        title: editCategoryData?.title,
        image: editCategoryData.image,
    });

    const [updateData, setUpdateData] = useState({
        title: editCategoryData?.title,
    });

    function handleChange(event) {
        const { name, value, type, files } = event.target;

        if (type === 'file') {
            // future development, when API will accept image file
        } else {
            setSelectedAudioCategory(prevState => ({ ...prevState, [name]: value }));
            setUpdateData(prevState => ({ ...prevState, [name]: value }));
        }
    }

    const validateFields = () => {
        for (const key in updateData) {
            if (updateData[key] === '' || updateData[key] === null) {
                notification = `দয়া করে ${key} ফিল্ড পূরণ করুন.`;
                notify();
                return false;
            }
        }
        return true;
    };

    async function updateCategory(event) {
        event.preventDefault();  // Prevent default form submission behavior

        if (!validateFields()) {
            return;
        }

        const apiUrl = `${apiBasePath}/${editCategoryData?.apiUrl}/${editCategoryData?.id}`;
        console.log('Data to send:', updateData);

        try {
            const response = await axios.put(apiUrl, updateData);
            console.log('Update category response -->', response.data);
            notification = 'ক্যাটাগরি সফলভাবে আপডেট হয়েছে!';
            notify1();  // Success notification
            setIsCategoryAdded(prev => !prev)

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
            <form onSubmit={updateCategory}>
                <div className='audio__book__input__fields clearfix'>
                    <div className='audio__book__input__field'>
                        <label>বইয়ের ধরণ আপডেট করুন </label>
                        <input
                            name='title'
                            type='text'
                            placeholder='বইয়ের ধরণ লিখুন'
                            value={selectedAudioCategory.title}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Image Upload Code (commented out for now) */}
                </div>
            </form>
            <div className='submit__btn'>
                <div className='w-full place-content-end flex justify-end'>
                    <button
                        type='submit'
                        onClick={updateCategory}
                        className="page__common__yello__btn max-w-[310px] w-full h-[50px] bg-[#FCA000] rounded-md text-[16px] text-white items-center profile__btn__midl"
                    >
                        আপডেট করুন
                    </button>
                </div>
            </div>
        </div>
    );
}
