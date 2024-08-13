'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AudioPlayListContext } from '../../../store/audioPlayer-context';
import { apiBasePath } from '../../../../utils/constant';

export default function PlaylistItem({ songInfo, songIndex, songList, audioScope }) {
    console.log('song info-----', songInfo)
    const { currentPlayingIndex, playList, audioPlace, toggleAudioPlay, isAudioPlaying } = useContext(AudioPlayListContext)

    const [duration, setDuration] = useState(null);
    const [error, setError] = useState(false);
    const audioRef = useRef(null);

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


    }, [songInfo?.audio]);


    return (
        <div className='audio__playlist__item'>
            <div className='audio__playlist__left'>
                <div>
                    <img src={`${apiBasePath}/${songInfo.image.slice(songInfo.image.indexOf('/') + 1)}`} className='w-[41px] h-[41px] rounded-full' />
                </div>
                <div className='audio__playlist__info'>
                    <h6 className=''>
                        {songInfo.title.substring(0, 40) + (songInfo?.title.length >= 52 ? '...' : '')}
                    </h6>
                    <audio ref={audioRef}>
                        <source src={`${apiBasePath}/${songInfo?.audio.slice(songInfo?.audio.indexOf('/') + 1)}`} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    {audioRef.current?.duration && <p> <i class="ri-time-line"></i> {(duration / 60).toFixed(2)} মিনিট</p>}
                </div>

            </div>

            <div className='audio__playlist__playbutton'>
                <button onClick={() => toggleAudioPlay(songIndex, songList, audioScope)}>{isAudioPlaying && songIndex === currentPlayingIndex && audioPlace === audioScope ? <i class="ri-pause-circle-fill"></i> : <i class="ri-play-circle-fill"></i>}</button>
            </div>

        </div>
    )
}
