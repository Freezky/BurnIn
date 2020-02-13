import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import {FaStepForward, FaPause, FaPlay, FaStepBackward, FaHeart, FaRandom} from 'react-icons/fa'
import Contexts from '../contexts'

const {PlayerContext} = Contexts

import '../player.css'

/*const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))*/

export default function (props) {
	function renderPlayer (player) {
		let lPlayer = player || {}
		function onRangeClick (e) {
			// compute abs(e.target.x - e.x)
		}
		console.log(lPlayer.playlist)
		let playPos = Number(player.playPos)
		const progressStyleHtml = `
		.range:before {
			width: ${playPos}%;
		}
		.range:after {
			left: ${playPos}%;
		}
		`;
		return <div className="player__container">
		    <div className="player__body">
		      <div className="body__info">
		      	<style dangerouslySetInnerHTML={{__html: progressStyleHtml}} />
		    	<div className="range" onClick={onRangeClick}></div>

		        <div className="info__song">{lPlayer.playlist ? lPlayer.playlist[lPlayer.track] && lPlayer.playlist[lPlayer.track].name : '--'}</div>

		        <div className="info__album">{lPlayer.playlist ? lPlayer.playlist[lPlayer.track] && lPlayer.playlist[lPlayer.track].album.name : '--'}</div>
		        <span dangerouslySetInnerHTML = {{__html: ' &middot; '}} ></span>
		        <div className="info__artist">{lPlayer.playlist ? lPlayer.playlist[lPlayer.track] && lPlayer.playlist[lPlayer.track].artists[0] && lPlayer.playlist[lPlayer.track].artists[0].name : '--'}</div>
		      </div>

		      <div className="body__buttons">
		        <ul className="list list--buttons">
		          <li><IconButton onClick={() => lPlayer.setTrack((lPlayer.track + 1) % lPlayer.playlist.length)}><FaStepBackward /></IconButton></li>

		          <li><IconButton onClick={lPlayer.togglePlay}>{lPlayer.playState ? <FaPause /> : <FaPlay />}</IconButton></li>

		          <li><IconButton onClick={() => lPlayer.setTrack((lPlayer.track + 1) % lPlayer.playlist.length)}><FaStepForward /></IconButton></li>
		        </ul>
		      </div>
		    </div>
		  </div>
	}
	return (
	<div className="player__wrapper">
		<PlayerContext.Consumer>
		  {renderPlayer}
	  </PlayerContext.Consumer>
	</div>
	)
}