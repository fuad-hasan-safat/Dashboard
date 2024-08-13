'use client'
import React, { useEffect, useState } from 'react'
import {
    BtnBold,
    BtnItalic,
    Editor,
    EditorProvider,
    Toolbar
} from 'react-simple-wysiwyg';
import Select from "react-select";
import Link from "next/link";
import { apiBasePath } from '../../utils/constant';
import CreateCategory from './createCategory';
import CreateWriter from './createWriter';
import Checkbox from '../common/Checkbox'
import AudioFileUpload from './AudiofileUpload';
import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';

const CustomEditor = dynamic(() => {
    return import('../../components/custom-editor');
}, { ssr: false });



export default function CreatePost() {
    const router = useRouter()

    const [content, setContent] = useState("");


    //--------------- catagory -----------------
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedWriter, setSelectedWriter] = useState(null);

    // determine writer and writer id
    const [writer, setWriter] = useState('');
    const [writerId, setWriterId] = useState(null);

    // check box ---- (writer creation)
    const [checkboxValue, setCheckboxValue] = useState(false);


    const [title, setTitle] = useState("");

    const [isLoading, setIsLoading] = useState(true);

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
            })
            .catch((error) => console.error("Error fetching data:", error));

        fetch(`${apiBasePath}/categories`)
            .then((response) => response.json())
            .then((data) => {
                setCategory(data);
            })
            .catch((error) => console.error("Error fetching data:", error))
            .finally(setIsLoading(false));


        setIsCategoryAdded(false)
        setIsWriterAdded(false)
        setIsProfileUpdated(false)
    }, [isWriterAdded, isCategoryAdded])


    // const handleCheckboxChange = (isChecked) => {
    //     setCheckboxValue(isChecked);
    //     // Handle the changed checkbox value in your application logic here
    // };

    const categoryhandleChange = (selected) => {
        setSelectedOption(selected); // Selected option object


    };

    const writerhandleChange = (selected) => {
        setSelectedWriter(selected); // Selected option object
        setWriter(selected?.label)
        setWriterId(selected?.value)
    };

    const customStyles = {
        menu: (provided) => ({
            ...provided,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            color: "#000"
        }),
    };



    // Drop down category
    let Categoryoptions = [];
    let writersOptions = [];
    for (let i = 0; i < category.length; i++) {
        let data = { value: category[i]._id, label: category[i].title };
        // console.log('---data -----------'. data)
        Categoryoptions.push(data);
    }

    for (let i = 0; i < writers.length; i++) {
        let data = { value: writers[i]._id, label: writers[i].name };
        // console.log('---data -----------'. data)
        writersOptions.push(data);
    }

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


    const handleSubmit = async () => {
        console.log("INSIDE HANDLE")
        if (!canPostStatus) {
            // alert('দয়া করে প্রোফাইল তৈরি করুন')
            const confirmLogout = window.confirm('দয়া করে প্রোফাইল তৈরি করুন');
            if (confirmLogout) {
                router.push(`/user/${localStorage.getItem("uuid")}`)
            }

        }
        else {

            if (!title) {
                alert('দয়া করে আপনার লেখার শিরোনাম দিন')
            }
            else if (!selectedOption) {
                alert('দয়া করে আপনার লেখার ধরণ নির্বাচন করুন')
            }
            else if (!summary) {
                alert('দয়া করে আপনার লেখার সারমর্ম লিখুন')
            }
            else {

                // const formated_text = extractText(content)
                console.log({ userUuid, isWriter, writer, writerId })
                var isWriter = true;

                if (userType === 'admin') {
                    isWriter = false;
                }

                const formData = new FormData();
                formData.append("file", selectedFile);
                formData.append("image", image);
                formData.append("category", selectedOption?.label);
                formData.append("cat_id", selectedOption?.value);
                formData.append("writer", writer);
                formData.append("writer_id", writerId);
                formData.append("title", title);
                formData.append("summary", summary);
                formData.append("content", content);
                formData.append("rating", 1);
                formData.append("status", false);
                formData.append("uploaded_by", userUuid);
                formData.append("new_writer", isWriter);


                if (title && selectedOption && summary) {

                    console.log(writer, writerId)

                    try {
                    // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&   inside first &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")


                        const response = await fetch(`${apiBasePath}/posts`, {
                            method: "POST",
                            headers: {

                            },
                            body: formData,
                        });
                    // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&   inside last &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")

                        // console.log("LIKHUN data save ----- response", response)
                        if (response.ok) {
                            const data = await response.json();
                            // console.log("sucessfully sent:", data);
                            alert("আপনার লেখাটি অনুমোদনের জন্য এডমিনের কাছে পাঠানো হয়েছে। লেখাটি শীঘ্রই প্রকাশিত হবে। ধন্যবাদ");

                            setSelectedFile(null);
                            setTitle('');
                            setCategory('');
                            setWriters('');
                            setContent('');
                            setSummary('');
                            
                            router.push('/user/alluserpost')

                        } else {
                            console.error("Failed to update writing:", response.statusText);
                            alert(response.statusText);
                        }
                    } catch (error) {
                        console.error("Error creating post:", error);
                         alert(error);
                    }
                } else {
                    alert('শিরোনাম, লেখার ধরণ ও সারসংক্ষেপ লিখুন')
                }
            }

        }


    };


    //  image handle
    const handleFileChange = async ({ target: { files } }) => {
        const file = files && files[0];
        if (file) {
            setImage(file);
            console.log({ file })
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result); // Set preview image
            };
            reader.readAsDataURL(file);
        }

    };

    return (
        <>
            <div className="lg:pr-6 md:pr-0 sm:pr-0 space-y-4 ">
                <div className="text-yellow-800 text-[22px]">শিরোনাম</div>

                <input
                    onChange={handleTitle}
                    value={title}
                    className="w-full h-[62px] p-4 bg-[#FCF7E8] border-solid border-slate-800 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    placeholder="শিরোনাম"
                    required
                />
                <div className="text-yellow-800 text-[22px]">সারসংক্ষেপ(আপনার মূল লেখার ভাবার্থ)</div>

                <textarea
                    onChange={handleSummary}
                    value={summary}
                    className="w-full h-[200px] p-4 bg-[#FCF7E8] border-solid border-slate-800 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="summary"
                    type="textarea"
                    placeholder="সারসংক্ষেপ"
                    required
                />

                <div className="text-yellow-800 text-[22px]">আপনার মূল লেখা নিচে লিখুন</div>


                <div>
                    <CustomEditor
                        initialData=''
                        setContent={setContent}
                    />
                </div>
                {/* <div className="joidcss">

                    <EditorProvider>
                        <Editor
                            value={content}
                            onChange={textEditorHandler}

                            containerProps={{ style: { color: 'black', height: '550px' }, className: 'auto-height-editor custom-editor' }}

                        >
                            <Toolbar>
                            
                            </Toolbar>
                        </Editor>
                    </EditorProvider>

                </div> */}

                <div className="text-yellow-800 text-[22px]">আপনার লেখার ধরণ নির্বাচন করুন</div>

                <div>
                    <Select
                        value={selectedOption}
                        onChange={categoryhandleChange}
                        styles={customStyles}
                        options={Categoryoptions}
                    />
                </div>
                {userType === 'admin' &&
                    <div className='profile__btn__midl'>

                        <CreateCategory setIsCategoryAdded={setIsCategoryAdded} />

                    </div>}


                {userType === 'admin' &&
                    <>
                        <div className="text-yellow-800 text-[22px]">লেখক নির্বাচন করুন</div>
                        <div className=" place-content-center justify-center ">

                            <div className="">
                                <Select
                                    value={selectedWriter}
                                    onChange={writerhandleChange}
                                    styles={customStyles}
                                    options={writersOptions}
                                />

                            </div>


                            <div className='profile__btn__midl'>
                                <CreateWriter setIsWriterAdded={setIsWriterAdded} />
                            </div>
                        </div>
                    </>
                }






                <div className='text-black'>
                    <h >অডিও আপলোড করুন (যদি থাকে)</h>
                    <AudioFileUpload selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
                </div>

                <div className='text-black'>
                    <div className='mb-[15px]'>
                        <h >ছবি আপলোড করুন (যদি থাকে)</h>
                    </div>

                    <div className='flex border border-solid border-gray-200 rounded-md h-[215px] items-center place-content-center text-center justify-center' >
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                            id="postbaner"
                            accept="image/*"
                        />

                        <label htmlFor='postbaner' className=" cursor-pointer" >
                            {preview.length > 0 && <img
                                src={preview}
                                height={100}
                                width={100}
                                // className="object-cover "
                                alt={preview}
                            />
                            }
                            <div className=" mt-[15px]  file-btn w-[70px] text-[22px] " onClick={handleFileChange}> <i className='ri-camera-line'></i></div>

                        </label>
                    </div>

                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full px-[20px] h-[43px] bg-[#FCA000] rounded-md text-[16px] text-white items-center profile__btn__midl"
                >
                    পোস্ট করুন
                </button>
                <hr class="my-4 border-gray-200" />
            </div>
        </>
    )
}
