import React from 'react'
import '../../styles/Chat/Chat.css'
import { useState } from 'react'
import MessageWindow from './MessageWindow'
import TextBar from './TextBar'
import { startWebsocketChatConnection,registerOnMessageCallback} from '../../webSocketConnections/wsChatInterface'

startWebsocketChatConnection()

export default function Chat ({username}) {
  const [allMessages, setAllMessages] = useState([]);
  const [usernameMessage, setUsername] = useState([]);

  registerOnMessageCallback(onMessageReceived)
  
  function onMessageReceived (msg) {
    const json = JSON.parse(msg)
    msg = json["message"]
    const username = json["username"]
    setUsername(username)
    setAllMessages(allMessages.concat(msg))
  }


  return (
      <div className='background-containter'>
        <div className='container'>
          <div className='chat-header'>
            <h1 className='container-title'>Messages</h1>
            <TextBar username={username}/>
          </div>
          <MessageWindow messages={allMessages} username={usernameMessage} />
        </div>
      </div>
  )
}
