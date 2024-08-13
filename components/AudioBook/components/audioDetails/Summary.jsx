import React from 'react'

export default function Summary({summary}) {
  return (
    <div className='audio__tab__content_wrap'>
    <div className='audio__tab__caption'>
        <h5>সারসংক্ষেপ</h5>
        <hr></hr>
    </div>

    <div className='audio__tab__details mb-[30px]' dangerouslySetInnerHTML={{__html:summary}}>
     
    </div>


</div>
  )
}
