import React from 'react'

import Chat from './components/chat/Chat'
import GamePage from './components/gamepage/gamepage'
import Login from './components/login/login'


export class App extends React.Component {
  render() {
    return (
      <div className="App" style={{ width: '100%', height: '100vh' }}>
        <Chat  />
      </div>
    )
  }
}

export default App