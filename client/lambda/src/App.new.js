import React from 'react'
import { Root, Routes, addPrefetchExcludes } from 'react-static'
//
import { Link, Router } from 'components/Router'
import Dynamic from 'containers/Dynamic'
import Contexts from './contexts'
import './app.css'

const { PlayerContext } = Contexts;

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic'])

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      playState: 0,
      playPos: 0
    }
    this.player = {togglePlay: this.togglePlay, setPlayPos: this.setPlayPos}
  }
  componentDidMount () {}

  togglePlay = () => {
    this.setState({playState: this.state.playState ? 0 : 1})
  }

  setPlayPos = (p) => {
    this.setState({playPos: Math.max(Math.min(Number(p), 100), 0)})
  }

  render () {
    return (
      <Root>
        <PlayerContext.Provider value={this.player}>
          <div className="content">
            <React.Suspense fallback={<div><em className="loading">Loading...</em></div>}>
              <Router>
                <Routes path="*" />
              </Router>
            </React.Suspense>
          </div>
          </PlayerContext.Provider>
      </Root>
    )
  }
}
export default App
