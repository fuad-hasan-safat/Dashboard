import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { apiBasePath } from '../../../../utils/constant';

export default function SeeMoreListGrid({audioData}) {
    console.log(audioData)
    const router = useRouter()
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
                setDisplayCount((prevCount) => Math.min(prevCount + 3, audioData?.length));
                setLoading(false);
            }, 1500);
        }
    }, [inView, loading]);

    function sliderClickHandler(audioId) {
        router.push(`/audiobook/${audioId}`)
    }


    return (
        <div>
            {audioData?.slice(0, displayCount).map((item, index) => (
                <div key={index} className='hm__audio__recent__slide__item'>
                    <div className='hm__audio__recent__slide__item__innr' onClick={() => sliderClickHandler(item?._id)}>
                        <div className='hm__audio__recent__slide__item__img'>
                            <img src={`${apiBasePath}/${item.image.slice(item.image.indexOf('/') + 1)}`} alt='Slider Img' />
                        </div>
                        <div className='hm__audio__recent__slide__dsc'>
                            <h5>{item.title}</h5>
                            <p>{item.writer}</p>
                            <ul className='clearfix reset-list'>
                                <li>{item.voice}</li>
                                <li><i className="ri-time-line"></i> {item.duration}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
            {loading && <p></p>}
            <div ref={inViewRef} />
        </div>
    );
};

