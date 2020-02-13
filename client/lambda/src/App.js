import React, {useState, useEffect, useRef} from 'react'
import { Root, Routes, addPrefetchExcludes } from 'react-static'
//
import { Link, Router } from 'components/Router'
import Dynamic from 'containers/Dynamic'
import Contexts from './contexts'
import api from './api'

import './app.css'

const { PlayerContext, PicturesContext, MoodContext } = Contexts;

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic'])

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function App(){
  const [playState, setPlayState] = useState(0);
  const [playPos, setPlayPos] = useState(0);
  const [track, setTrack] = useState(-1); // current track id
  const [playlist, setPlaylist] = useState(null); // current playlist object -> {tracks: [...]}
  const [moodBoards, setMoodBoards] = useState({}); // mapping of mood id to object -> {id: .., playlist: {...}}
  const [currMood, setCurrMood] = useState(null); // id of current mood
  const [pictures, setPictures] = useState(null); // mapping of image id to url
  const [selectedPics, setSelectedPictures] = useState([]); // array of ids
  const [loadingPictures, setLoadingPictures] = useState(false);

  useEffect(() => {console.log('Playlist changed !', playlist); setPlayState(playlist ? 1 : 0)}, [playlist]);
  useEffect(() => {console.log('New play state', playState)}, [playState]);
  const audio = useRef();
  useEffect(()=>{
  if (audio && audio.current){
    let l = (e) => {setTrack((track + 1) % playlist.length); setPlayState(1)};
    audio.current.addEventListener('ended', l);
    return () => {audio.current && audio.current.removeEventListener('ended', l)}
  }
})

 /* useEffect(() => {setTrack((track + 1) % playlist.length); setPlayState(1)});*/

  function togglePlay () {
    setPlayState(playState === 1 ? 0 : 1)
  }
  function setPlayPos_ (p) {
    setPlayPos(Math.max(Math.min(Number(p), 100), 0))
  }
  async function loadPictures() {
    const pictures = await api.getPictures()
    setPictures(pictures['image_ids'])
  }
  function selectPictures(pics) {
    // add to selection
    setSelectedPictures(pics)
  }
  function findGenre() {
    // call to cloud function with selected pics
    if (currMood) {
      let m = {...currMood}
      m.pics = currMood.pics ? [...currMood.pics, ...selectedPics] : selectedPics
      setMoodBoards({...moodBoards, [m.id]: m})
      api.getGenres(m.pics).then(genres => {
        let total = 10
        let counts = Object.keys(genres).reduce((acc, cur) => {acc[cur] = Math.floor(total * genres[cur]); return acc}, {});
        console.log(counts)
        Object.keys(counts).map((k, i) => {
          if (counts[k] > 0) {
            api.getTracks(k, counts[k]).then(tracks => {
              console.log('Tracks IN in', tracks);
              let items = i === 0 ? tracks.tracks.items : tracks.tracks.items.concat(playlist);
              items = shuffle(items.filter(t => !!t && t.preview_url));
              setPlaylist(items);
              setTrack(0);
              setMoodBoards({...moodBoards, [currMood.id]: {...currMood, 
                playlist: items}})
            })
          }
        })
      })
      /*let genres = {
        'Jazz': 0.3, 'Edm': 0.4, 'Hip-Hop': 0.2, 'Country': 0.1
      }*/
    }
  }
  function createMood() {
    const uid = generateUUID();
    setMoodBoards({...moodBoards, [uid]: {id: uid, order: Object.keys(moodBoards).length + 1}})
    setCurrMood(uid)
  }
  const player = {togglePlay, setPlayPos: setPlayPos_, setTrack, track, playlist}
  const picSelector = {loadPictures, selectPictures, findGenre, pictures, selected: selectedPics}
  const mooder = {setMoodBoards, moodBoards, createMood, setCurrMood, current: currMood}
  return (
    <Root>
      <audio ref={audio} src={playlist && track > -1 && playlist[track].preview_url}
        autoPlay={playState} style={{position: 'absolute', top: -2000,}}
         ></audio>
      <PlayerContext.Provider value={player}>
      <PicturesContext.Provider value={picSelector}>
      <MoodContext.Provider value={mooder}>

        <div className="content">
          <React.Suspense fallback={<div><em className="loading">Loading...</em></div>}>
            <Router>
              <Routes path="*" />
            </Router>
          </React.Suspense>
        </div>
      </MoodContext.Provider>
      </PicturesContext.Provider>
      </PlayerContext.Provider>
    </Root>
    )
}
export default App
