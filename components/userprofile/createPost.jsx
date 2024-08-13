'use client'
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import Select from "react-select";
import { apiBasePath } from '../../utils/constant';
import CreateCategory from './createCategory';
import CreateWriter from './createWriter';
import Checkbox from '../common/Checkbox'
import AudioFileUpload from './AudiofileUpload';
import { useRouter } from 'next/router';
import { FileUploader } from "react-drag-drop-files";
import dynamic from 'next/dynamic';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const CustomEditor = dynamic(() => {
    return import('../../components/custom-editor');
}, { ssr: false });


const fileTypes = ["JPEG", "PNG", "GIF"];


export default function CreatePost() {
    const router = useRouter()

    const [content, setContent] = useState("");


    //--------------- catagory -----------------
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedWriter, setSelectedWriter] = useState(null);

    // determine writer and writer id
    const [writer, setWriter] = useState('');
    const [writerId, setWriterId] = useState(null);

    // check box ---- (writer creation)
    const [checkboxValue, setCheckboxValue] = useState(false);


    const [title, setTitle] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [status, setStatus] = useState("");
    const [username, setUsername] = useState("");
    const [userUuid, setUserUuid] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userToken, setUserToken] = useState("");
    const [userPost, setUserPost] = useState([]);

    //  category and writer fetch
    const [category, setCategory] = useState([]);
    const [writers, setWriters] = useState([]);
    // -------
    const [isWriterAdded, setIsWriterAdded] = useState(false)
    const [isCategoryAdded, setIsCategoryAdded] = useState(false)
    const [isProfileUpdated, setIsProfileUpdated] = useState(false)
    const [canPostStatus, setCanPostStatus] = useState(false)
    const [userType, setUserType] = useState('')
    // ------------

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');



    // summary
    const [summary, setSummary] = useState('')


    useEffect(() => {
        setUsername(localStorage.getItem("name") || "");
        setUserToken(localStorage.getItem("token") || "");
        setUserUuid(localStorage.getItem("uuid") || "");
        setUserPhone(localStorage.getItem("phone") || "");
        setUserType(localStorage.getItem("usertype") || "");

        setIsLoading(true)

    }, []);



    useEffect(() => {
        setStatus(localStorage.getItem("status") || "");
    }, [status]);


    useEffect(() => {
        fetch(`${apiBasePath}/getprofile/${localStorage.getItem("uuid")}`)
            .then((response) => response.json())
            .then((data) => {
                // console.log('pofile details on user profile--------------->>>>>>>', data);


                console.log('pofile post )()()() details on user profile--------------->>>>>>>', data);


                if (!data.object.profile_completion_status) {
                    setCanPostStatus(false)
                } else {
                    setCanPostStatus(true)
                }

                // console.log(' profile image----------->>>>', image)
            })
            .catch((error) => console.error("Error fetching data:", error));


        fetch(`${apiBasePath}/writers`)
            .then((response) => response.json())
            .then((data) => {
                setWriters(data);
                console.log('writer list on ---', data)
            })
            .catch((error) => console.error("Error fetching data:", error));

        fetch(`${apiBasePath}/categories`)
            .then((response) => response.json())
            .then((data) => {
                console.log('Create post category -', data)
                setCategory(data);
            })
            .catch((error) => console.error("Error fetching data:", error))
            .finally(setIsLoading(true));


        setIsCategoryAdded(false)
        setIsWriterAdded(false)
        setIsProfileUpdated(false)
    }, [isWriterAdded, isCategoryAdded])




    const writerhandleChange = (event) => {
        const [id, name] = event.target.value.split('|');

        console.log('Writer select --', id, name)
        setWriter(name);
        setWriterId(id)
    };

    const customStyles = {
        menu: (provided) => ({
            ...provided,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            color: "#000",
            zIndex: '99999'
        }),
    };


    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleSummary = (e) => {
        setSummary(e.target.value);
    };


    // audio file 
    const [selectedFile, setSelectedFile] = useState(null);


    function extractText(htmlString) {
        // Split the string by the opening `<p>` tag
        const paragraphs = htmlString.split(/<p>/);

        // Loop through each paragraph except the first one
        let modifiedString = paragraphs[0]; // Keep the first paragraph as-is
        for (let i = 1; i < paragraphs.length; i++) {
            modifiedString += `\n<p>${paragraphs[i]}</p>`; // Add newline and re-join with opening tag
        }

        return modifiedString;
    }

    function reloadPage() {
        setTimeout(() => {
            router.push(`/user/${localStorage.getItem("uuid")}`)
        }, 3000)
    }

    let notification = ''


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        console.log("INSIDE HANDLE")
        if (!canPostStatus) {
            const confirmLogout = window.confirm('দয়া করে প্রোফাইল তৈরি করুন');
            if (confirmLogout) {
                router.push(`/user/${localStorage.getItem("uuid")}`)
            }

        }
        else {

            if (!title) {
                notification = 'দয়া করে আপনার লেখার শিরোনাম দিন';
                notify();
            }
            else if (!selectedOption) {
                notification = 'দয়া করে আপনার লেখার ধরণ নির্বাচন করুন';
                notify();
            }
            else if (!summary) {
                notification = 'দয়া করে আপনার লেখার সারমর্ম লিখুন';
                notify();
            }
            else {

                console.log({ userUuid, isWriter, writer, writerId })
                var isWriter = true;

                if (userType === 'admin') {
                    isWriter = false;
                }

                const formData = new FormData();
                formData.append("file", selectedFile);
                formData.append("image", image);
                formData.append("category", selectedOption);
                formData.append("writer", writer);
                formData.append("writer_id", writerId);
                formData.append("title", title);
                formData.append("summary", summary);
                formData.append("content", content);
                formData.append("rating", 1);
                formData.append("status", false);
                formData.append("uploaded_by", userUuid);
                formData.append("new_writer", isWriter);

                console.log('form data ---', userUuid)

                if (title && selectedOption && summary) {

                    console.log(writer, writerId)

                    try {

                        const response = await fetch(`${apiBasePath}/posts`, {
                            method: "POST",
                            headers: {

                            },
                            body: formData,
                        });

                        if (response.ok) {
                            const data = await response.json();
                            notification = 'আপনার লেখাটি অনুমোদনের জন্য এডমিনের কাছে পাঠানো হয়েছে। লেখাটি শীঘ্রই প্রকাশিত হবে। ধন্যবাদ';
                            notify();

                            setSelectedFile(null);
                            setTitle('');
                            setCategory('');
                            setWriters('');
                            setContent('');
                            setSummary('');

                            reloadPage();

                        } else {
                            console.error("Failed to update writing:", response.statusText);
                        }
                    } catch (error) {
                        console.error("Error creating post:", error);
                        notification = error
                    }
                } else {
                    notification = 'শিরোনাম, লেখার ধরণ ও সারসংক্ষেপ লিখুন';
                    notify();
                }
            }

        }


    };

    const notify = () => toast.warn(notification, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,

    });



    //  image handle
    const handleFileChange = (acceptedFiles) => {
        console.log({ acceptedFiles })

        if (acceptedFiles?.length > 0) {
            console.log('IS ARRAY ', acceptedFiles)

            if (acceptedFiles[0].type.startsWith('image/')) {
                const file = acceptedFiles[0];
                if (file) {
                    setImage(file);
                    console.log({ file })
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setPreview(reader.result); // Set preview image
                    };
                    reader.readAsDataURL(file);
                }
            } else {
                notification = 'ছবি আপলোড করুন';
                notify()
            }

        }

    };

    const handleAudioFile = (acceptedFiles) => {
        console.log('file', acceptedFiles)
        if (acceptedFiles?.length > 0) {
            console.log('IS ARRAY ', acceptedFiles)

            if (acceptedFiles[0].type.startsWith('audio/')) {
                const file = acceptedFiles[0];
                if (file) {
                    setSelectedFile(file);
                    console.log({ file })

                }
            } else {
                notification = 'অডিও আপলোড করুন';
                notify()
            }

        }

    }

    // Drop down category
    let Categoryoptions = [];
    for (let i = 0; i < category.length; i++) {
        let data = { value: category[i]._id, label: category[i].title };
        // console.log('---data -----------'. data)
        Categoryoptions.push(data);
    }



    console.log({ category })

    if (!isLoading) return null;

    return (
        <>
            <div className="md:pr-0 sm:pr-0 space-y-4 lg:flex">
                <div className='create__post__rgt lg:w-[25%] lg:order-last pt-[10px]'>
                    <div className="text-[#F9A106] font-bold text-[20px] !mb-[5px]">আপনার লেখার ধরণ নির্বাচন করুন</div>

                    <div className='select__control'>
                        {/* <Select
                            value={selectedOption}
                            onChange={categoryhandleChange}
                            styles={customStyles}
                            options={Categoryoptions}
                        /> */}
                        
                        <select
                            id="category"
                            name="category"
                            className={`h-[45px] w-full px-[16px] text-black border-[1px] border-[#ddd] rounded-[7px] focus:bg-transparent `}
                            required
                            value={selectedOption}
                            onChange={(e) => setSelectedOption(e.target.value)}>
                            <option value="">লেখার ধরণ</option>
                            {category.length && category?.map((cat) => (
                                <option className='p-[10px]' key={cat._id} value={cat.title}>
                                    {cat.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {userType === 'admin' &&
                        <>
                            <div className="text-[#F9A106] font-bold text-[20px] mt-[10px] !mb-[2px]">লেখক নির্বাচন করুন</div>
                            <div className=" place-content-center justify-center">

                                <div className="">
                                    {/* <Select
                                        value={selectedWriter}
                                        onChange={writerhandleChange}
                                        styles={customStyles}
                                        options={writersOptions}
                                    /> */}

                                    <select
                                        id='writer'
                                        name='writer'
                                        className={`h-[45px] w-full px-[16px] text-black border-[1px] border-[#ddd] rounded-[7px]`}
                                        required
                                        onChange={writerhandleChange}
                                    >
                                        <option value="">লেখক নির্বাচন করুন</option>
                                        {writers.length > 0 && writers?.map((wrt)=>(
                                            <option key={wrt._id} value={`${wrt._id}|${wrt.name}`}>
                                                {wrt.name}
                                            </option>
                                        ))}

                                    </select>
                                </div>
                            </div>
                        </>
                    }

                    {userType === 'admin' &&
                        <>
                            <div className='profile__btn__midl'>
                                <CreateCategory setIsCategoryAdded={setIsCategoryAdded} />
                            </div>

                            <div className='profile__btn__midl'>
                                <CreateWriter setIsWriterAdded={setIsWriterAdded} />
                            </div>
                        </>
                    }
                    <hr class="my-5 border-gray-200" />
                    <div className='text-black'>
                        <div className='mb-[15px]'>
                            <div className="text-[#F9A106] font-bold text-[20px] !mb-[2px]">ছবি আপলোড করুন (যদি থাকে)</div>
                        </div>

                        <FileUploader handleChange={handleFileChange} multiple={true} mimeTypes={['image/*']}
                        >
                            <div

                                className='border-2 border-dashed border-[#F9A106] rounded-md h-[220px] items-center place-content-center text-center justify-center '>
                                <div className='flex items-center justify-center'>
                                    <img src='/images/user/image-plus-1.png' alt='Image Plus' />
                                </div>
                                <div className='create__border'>
                                    <h1 className='pt-[5px] pb-[5px]'>এখানে ছবি ড্রাগ ড্রপ করুন </h1>
                                    <img className='m-auto' src='../images/user/divider.png' alt='Divider' />
                                </div>

                                <label className=" cursor-pointer flex items-center justify-center relative " >
                                    <div className="page__common__yello__btn mt-[15px]  file-btn w-[200px] h-[43px] text-[16px] " onClick={handleFileChange}>আপলোড</div>

                                </label>
                            </div>
                        </FileUploader>

                    </div>
                    <div className='bg-[#EEF1F7] mt-[15px] rounded-[10px] p-[12px] w-full'>
                        <div className='flex justify-between items-center'>
                            <img className='m-auto pr-[10px] w-[40px] h-[35px]' src='/images/likhun/imagelogo.png' alt='image File ' />
                            <div className='w-full'>
                                {/* <strong className='block'>Kobitar Gan.mp3</strong> */}
                                <p className='w-full text-[#292D32]'>{image ? `File name: ${image?.name?.slice(0, 20)}` : "কোন ছবি নির্বাচন করা হয়নি"}</p>

                                {/* <span className='flex justify-start items-center'>60 KB of 12O KB . <img className='m-auto pr-[10px]' src='../images/user/audio-icon.png' alt='Audio Icon ' /><strong>Uploading...</strong></span> */}
                            </div>
                        </div>
                    </div>
                    <hr class="my-5 border-gray-200" />
                    <div className='text-black'>
                        <div className="text-[#F9A106] mt-[40px] font-bold text-[20px] !mb-[2px]">অডিও আপলোড করুন (যদি থাকে)</div>
                        <FileUploader handleChange={handleAudioFile} multiple={true} mimeTypes={['audio/*']}
                        >
                            <div

                                className='border-2 border-dashed border-[#F9A106] rounded-md h-[220px] items-center place-content-center text-center justify-center'>
                                <div className='flex items-center justify-center'>
                                    <img src='../images/user/image-audio.png' alt='Image Plus' />
                                </div>
                                <div className='create__border'>
                                    <h1 className='pt-[5px] pb-[5px]'>এখানে অডিও ড্রাগ ড্রপ করুন </h1>
                                    <img className='m-auto' src='../images/user/divider.png' alt='Divider' />
                                </div>

                                <label className=" cursor-pointer flex items-center justify-center" >
                                    <div className="page__common__yello__btn mt-[15px]  file-btn w-[200px] h-[43px] text-[16px] " onClick={handleAudioFile}>আপলোড</div>

                                </label>
                            </div>
                        </FileUploader>
                        {/* <AudioFileUpload selectedFile={selectedFile} setSelectedFile={setSelectedFile} /> */}
                    </div>
                    <div className='bg-[#EEF1F7] mt-[15px] rounded-[10px] p-[12px] w-full'>
                        <div className='flex justify-between items-center'>
                            <img className='m-auto pr-[10px] w-[40px] h-[35px]' src='/images/likhun/imagelogo.png' alt='image File ' />
                            <div className='w-full'>
                                {/* <strong className='block'>Kobitar Gan.mp3</strong> */}
                                <p className='w-full text-[#292D32]'>{selectedFile ? `File name: ${selectedFile?.name?.slice(0, 20)}` : "কোন অডিও নির্বাচন করা হয়নি"}</p>

                                {/* <span className='flex justify-start items-center'>60 KB of 12O KB . <img className='m-auto pr-[10px]' src='../images/user/audio-icon.png' alt='Audio Icon ' /><strong>Uploading...</strong></span> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='create__post__lft lg:pr-[100px] lg:w-[75%] lg:order-first'>
                    <div className="text-[#F9A106] font-bold text-[20px] !mb-[2px]">লেখার শিরোনাম</div>

                    <input style={{ marginTop: '0' }}
                        onChange={handleTitle}
                        value={title}
                        className="w-full h-[62px] !mt-0 p-4 bg-[#FCF7E8] border-solid border-slate-800 rounded-[8px] text-[#00000080] leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        placeholder="শিরোনাম"
                        required
                    />
                    <div className="text-[#F9A106] font-bold text-[20px] !mt-[30px] !mb-[2px]">সারসংক্ষেপ</div>
                    <textarea
                        onChange={handleSummary}
                        value={summary}
                        className="w-full h-[200px] p-4 !mt-0 bg-[#FCF7E8] border-solid border-slate-800 text-gray-700 rounded-[8px] leading-tight focus:outline-none focus:shadow-outline"
                        id="summary"
                        type="textarea"
                        placeholder="লেখার মূল ভাবার্থ লিখুন"
                        required
                    />

                    <div className="text-[#F9A106] font-bold text-[20px] !mt-[30px] !mb-[2px]">মূল লেখা</div>


                    <div>
                        <CustomEditor
                            initialData=''
                            setContent={setContent}
                        />
                    </div>

                    <div className='submit__btn flex  !mt-[40px]'>
                        <div className='w-[50%] pl-[12px]'>
                            <button
                                onClick={handleSubmit}
                                className="page__common__yello__btn w-full px-[20px] h-[50px] bg-[#FCA000] rounded-md text-[16px] text-white items-center profile__btn__midl"
                            >
                                পোস্ট করুন
                            </button>

                        </div>
                    </div>
                </div>

                <hr class="my-4 border-gray-200" />
            </div>
            <ToastContainer />
        </>
    )
}
