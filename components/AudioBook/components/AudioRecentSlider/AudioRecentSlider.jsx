import React from 'react';
import Image from 'next/image';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRouter } from 'next/router';
import { apiBasePath } from '../../../../utils/constant';


export const AudioRecentSliderData = [
  {
    id: 1,
    image: '/audioBook/audio-slider/audio-slider-img-1.png',
    title: 'তিন গোয়েন্দা',
    kText: 'লেখক : রকিব হাসান',
    vText: 'কন্ঠ: রকিব হাসান তুষার',
    time: '১:৪১ মিনিট',
  },
  {
    id: 2,
    image: '/audioBook/audio-slider/audio-slider-img-2.png',
    title: 'তিন গোয়েন্দা',
    kText: 'লেখক : রকিব হাসান',
    vText: 'কন্ঠ: রকিব হাসান তুষার',
    time: '১:৪১ মিনিট',
  },
  {
    id: 3,
    image: '/audioBook/audio-slider/audio-slider-img-3.png',
    title: 'তিন গোয়েন্দা',
    kText: 'লেখক : রকিব হাসান',
    vText: 'কন্ঠ: রকিব হাসান তুষার',
    time: '১:৪১ মিনিট',
  },
  {
    id: 4,
    image: '/audioBook/audio-slider/audio-slider-img-4.png',
    title: 'তিন গোয়েন্দা',
    kText: 'লেখক : রকিব হাসান',
    vText: 'কন্ঠ: রকিব হাসান তুষার',
    time: '১:৪১ মিনিট',
  },
  {
    id: 5,
    image: '/audioBook/audio-slider/audio-slider-img-5.png',
    title: 'তিন গোয়েন্দা',
    kText: 'লেখক : রকিব হাসান',
    vText: 'কন্ঠ: রকিব হাসান তুষার',
    time: '১:৪১ মিনিট',
  },
  {
    id: 6,
    image: '/audioBook/audio-slider/audio-slider-img-6.png',
    title: 'তিন গোয়েন্দা',
    kText: 'লেখক : রকিব হাসান',
    vText: 'কন্ঠ: রকিব হাসান তুষার',
    time: '১:৪১ মিনিট',
  },
  {
    id: 7,
    image: '/audioBook/audio-slider/audio-slider-img-1.png',
    title: 'তিন গোয়েন্দা',
    kText: 'লেখক : রকিব হাসান',
    vText: 'কন্ঠ: রকিব হাসান তুষার',
    time: '১:৪১ মিনিট',
  },
]

const AudioRecentSlider = ({recentSliderData}) => {

  console.log('audio slider data --',recentSliderData)

  const router = useRouter();

  var settings = {
    dots: false,
    arrows:false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1299,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  };

  function sliderClickHandler(audioId){
    router.push(`/audiobook/${audioId}`)
  }

  return (
    <Slider {...settings} className='hmRecentSlider'>
      {recentSliderData?.map((item, index) =>
        <div key={index} className='hm__audio__recent__slide__item'>
          <div className='hm__audio__recent__slide__item__innr' onClick={()=>sliderClickHandler(item._id)}>
            <div className='hm__audio__recent__slide__item__img'>
              <img src={`${apiBasePath}/${item?.image?.slice(item?.image?.indexOf('/') + 1)}`} alt='Slider Img' />
            </div>
            <div className='hm__audio__recent__slide__dsc'>
              <h5>{item?.title}</h5>
              <p>{item?.writer}</p>
              <ul className='clearfix reset-list'>
                <li>{item?.voice}</li>
                <li><i class="ri-time-line"></i> {item?.duration}</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Slider>
  );
};

export default AudioRecentSlider;