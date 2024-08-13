import { createContext, useState } from "react";

export const AudioPlayListContext = createContext({
  playList: [],
  myPlayList: [],
  latestPlayList: [],
  isPlayListAddedChanged: 0,
  setMyPlayList: () => { },
  setLatestPlaylist: () => { },
  setPlayListAddedChanged: () => { },
  audioPlace: '',
  playListRenderScope: '',
  isAudioPlaying: false,
  isAudiobarVisible: false,
  isShuffle: false,
  isRepeat: false,
  currentPlayingIndex: 0,
  isAudioPlayerClosed: 1,
  setCurrentAudioIndex: () => { },
  setPlayListScope: () => { },
  setPlayListRenderScope: () => { },
  setPlaylist: () => { },
  nextSongPlay: () => { },
  prevSongPlay: () => { },
  toggleAudioPlay: () => { },
  toggleShuffle: () => { },
  toggleReapet: () => { },
  resetAudioPlayer: () => { }
});

export default function AudioPlaylistContextProvider({ children }) {
  const [audioBar, setAudioBar] = useState({
    playList: [],
    myplayList: [],
    latestPlayList: [],
    isPlayListAddedChanged: 0,
    isAudioPlayerClosed: 1,
    audioPlace: 'none',
    playListRenderScope: 'none',
    isShuffle: false,
    isRepeat: false,
    isAudiobarVisible: false,
  });
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false);

  function setCurrentPlaylist(playlist, currentIndex = 0) {
    console.log('Playlist in context function', playlist, currentIndex);
    setAudioBar((prevAudioBar) => ({
      ...prevAudioBar,
      playList: playlist,
    }));

    setCurrentAudioIndex(currentIndex)
  }

  function setcurrentPlaylistScope(scope = 'none') {
    localStorage.setItem("playlistScope", scope);

    setAudioBar((prevAudioBar) => ({
      ...prevAudioBar,
      audioPlace: scope
    }))
  }

  function setCurrentPlaylistRenderScope(scope) {
    localStorage.setItem("playListRenderScope", scope);


    setAudioBar((prevAudioBar) => ({
      ...prevAudioBar,
      playListRenderScope: scope,
    }))

  }

  function setCurrentAudioIndex(index) {
    setCurrentPlayingIndex(index)
  }

  const playNextSong = () => {
    console.log('shuffle ', audioBar.isShuffle)
    if (isPlaying && audioBar.playList.length <= 1) {
      setIsPlaying(false)
    }

    setCurrentPlayingIndex((prevIndex) =>
      audioBar.isShuffle
        ? Math.floor(Math.random() * audioBar.playList.length)
        : prevIndex === audioBar.playList.length - 1
          ? 0
          : prevIndex + 1
    );



  };

  const playPreviousSong = () => {
    console.log('shuffle ', audioBar.isShuffle)

    setCurrentPlayingIndex((prevIndex) =>
      audioBar.isShuffle
        ? Math.floor(Math.random() * audioBar.playList.length)
        : prevIndex === 0
          ? audioBar.playList.length - 1
          : prevIndex - 1
    );

  };


  const handleNextSong = () => {
    if (isPlaying) {
      playNextSong();
    } else {
      setCurrentPlayingIndex((prevIndex) =>
        prevIndex === audioBar.playList.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePreviousSong = () => {
    if (isPlaying) {
      playPreviousSong();
    } else {
      setCurrentPlayingIndex((prevIndex) =>
        prevIndex === 0 ? audioBar.playList.length - 1 : prevIndex - 1
      );
    }
  };

  function togglePlay(songIndex, songList, audioScope = 'none') {
    console.log({ songIndex, songList })
    const prevScope = audioBar.audioPlace;
    const prevIndex = currentPlayingIndex;

    if (isPlaying) {

      if (prevIndex !== songIndex || prevScope !== audioScope) {
        localStorage.setItem("playlistScope", audioScope);
        setCurrentAudioIndex(songIndex)

        //  audioScope: 'details'(details page), 'latestPlayList', 'myPlayList'
        setAudioBar((prevAudioBar) => ({ ...prevAudioBar, playList: songList, audioPlace: audioScope }))

        return;
      }

    }

    localStorage.setItem("playlistScope", audioScope);
    setCurrentAudioIndex(songIndex)

    //  audioScope: 'details'(details page), 'latestPlayList', 'myPlayList'
    setAudioBar((prevAudioBar) => ({ ...prevAudioBar, playList: songList, audioPlace: audioScope }))
    setIsPlaying(!isPlaying);


  };

  function toggleShuffleState() {
    setAudioBar((prevAudioBar) => {
      console.log('Previous audio shuffle -', prevAudioBar.isShuffle)

      const upDateShuffle = !prevAudioBar.isShuffle;
      console.log('upDateShuffle audio shuffle -', upDateShuffle)


      return ({
        ...prevAudioBar,
        isShuffle: !prevAudioBar.isShuffle
      })
    })

  }

  function toggleReapetState() {
    setAudioBar((prevAudioBar) => {
      console.log('Previous audio reaper -', prevAudioBar.isRepeat)
      return ({
        ...prevAudioBar,
        isRepeat: !prevAudioBar.isRepeat
      })
    })

  }

  function resetPlayer() {
    setAudioBar({
      playList: [],
      audioPlace: 'none',
      playListRenderScope: 'none',
      isShuffle: false,
      isRepeat: false,
      isAudioPlayerClosed: 0,
      isAudiobarVisible: false,
    })

    setCurrentPlayingIndex(-1)
  }

  function updateMyplayList(playlist) {
    setAudioBar((prevAudioBar) => ({
      ...prevAudioBar,
      myplayList: playlist
    }))
  }

  function updateLatestPlayList(playlist) {
    setAudioBar((prevAudioBar) => ({
      ...prevAudioBar,
      latestPlayList: playlist
    }))
  }

  function updatePlayListChanged(){
    setAudioBar((prevAudioBar)=>({
      ...prevAudioBar,
      isPlayListAddedChanged: prevAudioBar.isPlayListAddedChanged + 1,
    }))
  }

  const cntxValue = {
    playList: audioBar.playList,
    myPlayList: audioBar.myplayList,
    latestPlayList: audioBar.latestPlayList,
    isPlayListAddedChanged: audioBar.isPlayListAddedChanged,
    setPlayListAddedChanged: updatePlayListChanged,
    setMyPlayList: updateMyplayList,
    setLatestPlaylist: updateLatestPlayList,
    audioPlace: audioBar.audioPlace,
    playListRenderScope: audioBar.playListRenderScope,
    isAudioPlaying: isPlaying,
    isShuffle: audioBar.isShuffle,
    isRepeat: audioBar.isRepeat,
    currentPlayingIndex: currentPlayingIndex,
    isAudiobarVisible: audioBar.isAudiobarVisible,
    isAudioPlayerClosed: audioBar.isAudioPlayerClosed,
    setPlaylist: setCurrentPlaylist,
    setPlayListScope: setcurrentPlaylistScope,
    setPlayListRenderScope: setCurrentPlaylistRenderScope,
    setCurrentAudioIndex: setCurrentAudioIndex,
    nextSongPlay: handleNextSong,
    prevSongPlay: handlePreviousSong,
    toggleAudioPlay: togglePlay,
    toggleShuffle: toggleShuffleState,
    toggleReapet: toggleReapetState,
    resetAudioPlayer: resetPlayer
  };

  return (
    <AudioPlayListContext.Provider value={cntxValue}>
      {children}
    </AudioPlayListContext.Provider>
  );
}
