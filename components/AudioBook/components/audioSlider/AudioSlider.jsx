'use client'
import React, { Fragment, useContext, useEffect, useState } from 'react';
import WithoutBgSlider from './withoutBackGroundSlider/WithoutBgSlider'
import BackGroundSlider from './BackgroundSlider/BackGroundSlider'
import Link from 'next/link';
import { SeeAllSliderContext } from '../../../store/seeall-slider-context';
import axios from 'axios';
import { apiBasePath } from '../../../../utils/constant';


export default function AudioSlider() {
  const { setSliderInfo } = useContext(SeeAllSliderContext)

  const [homeSlider, setHomeSlider] = useState({
    audioSlider: [],
    isLoaded: false
  })

  useEffect(() => {
    getSliders();

  }, [])

  async function getSliders() {
    try {
      const url = `${apiBasePath}/bookslider`;
      const response = await axios.get(url);
      const homeSliders = response.data;

      setHomeSlider((prevSlider) => ({
        ...prevSlider,
        audioSlider: homeSliders,
        isLoaded: true
      }))

    } catch (error) {
      console.log({ error })
    }

  }

  if (!homeSlider.isLoaded || homeSlider.audioSlider.length <= 0) return null;

  return (
    <>
      {homeSlider.audioSlider.map((sliderData, index) => {
        console.log(sliderData)
        return (

          <Fragment key={index}>
            {sliderData.sliderData.length ?
              <>
                <div className='hm__audio__see__more'>
                  <h3>{sliderData.category}</h3>
                  <Link className='hm__audio__common__btn' href='/audiobook/seemorelist' onClick={() => setSliderInfo(sliderData.background, sliderData.category)}>সব দেখুন</Link>
                </div>
                {sliderData.background === 'no_background' && <WithoutBgSlider sliderData={sliderData.sliderData} />}
                {sliderData.background === 'background' && <BackGroundSlider sliderData={sliderData.sliderData} />}
              </> :
              <>
              <div></div>
              </>
            }
          </Fragment>
        )
      })}
    </>
  )
}
