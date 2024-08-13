import React, { Fragment } from 'react'
import AudioTabSingleItem from './audioList/AudioTabSilgleItem';

import { singleAudioData } from '../sampleData/singleAudioDetailsPage';


export default function AudioTabComponent({audioData}) {
  // const audioData = singleAudioData.audio;
  console.log({audioData})
  return (
    <div className='w-full'>
      {audioData?.map((songInfo, index)=>{
         const length = audioData?.length;
      
         return(
             <div key={index} className='audio__tab__wrap'>
                 <AudioTabSingleItem songInfo={songInfo} audioIndex = {index} audioList={audioData} />
             </div>
 
         )
      })}
    </div>
  )
}
