'use client'

import React, { useContext, useEffect, useState } from 'react';
import TechnicalDetails from './technicalDetails';
import Summary from './Summary';
import CommentsOfWriter from './CommentsOfWriter';
import Rating from './Rating';
import AudioTabComponent from './AudioTabComponent';
import AudioPlayer from '../../AudioPlayer/AudioPlayer';
import { singleAudioData } from '../sampleData/singleAudioDetailsPage';
import { AudioDetailsTabContext } from '../../../store/audiodetailstab-context';

const AudioTabs = ({singleAudioData}) => {

  // const [ToggleState, setToggleState] = useState(1);
  const {audioTabToggleState, setAudioTabToggleState} = useContext(AudioDetailsTabContext);
  
  const toggleTab = (index) => {
    setAudioTabToggleState(index);

  };

  const getActiveClass = (index, className) =>
    audioTabToggleState === index ? className : "";


  return (
    <>

      <div className="audio__tabs__wrap">
        <ul className="tab-list">
          <li
            className={`tabs ${getActiveClass(1, "active-tabs")}`}
            onClick={() => {toggleTab(1);}}
          >
            অডিও
          </li>
          <li
            className={`tabs ${getActiveClass(2, "active-tabs")}`}
            onClick={() => toggleTab(2)}
          >
            সারসংক্ষেপ
          </li>
          <li
            className={`tabs ${getActiveClass(3, "active-tabs")}`}
            onClick={() => toggleTab(3)}>
            কলাকুশলী
          </li>
          <li
            className={`tabs ${getActiveClass(4, "active-tabs")}`}
            onClick={() => toggleTab(4)}>
            লেখকের বক্তব্য
          </li>
          <li
            className={`tabs ${getActiveClass(5, "active-tabs")}`}
            onClick={() => toggleTab(5)}>
            রেটিং
          </li>
        </ul>
        <div className="audio__tab__content">

          <div className={`content ${getActiveClass(audioTabToggleState, "active-content")}`}>
            {audioTabToggleState === 1 && <AudioTabComponent audioData={singleAudioData.audio}/>}
            {audioTabToggleState === 2 && <Summary summary={singleAudioData?.summary} />}
            {audioTabToggleState === 3 && <TechnicalDetails technicalDetails={singleAudioData?.technical_team} />}
            {audioTabToggleState === 4 && <CommentsOfWriter commentsOfWriter={singleAudioData?.comment_of_writer} />}
            {audioTabToggleState === 5 && <Rating singleAudioData={singleAudioData} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioTabs;