import React from 'react'

export default function TechnicalDetails({ technicalDetails }) {
    return (
        <div className='audio__tab__content_wrap'>
            <div className='audio__tab__caption'>
                <h5>কলাকুশলী</h5>
                <hr></hr>
            </div>

            <div className='audio__tab__details' dangerouslySetInnerHTML={{__html:technicalDetails}}>
            </div>


        </div>
    )
}
