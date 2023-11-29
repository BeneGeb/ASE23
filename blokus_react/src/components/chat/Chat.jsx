import React from 'react'
import '../../styles/Chat/Chat.css'
import { useState } from 'react'
import MessageWindow from './MessageWindow'
import TextBar from './TextBar'
import { startWebsocketChatConnection,registerOnMessageCallback} from '../../webSocketConnections/wsChatInterface'

startWebsocketChatConnection()

export default function Chat () {
  const [allMessages, setAllMessages] = useState([]);
  const [username, setUsername] = useState(null);

  registerOnMessageCallback(onMessageReceived)
  
  function onMessageReceived (msg) {
    msg = JSON.parse(msg)
    setAllMessages(allMessages.concat(msg["message"]))
  }


  return (
    <div className='container'>
      <div className='container-title'>Messages</div>
      <MessageWindow messages={allMessages} username={""} />
      <TextBar />
    </div>
  )
}
