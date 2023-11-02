import React from 'react'
import Login from './components/login/login'
import Chat from './components/chat/Chat'

export class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Login />
      </div>
    )
  }
}

export default App