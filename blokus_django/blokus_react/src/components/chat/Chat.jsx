import React from 'react'
import '../../styles/Chat/Chat.css'
import { useState } from 'react'
import MessageWindow from './MessageWindow'
import TextBar from './TextBar'
import { startWebsocketChatConnection,registerOnMessageCallback} from '../../webSocketConnections/wsChatInterface'

startWebsocketChatConnection()

export default function Chat ({username, inLobby}) {
  const [chatJson, setChatJson] = useState();
  let className = '';

  registerOnMessageCallback(onMessageReceived)
  
  function onMessageReceived (jsonData) {
    const json = JSON.parse(jsonData)
    setChatJson(json)
  }

  if(inLobby){
    className = 'background-containter';
  }
  else {
    className = 'transparent-background-container';
  }

  return (
      <div className={className}>
        <div className='container'>
          <div className='chat-header'>
            <h1 className='container-title'>Messages</h1>
            <TextBar username={username}/>
          </div>
          <MessageWindow chatJson={chatJson}/>
        </div>
      </div>
  )
}
