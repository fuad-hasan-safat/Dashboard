import React from 'react'

export default function CommentsOfWriter({commentsOfWriter}) {
    return (
        <div className='audio__tab__content_wrap'>
            <div className='audio__tab__caption'>
                <h5>লেখকের বক্তব্য</h5>
                <hr></hr>
            </div>

            <div className='audio__tab__details mb-[30px]' dangerouslySetInnerHTML={{__html:commentsOfWriter}}>

            </div>
        </div>
    )
}
