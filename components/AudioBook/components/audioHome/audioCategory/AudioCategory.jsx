'use client'
import React, { useEffect, useState } from 'react'
import AudioSingleCategory from './AudioSingleCategory'
import { apiBasePath } from '../../../../../utils/constant'
import axios from 'axios'

export default function AudioCategory() {
  const [categoryData, setCategoryData] = useState({
    audioCategory: [],
    isLoaded: false
  })


  useEffect(() => {
    getData()
  }, [])


  async function getData() {
    try {

      const url = `${apiBasePath}/audiocategories`;
      const response = await axios.get(url);
      const categortData = response.data;

      setCategoryData((prevCatData) => ({
        ...prevCatData,
        audioCategory: categortData,
        isLoaded: true
      }))
    } catch (error) {
      console.log({error})
    }

  }



  if (!categoryData.isLoaded || categoryData.audioCategory.length <= 0) return null;

  return (
    <>
      <div className='audio__cat_iteam clearfix'>
        {categoryData.audioCategory.map((category, index) => {
          return (

            <AudioSingleCategory
              key={index}
              title={category.title}
              image={category.image}
              color={category.color}
              background={category.background}
            />
          )
        })}

      </div>

    </>
  )
}
