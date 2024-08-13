'use client'
import React, { useEffect, useState } from 'react'
import ImageCropProvider from '../cropComponents/ImageCropProvider'
import ImageCrop from '../cropComponents/ImageCrop'
import { apiBasePath } from '../../../utils/constant'
import Class from './profileEdit.module.css'
import { useRouter } from 'next/router'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProfileModal({ setShowModal, showModal, handleClose, image = '' }) {
    const router = useRouter();

    let notification = ''

    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [designation, setDesignation] = useState('');
    const [designationFromApi, setDesignationFromApi] = useState([])
    const [birthOfDate, setBirthOfDate] = useState(null);
    const [profileStatus, setProfileStatus] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setemail] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [bio, setBio] = useState('')
    const [bioId, setBioId] = useState('')
    const [isSubmit, setIsSubMit] = useState(false)
    const [isSubmitEmail, setIsSubMitEmail] = useState(false)
    const [follower, setFollower] = useState(0);
    const [following, setFollowing] = useState(0);
    const [approvedPostNum, setApprovedPostNum] = useState(0);
    const [unapprovedPostNum, setunApprovedPostNum] = useState(0);


    // get saved info
    const [status, setStatus] = useState("");
    const [username, setUsername] = useState("");
    const [userUuid, setUserUuid] = useState("");
    const [userToken, setUserToken] = useState("");
    const [number, setnumber] = useState("");

    // designation list
    const [selectedDesignation, setSelectedDesignation] = useState(null);
    const [desigNationId, setDesigNationId] = useState('')

    // Fetch user data on component mount
    useEffect(() => {
        setUsername(localStorage.getItem("name") || "");
        setUserToken(localStorage.getItem("token") || "");
        setUserUuid(localStorage.getItem("uuid") || "");
        setnumber(localStorage.getItem("phone") || "");

        //  ge tprofile data-----
        fetch(`${apiBasePath}/getprofile/${localStorage.getItem("uuid")}`)
            .then((response) => response.json())
            .then((data) => {
                // console.log('pofile details MODAL--------------->>>>>>>', data);
                // setDesignation(data.object.profile?.designation || '')
                setDesignation(data.object.profile?.designation || '')
                setProfileStatus(data.object.profile?.profileStatus || '')
                setGender(data.object.profile.gender)
                setBirthOfDate(data.object.profile.dob)
                setUsername(data.object.profile.name || '')
                setAddress(data.object.profile?.address || '')
                setemail(data.object.profile.email)
                setPhoneNumber(data.object.profile.phone)
                setGender(data.object.profile.gender)

                setFollower(data.object.stats.follower)
                setFollowing(data.object.stats.following)
                setApprovedPostNum(data.object.approved_post)
                setunApprovedPostNum(data.object.unapproved_post)

                if (data.object.profile?.image) {
                    saveImageFromURL(`${apiBasePath}/${data.object.profile.image?.slice(data.object.profile.image.indexOf("/") + 1)}`, 'profile.jpg')

                }

                if (data.object.profile.phone?.length > 0) {
                    setIsSubMit(true);
                }

                if (data.object.profile.email?.length > 0) {
                    setIsSubMitEmail(true)
                }


            })
            .catch((error) => console.error("Error fetching profile:", error));




        const fetchUserBioData = async () => {
            const response = await fetch(`${apiBasePath}/bio/${localStorage.getItem("uuid")}`);
            const data = await response.json();
            setBio(data?.content)
            setBioId(data?._id)
            // console.log('------------>>> BIO  <<<-------------', data)

        };

        fetchUserBioData();


        //  get designations options 
        fetch(`${apiBasePath}/designation`)
            .then((response) => response.json())
            .then((data) => {
                setDesignationFromApi(data);
                // console.log('DESIGNATION 000000000000000000 )', data)
            })
            .catch((error) => console.error("Error fetching data:", error));

        // console.log({ address, phoneNumber })
    }, []);



    useEffect(() => {
        // Prevent scrolling of background page when modal is open
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            // Revert overflow setting when component unmounts
            document.body.style.overflow = 'unset';
        };
    }, [showModal]);



    //  functions
    const designationChange = (selected) => {
        // console.log({ selected })
        setSelectedDesignation(selected); // Selected option object
        setDesignation(selected?.label)
        setDesigNationId(selected?.value)
    };

    const handleDate = (date) => {
        setBirthOfDate(date);
    };

    function saveImageFromURL(url, filename) {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                setImageFile(blob);
            })
            .catch(error => console.error('Error:', error));
    }



    function reloadPage() {
        setTimeout(() => {
            setIsSubMit(true)
            setShowModal(false)
            router.reload()
        }, 2000)
    }
    //  handle submit

    const handleSubmit = async (e) => {
        e?.preventDefault();

        //  update bio
        try {
            const response = await axios.post(
                `${apiBasePath}/bio`,
                {
                    user_id: `${localStorage.getItem("uuid")}`,
                    content: bio,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log('bio post res', response)

        } catch (error) {
            console.error('Error updating profile:', error);
        }




        try {
            const response = await axios.put(
                `${apiBasePath}/bio/${bioId}`,
                {
                    content: bio
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log('bio PUT res', response)


        } catch (error) {
            console.error('Error updating profile:', error);
        }


        console.log('outside check,', image, imageFile)
        //  update profile data

        if (username.trim().length <= 0) {
            notification = 'দয়া করে প্রোফাইল এর নাম নির্বাচন করুন';
            notify();
        }
        else if ((image?.length <= 0) && (!imageFile)) {
            notification = 'দয়া করে প্রোফাইল এর জন্য স্থিরচিত্র নির্বাচন করুন';
            notify();
        }
        else if (designation?.length <= 0) {
            notification = 'আপনার পদবী প্রদান করুন';
            notify();
        }
        else if (!gender) {
            notification = 'আপনার লিঙ্গ নির্ধারণ করুন';
            notify();
        } else if (!birthOfDate) {
            notification = 'আপনার জন্ম তারিখ প্রদান করুন';
            notify();
        } else {

            //const formattedDate = moment(startDate).format('DD-MM-YYYY');
            console.log({ selectedDesignation, designation })
            const formData = new FormData();
            formData.append('file', imageFile);
            formData.append('name', username)
            formData.append('designation', designation);
            formData.append('profileStatus', profileStatus);
            formData.append('gender', gender);
            formData.append('dob', birthOfDate);
            formData.append('address', address);
            formData.append('email', email);
            formData.append('phone', phoneNumber);
            formData.append('user_id', localStorage.getItem("uuid"));
            // const token = JSON.parse(localStorage.getItem('token'));
            try {
                const response = await fetch(`${apiBasePath}/profile`, {
                    method: 'PUT',
                    headers: {
                        // 'x-access-token': token,
                    },
                    body: formData
                });

                // console.log('------>>>> PROFILE RESPONSE <<<<<<--------', response)

                if (response.ok) {
                    const data = await response.json();
                    // alert('প্রোফাইল সফলভাবে আপডেট হয়েছে')
                    notification = 'প্রোফাইল সফলভাবে আপডেট হয়েছে';
                    notify1();
                    console.log('Profile updated successfully:', data);


                    reloadPage()

                } else {
                    console.error('Failed to update profile:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating profile:', error);
            }

        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
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

    const notify1 = () => toast.success(notification, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,

    });


    return (
        <>

            <div className={`${showModal ? 'block' : 'hidden'} fixed z-[9999] inset-0 overflow-y-auto flex items-center justify-center bg-black/70`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <ToastContainer />

                <div className=" inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom mt-[650px] mb-[300px] bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all lg:max-w-[700px] sm:align-middle sm:max-w-lg sm:w-full xs:max-w-[340px] w-full">


                    <div className="bg-white pb-[60px] ">

                        <div className=" sm:flex sm:items-start h-[140px] bg-[#FFC973]">

                        </div>

                        <div className='-mt-[80px]'>
                            <ImageCropProvider>
                                <ImageCrop setImageFile={setImageFile} image={image === '' ? '/images/defaultUserPic/profile.jpg' : `${apiBasePath}/${image?.slice(image.indexOf('/') + 1)}`} />
                            </ImageCropProvider>

                        </div>

                        <div className='px-[10px] lg:max-w-[640px] md:max-w-[570px] sm:max-w-[540px] xs:max-w-[310px] items-center justify-center place-content-center m-auto'>
                            <input
                                type='text'
                                className={`${Class.profile__input} h-[40px] px-[16px]`}
                                placeholder='আপনার নাম '
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            ></input>



                            <input
                                type='number'
                                className={`${Class.profile__input} h-[40px] px-[16px]`}
                                placeholder='মোবাইল নাম্বার'
                                required
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                disabled={isSubmit}
                            ></input>

                            <input
                                type='email'
                                id='email'
                                name='email'
                                className={`${Class.profile__input} h-[40px] px-[16px]`}
                                placeholder='mail@domain.com'
                                required
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                disabled={isSubmitEmail}
                            ></input>

                            <input
                                id='birthdate'
                                type='date'
                                className={`${Class.profile__input} h-[40px] px-[16px]`}
                                placeholder='জন্ম তারিখ'
                                value={birthOfDate}
                                onChange={(e) => setBirthOfDate(e.target.value)}
                            ></input>

                            {/* <input
                            className={`${Class.profile__input}`}
                            placeholder='লিঙ্গ'
                        ></input> */}
                            <div className='flex flex-row  space-x-[24px] '>
                                <select
                                    id="designation"
                                    name="designation"
                                    className={`${Class.profile__input} h-[40px] px-[16px]`}
                                    required
                                    value={designation}
                                    onChange={(e) => setDesignation(e.target.value)}>
                                    <option value="">পদবী</option>
                                    {designationFromApi.map((category) => (
                                        <option key={category._id} value={category.title}>
                                            {category.title}
                                        </option>
                                    ))}

                                </select>
                                <select
                                    id="sex"
                                    name="sex"
                                    className={`${Class.profile__input} h-[40px] px-[16px]`}
                                    required
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}>
                                    <option value="">লিঙ্গ</option>
                                    <option value="male">পুরুষ</option>
                                    <option value="female">নারী</option>
                                </select>

                            </div>

                            <input
                                id='profilestatus'
                                type='text'
                                placeholder='স্ট্যাটাস'
                                className={`${Class.profile__input} h-[40px] px-[16px]`}
                                value={`${profileStatus === 'undefined' ? '' : profileStatus}`}
                                onChange={(e) => setProfileStatus(e.target.value)}
                            >
                            </input>


                            <input
                                id='address'
                                name='address'
                                type='text'
                                className={`${Class.profile__input} h-[40px] px-[16px]`}
                                placeholder='ঠিকানা'
                                value={`${address === ('undefined' || undefined) ? '' : address}`}
                                onChange={(e) => setAddress(e.target.value)}

                            ></input>

                            {/* <input
                            type='text'
                            className={`${Class.profile__input} px-[16px] h-[309px]`}
                            placeholder='সংক্ষিপ্ত জীবনী'
                        ></input> */}

                            <textarea
                                id="bio"
                                name="bio"
                                placeholder='সংক্ষিপ্ত জীবনী'
                                required
                                className={`h-[180px] ${Class.profile__input} px-[16px] py-[16px] `}
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />

                        </div>




                        <div className="flex justify-center lg:text-[22px] md:text-[20px] sm:text-[16px] xs:text-[16px]">
                            <button
                                type="button"
                                className="page__common__yello__btn bg-white  text-[#F9A106]  py-[7px] lg:px-[125px] md:px-[80px] sm:px-[65px] xs:px-[40px] rounded border border-[#F9A106] focus:outline-none focus:shadow-outline mr-2"
                                onClick={handleClose}
                            >
                                বাতিল
                            </button>
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="page__common__yello__btn ml-[6px] bg-[#FCA000] hover:bg-[#e3a230] text-white py-[7px] lg:px-[125px] md:px-[80px] sm:px-[60px] xs:px-[40px] rounded focus:outline-none focus:shadow-outline"
                            >
                                আপডেট
                            </button>


                        </div>



                    </div>
                </div>


            </div>




        </>

    )
}
