import React from 'react'

import PlaylistItem from './PlaylistItem'

export default function PlayList({ audioPlaylist, audioScope }) {
  console.log('My play list',audioPlaylist)
  return (
    <>
      {audioPlaylist.map((songInfo, index) => {
        const length = audioPlaylist?.length;

        return (
          <div key={index} className='audio__playlist__wrap'>
            <PlaylistItem songInfo={songInfo} songIndex={index} songList={audioPlaylist} audioScope = {audioScope} />
            {index + 1 < length && <div className='audio__playlist__devider'>
              <hr></hr>
            </div>}
          </div>

        )
      })}
    </>
  )
}
