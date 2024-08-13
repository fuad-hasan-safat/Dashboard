import React, { useContext } from 'react'
import Sidebar from '../../../sidebar/Sidebar'
import AudioCategory from './audioCategory/AudioCategory'
import AudioSlider from '../audioSlider/AudioSlider'
import AudioPlaylistContextProvider from '../../../store/audioPlayer-context'

export default function AudioHomePage() {
  return (
      <section className='hm__audio__section'>
        <div className='container'>
          <div className='hm__audio__wrap clearfix'>
            <div className='hm__audio__left'>
              <AudioCategory />
              <AudioSlider />

            </div>
            <div className='hm__audio__right'>
              <Sidebar />

            </div>
          </div>
        </div>
      </section>
  )
}
