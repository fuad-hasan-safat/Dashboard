'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AudioPlayListContext } from '../../../../store/audioPlayer-context';
import { apiBasePath } from '../../../../../utils/constant';

export default function AudioPlayListSingleItem({ songInfo, audioIndex, audioList }) {
    const { playList, setPlaylist, audioPlace, playListRenderScope, currentPlayingIndex, setCurrentAudioIndex, toggleAudioPlay, isAudioPlaying } = useContext(AudioPlayListContext)
    const [duration, setDuration] = useState(null);
    const [error, setError] = useState(false);
    const audioRef = useRef(null);

    console.log({ audioPlace, playListRenderScope, currentPlayingIndex })

    useEffect(() => {
        const audioElement = audioRef.current;

        const handleLoadedMetadata = () => {
            setDuration(audioElement.duration);
        };

        const handleError = () => {
            setError(true);
        };

        if (audioElement) {
            audioElement.volume = 0.5;
            audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
            audioElement.addEventListener('error', handleError);
        }

        handleLoadedMetadata();

        return () => {
            if (audioElement) {
                audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audioElement.removeEventListener('error', handleError);
            }
        };


    }, []);



    return (
        <div className='audio__tab__item'>
            <div className='audio__tab__left'>
                <div>
                    <img src={`${apiBasePath}/${songInfo.image.slice(songInfo.image.indexOf('/') + 1)}`} className='lg:w-[78px] md:w-[70px] sm:w-[65px] xs:w-[50px] lg:h-[78px] md:h-[70px] sm:h-[65px] xs:h-[50px] rounded-full' />
                </div>
                <div className='audio__tab__info'>
                    <h6 className='pr-[35px]'>
                        {songInfo.title.substring(0, 52) + (songInfo?.title.length >= 52 ? '...' : '')}
                    </h6>
                    <audio ref={audioRef}>
                        <source src={`${apiBasePath}/${songInfo?.audio.slice(songInfo.audio.indexOf('/') + 1 )}`} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    {audioRef.current?.duration && <p> <i class="ri-time-line"></i> {(duration / 60).toFixed(2)} মিনিট</p>}

                </div>

            </div>

            <div className='audio__tab__playbutton'>
                <button onClick={() => { toggleAudioPlay(audioIndex, audioList, playListRenderScope) }}>{isAudioPlaying && audioIndex === currentPlayingIndex && audioPlace === playListRenderScope ? <i class="ri-pause-circle-fill"></i> : <i class="ri-play-circle-fill"></i>}</button>
                {/* <button className='text-[#484848] text-opacity-[50%] lg:ml-[18px] md:ml-[15px] sm:ml-[12px] xs:ml-[10px]'><i class="ri-add-circle-fill"></i></button> */}
            </div>

        </div>
    )
}
