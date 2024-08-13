import React, { useContext, useEffect, useState } from 'react';
import Login from '../../../sidebar/login-sidebar/Login';
import PlayList from '../audioPlaylist/PlayList';
import Link from 'next/link';
import { audioPlaylist } from '../sampleData/audioPlaylist';
import AudioSidebarLekhok from './AudioSidebarLekhok';
import { AudioPlayListContext } from '../../../store/audioPlayer-context';
import { fetchDataWithAxios } from '../../../../utils/apiService';
import { apiBasePath } from '../../../../utils/constant';

export default function AudioDetailsSideBar() {
    const { setPlayListRenderScope,setLatestPlaylist, setMyPlayList ,isPlayListAddedChanged, myPlayList, latestPlayList, currentPlayingIndex} = useContext(AudioPlayListContext);

    const [playList, setPlaylist] = useState({
        myPlaylist: [],
        latestPlayList: [],
        isPlayListrender: false
    })

    useEffect(() => {
        getData();
    },[isPlayListAddedChanged,currentPlayingIndex])


    const getData = async () => {
        const myPlayListUrl = `${apiBasePath}/showplaylist/${localStorage.getItem('uuid')}`;
        const latestPlayListUrl = `${apiBasePath}/showlatestplaylist/${localStorage.getItem('uuid')}`;
        try {
            const myplayList = await fetchDataWithAxios(myPlayListUrl);
            console.log('my play list', myplayList)
            setMyPlayList(myplayList.object)

            const latestPlayList = await fetchDataWithAxios(latestPlayListUrl);
            console.log('latest playlist get response', latestPlayList);
            setLatestPlaylist(latestPlayList.object)
        } catch (error) {
            console.log('playlist api call error', error)
        } finally {
            setPlaylist((prevPlaylist)=>({
                ...prevPlaylist,
                isPlayListrender: true
            }))
        }

        try {
            const latestPlayList = await fetchDataWithAxios(latestPlayListUrl);
            console.log('latest playlist get response', latestPlayList);
            setLatestPlaylist(latestPlayList.object);
        } catch (error) {
            console.log('playlist api call error', error)
        } finally {
            setPlaylist((prevPlaylist)=>({
                ...prevPlaylist,
                isPlayListrender: true
            }))
        }
    };

    // if(!playList.isPlayListrender) return null;

    return (
        <>
            <div className="flex flex-col pr-[]">

                {!localStorage.getItem('uuid') && <div className="sidebar__iteam__wrap">
                    <Login />
                </div>}
                {latestPlayList?.length > 0 && <div className='sidebar__iteam__wrap'>
                    <h2 className='audio__sidebar__heading'>সর্বশেষ প্লেলিস্ট</h2>
                    <div className='py-[10px]'>
                        <hr></hr>
                    </div>
                    <PlayList audioPlaylist={latestPlayList} audioScope={'latestPlayList'} />
                    <div className='hm__audio__see__more'>
                        <Link className='sidebar__audio__common__btn' href='/audiobook/playlist' onClick={() => setPlayListRenderScope('latestPlayList')}>সব দেখুন</Link>
                    </div>
                </div>}
                <div className='sidebar__iteam__wrap'>
                    <h2 className='audio__sidebar__heading'>লেখক</h2>
                    <div className='py-[10px]'>
                        <hr></hr>
                    </div>
                    <AudioSidebarLekhok />
                    <div className='hm__audio__see__more'>
                        <Link className='sidebar__audio__common__btn' href='/allwriter'>সব দেখুন</Link>
                    </div>
                </div>

                {myPlayList?.length > 0 && <div className='sidebar__iteam__wrap'>
                    <h2 className='audio__sidebar__heading'>আমার প্লেলিস্ট</h2>
                    <div className='py-[10px]'>
                        <hr></hr>
                    </div>
                    <PlayList audioPlaylist={myPlayList} audioScope={'myPlayList'} />
                    <div className='hm__audio__see__more'>
                        <Link className='sidebar__audio__common__btn' href='/audiobook/playlist' onClick={() => setPlayListRenderScope('myPlayList')}>সব দেখুন</Link>
                    </div>
                </div>}
            </div>
        </>
    )
}
