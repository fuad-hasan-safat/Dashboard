import React, { useState } from 'react'
import CreateRating from './CreateRating'

export default function Rating({singleAudioData}) {
    const [userComments, setUserComments] = useState(singleAudioData.rating);
    console.log(userComments)
    
    return (
        <div className='audio__tab__content_wrap'>
            <div className='audio__tab__caption'>
                <h5>শ্রোতাদের মন্তব্য</h5>
                <hr></hr>
            </div>
            <CreateRating setUserComments={setUserComments} singleAudioData={singleAudioData} />

            <div className='audio__tab__details my-[40px]'>
                {userComments?.map((comment, index)=>{
                    return(
                        <div key={index}>
                            <p>{comment?.name}: {comment?.comment}</p>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}
