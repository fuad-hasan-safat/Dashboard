'use client'
import React, { useEffect, useState } from 'react'
import { apiBasePath } from '../../utils/constant'
import ImageCrop from './cropComponents/ImageCrop'
import ImageCropProvider from './cropComponents/ImageCropProvider'
import UserAchivement from './userAchivement'
import { useRouter } from 'next/router'
import axios from 'axios'
import { convertToBanglaPhoneNumber, convertToBengaliDate } from '../../utils/convertToBanglaDate'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function WriterProfileBanner({
    apprevedPost = 0,
    unApprovedPost = 0,
    follower = 0,
    following = 0,
    setProfileController,
    // writerInfo,
    // writerBio,
    profileInfo,
    isSelfWriter,

}) {
    const router = useRouter()
    const slug = router.query.slug;

    let notification = ''

    const [loggedInUser, setLoggedInUser] = useState("");
    const [userUuid, setUserUuid] = useState("");
    const [userToken, setUserToken] = useState("");
    const [isAlreadyFollowing, setIsAlreadyFollowing] = useState(false)
    const [bio, setBio] = useState('')
    const [bioId, setBioId] = useState('')
    const [profileStats, setProfileStats] = useState([])
    const [approvedPost, setApprovedPost] = useState(0)
    const [unapprovedPost, setUnapprovedPost] = useState(0)


    useEffect(() => {
        setLoggedInUser(localStorage.getItem("name") || "");
        setUserToken(localStorage.getItem("token") || "");
        setUserUuid(localStorage.getItem("uuid") || "");
        // setUserPhone(localStorage.getItem("phone") || "");

        if (isSelfWriter) {
            const fetchUserBioData = async () => {
                const response = await fetch(`${apiBasePath}/bio/${profileInfo?.user_id}`);
                const data = await response.json();
                setBio(data?.content)
                setBioId(data?._id)
                // console.log('------------>>> BIO  <<<-------------', data)

            };

            fetchUserBioData();

            getFollowingStatus(profileInfo?.user_id, localStorage.getItem("uuid"))


            // 
            let userid = profileInfo?.user_id;
            fetch(`${apiBasePath}/getprofile/${userid}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log('pofile details writer profile--------------->>>>>>>', data);
                    setProfileStats(data.object.stats)
                    setApprovedPost(data.object.approved_post)
                    setUnapprovedPost(data.object.unapproved_post)


                    // console.log(' profile image----------->>>>', image)
                })
                .catch((error) => console.error("Error fetching data:", error));

        }


    }, []);

    async function getFollowingStatus(user_id, following) {
        try {
            const followingResponse = await axios.post(
                `${apiBasePath}/followstatus`,
                {
                    user_id: following,
                    following: user_id,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setIsAlreadyFollowing(followingResponse.data.status)
            console.log('followingResponse ------------------------- writer in response message---------------->>>>>>', followingResponse)
        } catch (error) {
            // console.log("inside catch ----------------", error);
        }
    }

    let image = ''
    let rendredBio = ''
    let birthDate = ''

    if (isSelfWriter) {
        image = profileInfo?.image;

        birthDate = profileInfo?.dob

        if (bio?.length > 0) {
            rendredBio = bio;

        } else {
            // rendredBio = writerBio?.content;
        }

    } else {
        image = writerInfo?.image;
        rendredBio = writerBio?.content;
        birthDate = writerInfo?.birth_date;
    }

    const banglaBirthDate = convertToBengaliDate(birthDate)
    const banglaGender = profileInfo?.gender === 'male' ? 'পুরুষ' : 'নারী';



    async function followUserhandler(user_id, following) {
        if(!localStorage.getItem('uuid') || localStorage.getItem('uuid').length <= 0 ){
            notification = 'অনুসরণ করতে লগইন করুন'
            notify();

            return;
        }
        if (!isAlreadyFollowing) {
            try {
                const response = await axios.post(
                    `${apiBasePath}/follow`,
                    {
                        user_id: following,
                        following: user_id,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log('following ------------------------- writer in response message---------------->>>>>>', response)
                notification = 'অনুসরণ করছেন'
                notify1();
            } catch (error) {
                // console.log("inside catch ----------------", error);
            }
        } else {
            // alert(`আপনি ইতিমধ্যেই ${writerInfo.name} কে অনুসরণ করছেন `)
            notification = `আপনি ইতিমধ্যেই ${writerInfo.name} কে অনুসরণ করছেন `;
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
        progress: undefined,
    });

    console.log('image --------- length >>>>>', profileInfo?.image)
    return (
        <>

            <div className='container border pb-[20px]'>
                <div className="flex justify-center">
                    <img
                        className="lg:w-[264px] lg:h-[264px]  md:w-[200px] md:h-[200px] sm:w-[180px] sm:h-[180px] xs:w-[180px] xs:h-[180px] rounded-full  border-4 border-solid border-white -mt-[110px]  "
                        src={image?.length > 0 ? `${apiBasePath}/${image.slice(image.indexOf("/") + 1)}` : '/images/defaultUserPic/profile.jpg'}
                    />
                </div>
                <h1><span className='text-[35px] text-[#FCD200]'>{profileInfo?.name}</span> <span className='text-[#595D5B] pl-[20px] text-[22px]'>{profileInfo?.designation}</span></h1>

                <ul className='profile__info__wrap flex flex-row text-[#737373] text-[20px] lg:mt-[10px]'>


                    {birthDate?.length > 0 && <li>
                        <span className='text-[#F9A106]'><img src='/images/usericons/birthdate.svg' /></span> <span className='text-[#737373]'>{banglaBirthDate}</span>
                    </li>}

                    {isSelfWriter && profileInfo?.gender?.length > 0 && <li>
                        <span className='text-[#F9A106] ml-[30px]'>{profileInfo?.gender === 'male' ? <img src='/images/usericons/sexicon.svg' /> : <img src='/images/usericons/sexicon.svg' />}</span> <span className='capitalize text-[#737373]'>{banglaGender}</span>
                    </li>}

                </ul>
                {isSelfWriter && <ul className={` profile__info__wrap text-[#737373] text-[20px] lg:mt-[14px] ${isSelfWriter ? '' : 'mb-[44px]'}`}>

                    {profileInfo?.address?.length > 0 && <li>
                        <span className='text-[#F9A106]'><img src='/images/usericons/location.svg' /></span> <span className='text-[#737373]'>{profileInfo?.address}</span>
                    </li>}

                    {profileInfo?.phone?.length > 0 && <li>
                        <span className='text-[#F9A106] '><img src='/images/usericons/phone.svg' /></span> <span className='text-[#737373] '>+{convertToBanglaPhoneNumber(profileInfo?.phone)}</span>
                    </li>}

                    {profileInfo?.email?.length > 0 && <li>
                        <span className='text-[#F9A106]'><img src='/images/usericons/email.svg' /></span> <span className='text-[#737373] '>{profileInfo?.email}</span>
                    </li>}
                </ul>}

                {isSelfWriter && <div className='w-full mt-[44px] mb-[44px]'>
                    <button
                        className='page__common__yello__btn w-full py-[13px] bg-[#F9A106] px-[75px] p-1 rounded-md text-white text-[16px]'
                        onClick={() => followUserhandler(profileInfo?.user_id, userUuid)}
                    >
                        <span><i class="ri-add-box-fill"></i></span> <span> {isAlreadyFollowing ? 'অনুসরণ করছেন' : 'অনুসরণ করুন'}</span>
                    </button>
                    <ToastContainer />
                </div>}

                {isSelfWriter && <hr></hr>}


                {isSelfWriter && <div className='mt-[30px] mb-[40px] flex justify-center'>
                    <UserAchivement
                        setProfileController={setProfileController}
                        follower={profileStats?.follower}
                        following={profileStats?.following}
                        apprevedPost={approvedPost}
                        unApprovedPost={unapprovedPost} />
                </div>}

                {isSelfWriter && <hr></hr>}

                {rendredBio?.length > 0 && <div className='mb-[25px]'>
                    <h1 className='mt-[30px] text-[#F9A106] text-[20px]'>সংক্ষিপ্ত বায়ো</h1>
                    <p className='text-[20px] text-[#737373] mt-[10px]'>{rendredBio}</p>
                </div>}

            </div>
        </>
    )
}
