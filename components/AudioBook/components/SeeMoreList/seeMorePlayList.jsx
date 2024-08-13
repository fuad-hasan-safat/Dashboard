import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import AudioPlayListSingleItem from '../audioDetails/audioList/AudioPlayListSilgleItem';

export default function SeeMoreListPlayList({ audioPlaylist, playListScope }) {

    const [displayCount, setDisplayCount] = useState(6);
    const [loading, setLoading] = useState(false);
    const [inViewRef, inView] = useInView({
        triggerOnce: true,
        rootMargin: '0px 0px 200px 0px',
    });

    useEffect(() => {
        if (inView && !loading) {
            setLoading(true);
            setTimeout(() => {
                setDisplayCount((prevCount) => Math.min(prevCount + 3, audioPlaylist.length));
                setLoading(false);
            }, 1500);
        }
    }, [inView, loading]);

    return (
        <div>
            {audioPlaylist.slice(0, displayCount).map((songInfo, index) => {
                return (
                    <div key={index} className='audio__tab__wrap'>
                        <AudioPlayListSingleItem songInfo={songInfo} audioIndex={index} audioList={audioPlaylist} playListScope={playListScope} />
                    </div>
                )
            }
            )}
            {loading && <p></p>}
            <div ref={inViewRef} />
        </div>
    );
};

