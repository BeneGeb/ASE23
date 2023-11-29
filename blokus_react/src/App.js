import React from 'react'

import Chat from './components/chat/Chat'
import GamePage from './components/gamepage/gamepage'
import Login from './components/login/login'
import LobbyPage from './components/lobby/lobby'



const items = ['Player1', 'Player2', 'Player3', 'Player4'];
const color = ["#0000FF", "#FFFF00", "#00FF00", "#FF0000"];
const playername = "Player3";
const playercolor = "#00FF00";
export class App extends React.Component {
  render() {
    return (
      <div className="App" style={{ width: '100%', height: '100vh' }}>
        <LobbyPage items={items} colors={color} playername={playername} playercolor={playercolor}/>
      </div>
    )
  }
}

export default App