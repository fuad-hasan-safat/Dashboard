"use client";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Head from 'next/head';


import { fetchData } from "../../../function/api";
import { apiBasePath } from "../../../utils/constant";
import FullPostReaderMod from '../../../components/common/fullContentReadermood'

export default function PostDetailsReaderMood() {
    const router = useRouter();
    const slug = router.query.slug;

    const [data, setData] = useState(null); // State to store fetched data
    const [writerImage, setWriterImage] = useState('')
    const [error, setError] = useState(null); // State to store any errors
    const [isAudioAvailable, setIsAudioAvailAble] = useState(false);
    const [isdataFetch, setisDataFetch] = useState(false)

    const [fontSize, setFontSize] = useState(20)

    //  focus mood ----



    useEffect(() => {

        async function fetchDataAsync() {

            try {
                const result = await fetchData(
                    `${apiBasePath}/getpost/${slug}`
                );
                setData(result.object);
                setWriterImage(result.writer_image)
                 console.log('post page ====================>>>>>>>>>>>>>>>>>>>>', result.object)
                if (result.object.audio?.length > 0) {
                    setIsAudioAvailAble(true);
                } else {
                    setIsAudioAvailAble(false)
                }

                if (result.status === 'success') {
                    setisDataFetch(true)
                } else if (result.status === 'failed') {
                    setisDataFetch(false)
                }

            } catch (error) {
                setError(error)

            } finally {
            }
        }

        fetchDataAsync();
    }, [router.query]);

    function readMoodHandler(postId) {
        router.push(`/post/${postId}`)
    }


    return (
        router.isReady &&

        <>


            <section className="read__mod__sec__wrap py-[100px] pb-[470px]" onCopy={(e)=>{e.preventDefault(); alert('এই ওয়েবসাইটের যেকোনো লেখা আমাদের অনুমতি ছাড়া কপি করলে আইনগত ব্যবস্থা গ্রহণ করা হবে।')}}>
                <div className="read__mod__wrap">
                    <div className="read__mod__btn">
                        <button className="w-[40px] h-[40px] text-white rounded-full bg-orange-400" onClick={() => readMoodHandler(data?._id)}><i class="ri-close-large-fill"></i></button>
                    </div>
                    <div className="read__mod__innr">
                        <FullPostReaderMod
                            title={data?.title}
                            writer={data?.writer}
                            writer_id={data?.writer_id}
                            catagory={data?.category}
                            content={data?.content}
                            fontSize={fontSize} />
                    </div>
                </div>
            </section>

        </>
    );
}
