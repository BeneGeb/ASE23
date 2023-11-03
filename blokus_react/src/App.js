import React from 'react'

import Chat from './components/chat/Chat'
import GamePage from './components/gamepage/gamepage'


export class App extends React.Component {
  render() {
    return (
      <div className="App" style={{ width: '100%', height: '100vh' }}>
        <GamePage  />
      </div>
    )
  }
}

export default App