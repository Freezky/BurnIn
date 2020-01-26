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

		        <div className="info__song">{lPlayer.track ? lPlayer.track.name : '--'}</div>

		        <div className="info__album">{lPlayer.track ? lPlayer.track.album : '--'}</div>
		        <span dangerouslySetInnerHTML = {{__html: ' &middot; '}} ></span>
		        <div className="info__artist">{lPlayer.track ? lPlayer.track.artist : '--'}</div>
		      </div>

		      <div className="body__buttons">
		        <ul className="list list--buttons">
		          <li><IconButton><FaStepBackward /></IconButton></li>

		          <li><IconButton onClick={player.togglePlay}>{player.playState ? <FaPause /> : <FaPlay />}</IconButton></li>

		          <li><IconButton><FaStepForward /></IconButton></li>
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