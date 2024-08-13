import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/sidebar/Sidebar';
import { apiBasePath } from '../../../utils/constant';
import ProfilePostLeftContent from '../../../components/userprofile/ProfilePostLeftContent';
import axios from 'axios';
import Head from 'next/head';
import WriterProfileBanner from '../../../components/userprofile/writerProfileBanner';
import FollowerList from '../../../components/userprofile/followerList';
import FollowingList from '../../../components/userprofile/followingList';

export default function WriterProfile() {
    const router = useRouter()
    const slug = router.query.slug;



    // user post
    const [userPost, setUserPost] = useState([]);


    // profile information fetch
    const [username, setUserName] = useState('')
    const [designation, setDesignation] = useState('');
    const [profileStatus, setProfileStatus] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState('');
    const [follower, setFollower] = useState(0);
    const [post, setPost] = useState(0);
    const [following, setFollowing] = useState(0);

    const [profileController, setProfileController] = useState("")

    //  following status check
    const [isAlreadyFollowing, setIsAlreadyFollowing] = useState(false)


    //  fetch data from local store

    const [loggedInUser, setLoggedInUser] = useState("");
    const [userUuid, setUserUuid] = useState("");
    const [userToken, setUserToken] = useState("");


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
            console.log('followingResponse ------------------------- writer in response message---------------->>>>>>', followingResponse.data.status)
        } catch (error) {
            // console.log("inside catch ----------------", error);
        }
    }

    useEffect(() => {
        console.log("-----------------------------  SLUG -----------------------", slug);
        fetch(`${apiBasePath}/getprofile/${slug}`)
            .then((response) => response.json())
            .then((data) => {
                console.log('pofile details on writer---- profile--------------->>>>>>>', data);
                setDesignation(data.object.profile?.designation)
                setProfileStatus(data.object.profile?.profileStatus)
                setGender(data.object.profile.gender)
                setDob(data.object.profile.dob)
                setAddress(data.object.profile.address)
                setEmail(data.object.profile.email)
                setPhone(data.object.profile.phone)
                setImage(data.object.profile.image || '')
                setFollower(data.object.stats.follower)
                setFollowing(data.object.stats.following)
                setPost(data.object.stats.post)
                setUserName(data.object.profile.name)


                console.log(' profile ----------->>>>', data)
            })
            .catch((error) => console.error("Error fetching data:", error));

        //  following status




        // user post

        async function fetchDataAsync() {
            try {
                const result = await fetchData(
                    `${apiBasePath}/postsbyuser/${slug}`
                );

                setUserPost(result.object);

            } catch (error) {
                //alert("Error fetching user post");
                console.log("Error fetching user post")
            }
        }

        fetchDataAsync();


        getFollowingStatus(slug, userUuid)

    }, [router.query])


    useEffect(() => {
        setLoggedInUser(localStorage.getItem("name") || "");
        setUserToken(localStorage.getItem("token") || "");
        setUserUuid(localStorage.getItem("uuid") || "");
        // setUserPhone(localStorage.getItem("phone") || "");

    }, []);

    async function followUserhandler(user_id, following) {
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

        } catch (error) {
            // console.log("inside catch ----------------", error);
        }
    }

    const handleClose = () => setProfileController('profile');

    return (
        router.isReady &&
        <>
            {/* main section */}
            <div>
                <Head>
                    <title>{username}</title>
                </Head>
            </div>
            <section className=' text-black mb-[110px]' >
                {/* profile header */}
                <section>

                    <div>
                        <div>
                            <WriterProfileBanner
                                image={image}
                                post={post}
                                follower={follower}
                                following={following}
                                username={username}
                                designation={designation}
                                profileStatus={profileStatus}
                                setProfileController={setProfileController}
                            />

                        </div>
                        {isAlreadyFollowing === false ?
                            <div className='container relative '>
                                <button
                                    className='absolute mt-[70px] ml-[12.5%] h-[43px] bg-[#F9A106] hover:bg-[#c67256] px-[48px] p-1 rounded-lg text-white text-[16px]'
                                    onClick={() => followUserhandler(slug, userUuid)}
                                >
                                    অনুসরণ করুন
                                </button>

                            </div> :

                            <div className='container  '>
                                <button
                                    className='mt-[30px] ml-[12.5%] h-[43px] bg-[#F9A106]  px-[48px] p-1 rounded-lg text-white text-[16px]'
                                    onClick={() => followUserhandler(slug, userUuid)}
                                >
                                    অনুসরণ করছেন
                                </button>

                            </div>

                        }

                    </div>

                </section>

                {/* profile body */}

                <section>
                    <div className='all__post__sec__wrap'>
                        <div className='container'>
                            <div className='lg:flex lg:flex-row'>
                                <div className='lg:w-[70%]'>
                                    {<ProfilePostLeftContent slug={slug} />}

                                    {
                          profileController === 'follower' &&
                          <FollowerList showModal={'follower'} handleClose={handleClose} />
                        }

                        {
                          profileController === 'following' &&
                          <FollowingList showModal={'following'} handleClose={handleClose} />
                        }
                                </div>
                                {/* <div className='lg:w-[30%]'>
                                    <Sidebar />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </section>

            </section>
        </>
    )
}
