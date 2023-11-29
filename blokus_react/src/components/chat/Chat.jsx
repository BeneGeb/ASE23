import React from 'react'
import '../../styles/Chat/Chat.css'

import MessageWindow from './MessageWindow'
import TextBar from './TextBar'
import { registerOnMessageCallback, send} from '../../wsChat'

export default class Chat extends React.Component {
    state = {
        messages: [],
        username: null
    }

  constructor (props) {
    super(props)
    console.log("constructor")
    registerOnMessageCallback(this.onMessageReceived.bind(this))
  }

  onMessageReceived (msg) {
    msg = JSON.parse(msg)
    console.log(msg["message"])
    this.setState({
      messages: this.state.messages.concat(msg["message"])
    })
  }

  sendMessage (text) {
    const message = {
      message: text
    }
    send(JSON.stringify(message))
  }

  render () {
    const sendMessage = this.sendMessage.bind(this)

    return (
      <div className='background-containter'>
        <div className='container'>
          <div className='chat-header'>
            <h1 className='container-title'>Messages</h1>
            <TextBar onSend={sendMessage} />
          </div>
          <MessageWindow messages={this.state.messages} username={""} />
        </div>
      </div>
    )
  }
}