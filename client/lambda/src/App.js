import React, {useState, useEffect} from 'react'
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
};

function App(){
  const [playState, setPlayState] = useState(0);
  const [playPos, setPlayPos] = useState(0);
  const [track, setTrack] = useState(null); // current track id
  const [playlist, setPlaylist] = useState(null); // current playlist object -> {tracks: [...]}
  const [moodBoards, setMoodBoards] = useState({}); // mapping of mood id to object -> {id: .., playlist: {...}}
  const [currMood, setCurrMood] = useState(null); // id of current mood
  const [pictures, setPictures] = useState(null); // mapping of image id to url
  const [selectedPics, setSelectedPictures] = useState([]); // array of ids
  const [loadingPictures, setLoadingPictures] = useState(false);

  function togglePlay () {
    setPlayState(playState ? 0 : 1)
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
      m.pics = curMood.pics ? [...currMood.pics, ...selectedPics] : selectedPics
      setMoodBoards({...moodBoards, [m.id]: m})
      let genres = {
        'Jazz': 0.3, 'Edm': 0.4, 'Hip-Hop': 0.2, 'Country': 0.1
      }
      let counts = Object.keys(genres).reduce((acc, cur) => counts[acc] = Math.floor(total * genres[acc]), {});
      console.log(counts)
    }
  }
  function createMood() {
    const uid = generateUUID();
    setMoodBoards({...moodBoards, [uid]: {id: uid, order: Object.keys(moodBoards).length + 1}})
    setCurrMood(uid)
  }
  const player = {togglePlay, setPlayPos: setPlayPos_, setTrack, track}
  const picSelector = {loadPictures, selectPictures, findGenre, pictures, selected: selectedPics}
  const mooder = {setMoodBoards, moodBoards, createMood, setCurrMood}
  return (
    <Root>
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
