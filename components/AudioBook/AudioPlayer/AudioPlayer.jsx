'use client'

import React, { useState, useRef, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import {
  MdPlayArrow,
  MdPause,
  MdSkipNext,
  MdSkipPrevious,
  MdShuffle,
  MdRepeat
} from "react-icons/md";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useRouter } from "next/navigation";
import { AudioPlayListContext } from "../../store/audioPlayer-context";
import { apiBasePath } from "../../../utils/constant";

export default function AudioPlayer() {

  const { playList, isShuffle, isRepeat, toggleReapet, toggleShuffle, currentPlayingIndex, audioPlace, nextSongPlay, prevSongPlay, toggleAudioPlay, isAudioPlaying, resetAudioPlayer } = useContext(AudioPlayListContext)



  const songs = playList;
  const audioPlayer = useRef(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(currentPlayingIndex);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMute, setIsMute] = useState(false);




  var currentSong = songs[currentPlayingIndex];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);



  useEffect(() => {
    currentSong = songs[currentPlayingIndex];
  })

  useEffect(() => {
    setDuration(audioPlayer?.current?.duration);

  }, [currentSong]);

  useEffect(() => {

    if (isAudioPlaying) {

      audioPlayer.current?.play();

    } else {

      audioPlayer.current?.pause();

    }

  }, [isAudioPlaying, currentSong]);


  const handleTimeUpdate = () => {
    setCurrentTime(audioPlayer.current?.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioPlayer.current?.duration);
  };

  const handleEnded = () => {
    if (isRepeat) {
      audioPlayer.current?.play();
    } else {
      nextSongPlay();
     
    }
  };


  const handleProgressClick = (e) => {

    const rect = e.target.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (x / width) * duration;

    audioPlayer.current.currentTime = newTime;

    setCurrentTime(newTime);

  };

  const handleVolumeClick = (e) => {

    if (!isMute) {
      const rect = e.target.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const width = rect.width;
      const newVolume = x / width;

      audioPlayer.current.volume = newVolume;

      setVolume(newVolume);

    }

  };


  if (!mounted) return null;

  if (songs.length <= 0) return null;

  return createPortal((
    <>
      <div className="audio-player-wrap fixed text-black  backdrop-blur-lg  text-center bottom-[0] bg-yellow-500/30  w-full z-[999999]">
        <div className="container">
          <div className="audio__player__innr">
            <div className="items-center content-center justify-center z-[200] w-[300px]">
              <div className="lg:flex lg:flex-row lg:w-[380px] justify-left items-center md:hidden sm:hidden xs:hidden">
                <div className="">
                  <img
                    src={`${apiBasePath}/${currentSong?.image?.slice(currentSong?.image.indexOf('/') + 1)}`}
                    alt={currentSong?.title}
                    width={70}
                    height={70}
                    className="h-[70px] w-[70px] rounded-full"
                  ></img>
                </div>
                <div className="lg:flex lg:flex-col text-gray-600 pt-[5px] pl-[10px]">
                  <div className="pb-[5px] ">
                    <div className="text-xl font-bold text-left">{currentSong?.title.slice(0,30)}</div>
                  </div>
                  <div>
                    <div className="text-left">{currentSong?.writer}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col text-center items-center content-center justify-center space-y-3  lg:w-full">
              <div>
                <audio
                  src={`${apiBasePath}/${currentSong?.audio.slice(currentSong.audio.indexOf('/') + 1)}`}
                  ref={audioPlayer}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={handleEnded}
                />
                <div className="flex flex-row  space-x-6">
                  <button onClick={toggleShuffle} className={isShuffle ? "active" : "text-gray-400"}>
                    <MdShuffle />
                  </button>
                  <button onClick={prevSongPlay}>
                    <MdSkipPrevious />
                  </button>
                  <button className="text-4xl" onClick={() => toggleAudioPlay(currentPlayingIndex, playList, audioPlace)}>
                    {isAudioPlaying ?
                      //  <MdPause /> 
                      <>
                        <img
                          src="/images/icons/ic_pause.svg"
                        ></img>
                      </>
                      :
                      <MdPlayArrow
                      />}
                  </button>
                  <button onClick={nextSongPlay}>
                    <MdSkipNext />
                  </button>
                  <button onClick={toggleReapet} className={isRepeat ? "active" : "text-gray-400"}>
                    <MdRepeat />
                  </button>
                </div>
              </div>
              <div className="audio-sound-line flex items-center flex-row text-center place-content-center justify-center lg:space-x-5 md:space-x-5 sm:space-x-3 xs:space-x-3 lg:pb-[15px] md:pb-[15px] sm:pb-[10px] xs:pb-[10px]">
                <span className="text-xs">{formatTime(currentTime)}</span>
                <ProgressBar
                  now={(currentTime / duration) * 100}
                  style={{ width: "300px", height: "6px", backgroundColor: 'white', borderRadius: '5px', cursor: 'pointer' }}
                  onClick={handleProgressClick}
                />
                <span className="text-xs">{formatTime(duration)}</span>
              </div>
            </div>
            <div className="w-full text-center lg:pl-[20px] md:pl-[20px] sm:pl-[0] xs:pl-[0] items-center content-center justify-center">
              {/* left part */}
              <div className="flex lg:justify-left md:justify-left sm:justify-center xs:justify-center items-center flex-row  space-x-5 ">
                {/* fav icon */}
                {/* <button className="">
                  <img src="/images/icons/ic_fav.svg"></img>
                </button>
                <button className="">
                  <img src="/images/icons/audioControl.svg"></img>
                </button> */}
                
                {/* volume icon */}
                {!isMute && <img className="cursor-pointer" onClick={() => { setIsMute(true); audioPlayer.current.volume = 0; }} width={30} height={30} src="/images/icons/ic_volumeon.svg"></img>}
                {isMute && <img className="cursor-pointer" onClick={() => { setIsMute(false); audioPlayer.current.volume = volume }} width={30} height={30} src="/images/icons/ic_volumeoff.svg"></img>}
                {/* volume bar */}
                <div className="text-center items-center content-center justify-center ">
                  <ProgressBar
                    // variant="customBarColor"
                    now={volume * 100}
                    style={{ width: "100px", height: "6px", backgroundColor: 'white', borderRadius: '5px', cursor: 'pointer' }}
                    onClick={handleVolumeClick}
                  />
                </div>
                {/*   notes */}
                <button>
                  <img src="/images/icons/ic_songlist.svg"></img>
                </button>
              </div>
            </div>
          </div>
        </div>
        <button onClick={resetAudioPlayer} className="absolute top-0 right-3 text-[28px] hover:text-[#F9A106]"><i class="ri-close-fill"></i></button>
      </div>
    </>
  ), document.getElementById('audio-root'));
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}