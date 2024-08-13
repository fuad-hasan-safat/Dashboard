import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { apiBasePath } from '../../../../utils/constant';

export default function SeeMoreListBackground(audioData) {
    console.log(audioData.audioData)

    const router = useRouter();
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
                setDisplayCount((prevCount) => Math.min(prevCount + 3, audioData.audioData.length));
                setLoading(false);
            }, 1500);
        }
    }, [inView, loading]);

    function sliderClickHandler(audioId) {
        router.push(`/audiobook/${audioId}`)
    }

    return (
        <div>
            {audioData.audioData.slice(0, displayCount).map((iteam, index) => {

                const color = iteam?.color;
                console.log({ color, iteam })
                return (
                    <div className='backgroundSlider__single__wrap backgroundSlider__single'>
                        <div 
                        key={index} 
                        className='backgroundSlider__single__iteam' 
                        style={{ backgroundColor: `${color}` }}
                        onClick={()=>sliderClickHandler(iteam?._id)}
                        >
                            <div className='audio__bgslider__image'>
                                <img src={`${apiBasePath}/${iteam.image.slice(iteam.image.indexOf('/') + 1)}`} alt='' />
                            </div>
                            <div className='audio__bgslider__text'>
                                <h5> {iteam.title} </h5>
                                <p>লেখকঃ {iteam.writer}</p>
                                <p>কণ্ঠঃ {iteam.voice}</p>
                                <p style={{ marginBottom: '0' }}><i class="ri-time-line"></i> {iteam.duration}</p>
                            </div>
                        </div>
                    </div>
                )

            }



            )}
            {loading && <p></p>}
            <div ref={inViewRef} />
        </div>
    );
};

