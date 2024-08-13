'use client'
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Head from 'next/head';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AudioPlayListContext } from "../../store/audioPlayer-context";
import { apiBasePath } from "../../../utils/constant";
import { AdminContext } from "../../store/adminpanel-context";
import ReaderModeModal from '../../../components/readerMode/ReaderModeModal';
import FullPostReaderMode from '../../common/fullContentReadermood';
import FullPost from '../../common/fullContent';

export default function PostDetails() {
    const { setViewPost } = useContext(AdminContext)

    const { viewPostid } = useContext(AdminContext);
    const { toggleAudioPlay, audioPlace, currentPlayingIndex, isAudioPlaying } = useContext(AudioPlayListContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postData, setPostData] = useState({
        data: [],
        writerImage: '',
        profilename: '',
        uploaderName: '',
        isAudioAvailable: false,
        isdataFetch: false
    })


    useEffect(() => {
        try {
            fetchData();
            setPostData((prevPostData) => ({
                ...prevPostData,
                isdataFetch: true,
            }))
        } catch (error) {
            setPostData((prevPostData) => ({
                ...prevPostData,
                isdataFetch: true,
            }))
        } finally {
        }
    }, [])


    async function fetchData() {
        console.log('view post in dashboard ', viewPostid)
        const res = await fetch(`${apiBasePath}/getpost/${viewPostid}`)
        const postData = await res.json()

        setPostData((prevPostData) => ({
            ...prevPostData,
            data: postData.object,
            isAudioAvailable: postData.object?.audio ? true : false,
            isdataFetch: postData?.status === "success" ? true : false,
            profilename: postData?.profile_name,
            writerImage: postData?.writer_image,
            uploaderName: postData?.uploader_name,
        }))


    }


    if (!postData.isdataFetch) return null;


    function readerModeClosehandler() {
        setIsModalOpen(false);
    }


    // select image

    let selectedCoverImage = postData.writerImage;

    if (postData?.data?.image) {
        selectedCoverImage = postData?.data?.image;
    }

    let audioList = [];

    if (postData.isAudioAvailable) {
        audioList = [
            {
                id: postData?.data?._id,
                title: postData?.data?.title,
                audio: `${postData?.data?.audio}`,
                writer: postData?.data?.writer,
                image: `${postData?.writerImage}`,
            }
        ]

    }



    return (

        <>
            <div>
                <Head>
                    <title>{postData?.data?.title}</title>
                </Head>
            </div>
            <div className=" body__control" >

                <div className=" relative all__post__content__overlay">
                    <div onClick={() => setViewPost('', false)} className="absolute text-black hover:text-white text-[26px] cursor-pointer  z-[99] top-0 left-0">
                        <i class="fixed bg-[#FFD700] hover:bg-[#F9A106] hover:text-white px-[15px] ri-arrow-left-line"></i>
                    </div>
                    <section className="place-content-center">
                        <div className="banner__bg__sm__wrap relative w-full xl:h-[190px] lg:h-[180px] md:h-[180px] sm:h-[180px] xs:h-[170px]  overflow-hidden" style={{ background: `url('/images/pages-banner-svg/baseBanner.png')center center / cover no-repeat` }}>
                            {<h2 className=" absolute lg:text-[40px] md:text-[38px] sm:text-[35px] xs:text-[25px] text-[#F9A106]">{postData?.data?.category}</h2>}
                        </div>
                    </section>
                    <section className="all__post__main__content">
                        <div className="container">
                            <div className="lg:flex lg:flex-row">
                                {(
                                    <div className="flex flex-col w-full relative z-50">
                                        {postData.isdataFetch &&
                                            <>
                                                <div className="kobita__dsc__lft relative flex lg:mb-[110px] md:mb-[84px]">
                                                    <div>
                                                        <FullPost
                                                            id={viewPostid}
                                                            content={postData?.data?.content}
                                                            title={postData?.data?.title}
                                                            writer={postData?.data?.writer}
                                                            writer_id={postData?.data?.writer_id}
                                                            image={selectedCoverImage}
                                                            uploadedBy={postData.profilename}
                                                            writer_image={postData.writerImage}
                                                            profileName={postData.profilename}
                                                            updatedAt={postData?.data?.updatedAt}
                                                            catagory={postData?.data?.category}
                                                        />

                                                        {postData.isAudioAvailable && (
                                                            <div className="audio__tab__playbutton absolute  lg:left-[15px] md:left-[15px] sm:left-[15px] xs:left-[12px]  lg:top-[150px] md:top-[140px] sm:top-[130px] xs:top-[110px]">
                                                                <button className="text-center text-[#F9A106]  flex justify-center items-center" onClick={() => toggleAudioPlay(0, audioList, viewPostid)}>
                                                                    <span className="inline-block text-[24px]"> {isAudioPlaying && 0 === currentPlayingIndex && audioPlace === viewPostid ? <i class="ri-pause-circle-fill"></i> : <i class="ri-play-circle-fill"></i>}</span> <span className="inline-block font-[600] text-[14px]"> প্লে করুন</span>
                                                                </button>
                                                            </div>

                                                        )}

                                                    </div>
                                                    <div>
                                                        <button onMouse className="absolute  w-[35px] h-[35px] right-2 mt-[5px] text-white rounded-xl bg-orange-400" onClick={() => setIsModalOpen(true)}><i class="ri-book-read-fill text-[22px]"></i></button>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                        {!postData.isdataFetch &&
                                            <>
                                                <div className="text-black text-2xl mb-[75px] h-[100vh]">
                                                    আপনার অনুসন্ধানকৃত লেখাটি পাওয়া যাচ্ছে না !
                                                </div>
                                            </>
                                        }
                                    </div>
                                )

                                }
                            </div>
                        </div>
                    </section>
                    <ToastContainer />

                </div>


                <ReaderModeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <section className="read__mod__sec__wrap py-[100px] pb-[470px]" onCopy={(e) => { e.preventDefault(); alert('এই ওয়েবসাইটের যেকোনো লেখা আমাদের অনুমতি ছাড়া কপি করলে আইনগত ব্যবস্থা গ্রহণ করা হবে।') }}>
                        <div className="read__mod__wrap">
                            <div className="read__mod__btn">
                                <button className="w-[40px] h-[40px] text-white rounded-full bg-orange-400" onClick={readerModeClosehandler}><i class="ri-close-large-fill"></i></button>
                            </div>
                            <div className="read__mod__innr">
                                <FullPostReaderMode
                                    title={postData?.data?.title}
                                    writer={postData?.data?.writer}
                                    writer_id={postData?.data?.writer_id}
                                    catagory={postData?.data?.category}
                                    content={postData?.data?.content}
                                />
                            </div>
                        </div>
                    </section>

                </ReaderModeModal>
            </div>
        </>
    );
}
