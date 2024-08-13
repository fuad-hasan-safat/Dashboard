'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AudioPlayListContext } from '../../../../store/audioPlayer-context';
import { apiBasePath } from '../../../../../utils/constant';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AudioTabSingleItem({ songInfo, audioIndex, audioList }) {
    const { playList, setPlaylist, audioPlace, playListRenderScope, currentPlayingIndex, setCurrentAudioIndex, toggleAudioPlay, isAudioPlaying, setMyPlayList, myPlayList, setLatestPlaylist, latestPlayList } = useContext(AudioPlayListContext)
    const [duration, setDuration] = useState(null);
    const [error, setError] = useState(false);
    const audioRef = useRef(null);

    let notification = '';

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


    }, [songInfo?.audio]);

    async function handleAddMyPlaylist() {
        console.log({ songInfo })
        const data = {
            ebook_id: songInfo.ebook_id,
            audio_id: songInfo._id,
            userId: localStorage.getItem('uuid')
        }

        try {
            const response = await axios.post(`${apiBasePath}/addtoplaylist`, data);
            console.log('add playlist response', response);
            if (response.data.status === "failed") {
                if (response.data.msg === 'Audio Already in playlist') {
                    notification = `${songInfo.title} ইতিমধ্যে প্লেলিস্টে যুক্ত আছে!`;
                } else {
                    notification = `${songInfo.title} প্লেলিস্টে যুক্ত করা যাচ্ছে না!`;
                }
                notify();
                return;
            }
            setMyPlayList([...myPlayList, songInfo])
            notification = `${songInfo.title} প্লেলিস্টে যুক্ত হয়েছে!`;
            notify1();
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    async function handlePlayButton() {
        toggleAudioPlay(audioIndex, audioList, 'details');

        const data = {
            ebook_id: songInfo.ebook_id,
            audio_id: songInfo._id,
            userId: localStorage.getItem('uuid')
        }

        try {
            const response = await axios.post(`${apiBasePath}/addtolatestplaylist`, data);
            console.log('add playlist response', response);
            if (response.data.status === "failed") {
                return;
            }
            setLatestPlaylist([...latestPlayList, songInfo])
        } catch (error) {
            console.error('Error posting data:', error);
        }

    }



    const notify1 = () => toast.success(notification, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,

    });

    const notify = () => toast.warn(notification, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,

    });

    return (
        <>
            <ToastContainer />

            <div className='audio__tab__item'>
                <div className='audio__tab__left relative'>
                    <div>
                        <img src={`${apiBasePath}/${songInfo.image.slice(songInfo.image.indexOf('/') + 1)}`} className='absolute lg:w-[78px] md:w-[70px] sm:w-[65px] xs:w-[50px] lg:h-[78px] md:h-[70px] sm:h-[65px] xs:h-[50px] rounded-full' />
                    </div>
                    <div className='audio__tab__info'>
                        <h6 className=''>
                            {songInfo.title}
                        </h6>
                        <audio ref={audioRef}>
                            <source src={`${apiBasePath}/${songInfo?.audio.slice(songInfo?.audio.indexOf('/') + 1)}`} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                        {audioRef.current?.duration && <p> <i class="ri-time-line"></i> {(duration / 60).toFixed(2)} মিনিট</p>}

                    </div>

                </div>

                <div className='audio__tab__playbutton'>
                    <button onClick={handlePlayButton}>{isAudioPlaying && audioIndex === currentPlayingIndex && audioPlace === 'details' ? <i class="ri-pause-circle-fill"></i> : <i class="ri-play-circle-fill"></i>}</button>
                    <button onClick={handleAddMyPlaylist} className='text-[#484848] text-opacity-[50%] lg:ml-[18px] md:ml-[15px] sm:ml-[12px] xs:ml-[10px]'><i class="ri-add-circle-fill"></i></button>
                </div>

            </div>

        </>

    )
}
