import React from 'react'
import '../../styles/Chat/Chat.css'
import { useState } from 'react'
import MessageWindow from './MessageWindow'
import TextBar from './TextBar'
import { startWebsocketChatConnection,registerOnMessageCallback, sendChatMessage} from '../../wsChat'

startWebsocketChatConnection()

export default function Chat () {
  const [allMessages, setAllMessages] = useState([]);
  const [username, setUsername] = useState(null);

  registerOnMessageCallback(onMessageReceived)
  
  function onMessageReceived (msg) {
    msg = JSON.parse(msg)
    setAllMessages(allMessages.concat(msg["message"]))
  }

  function sendMessage (text) {
    const message = {
      message: text
    }
    sendChatMessage(JSON.stringify(message))
  }

  return (
    <div className='container'>
      <div className='container-title'>Messages</div>
      <MessageWindow messages={allMessages} username={""} />
      <TextBar sendMessage={sendMessage} />
    </div>
  )
}
