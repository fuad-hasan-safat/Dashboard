'use client'
import React, { useContext, useEffect, useState } from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import AudioRecentSlider from './components/AudioRecentSlider/AudioRecentSlider';
import { SeeAllSliderContext } from '../store/seeall-slider-context';
import { apiBasePath } from '../../utils/constant';
import axios from 'axios';


export default function AudioBookHome() {

    // const [isLoaded, setIsloaded] = useState(false);
    const { setSliderInfo } = useContext(SeeAllSliderContext);

    const [data, setData] = useState({
        textSlider: [],
        recentSlider: [],
        isLoaded: false
    })

    useEffect(() => {

        loadData()


    }, [])

    async function loadData() {

        try {
            const url = `${apiBasePath}/quotes`;
            const url2 = `${apiBasePath}/recentbooks`;

            const response = await axios.get(url);
            console.log('audio book quote response', response)
            const textSliderData = response.data;

            const response2 = await axios.get(url2);
            const recentSliderData = response2.data;
            console.log('recent book', recentSliderData)

            setData((prevData) => ({
                ...prevData,
                textSlider: textSliderData,
                recentSlider: recentSliderData,
                isLoaded: true

            }))

        } catch (error) {
            console.log({ error })
        }


    }

    if (!data.isLoaded) return null;

    var settings = {
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };



    return (
        <section className='hm__audio__book__sec'>
            <div className='container'>
                <div className='clearfix'>
                    <div className='hm__audio__book__wrap'>
                        <div className='audiu__logo'>
                            <Link href='/audiobook'><img src='/images/audio-logo.png' alt='Audio Logo' /></Link>
                        </div>
                        {data.textSlider.length > 0 && <Slider {...settings}>
                            {data.textSlider?.map((item, index) =>
                                <div key={index} className='hm__audio__slide__item'>
                                    <p>{item?.title}</p>
                                </div>
                            )}
                        </Slider>}

                        {
                            data.recentSlider.books.length > 0 && <div className='hm__audio__recent__wrap'>
                                <div className='hm__audio__see__more'>
                                    <h3>সাম্প্রতিক</h3>
                                    <Link className='hm__audio__common__btn' href='audiobook/seemorelist/' onClick={() => setSliderInfo('no_background', 'সাম্প্রতিক')}>সব দেখুন</Link>
                                </div>
                                <AudioRecentSlider recentSliderData={data.recentSlider.books} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};
