import React from "react";
import "../../styles/Chat/Chat.css";
import { useState } from "react";
import MessageWindow from "./MessageWindow";
import TextBar from "./TextBar";
import {
  startWebsocketChatConnection,
  registerOnMessageCallback,
} from "../../webSocketConnections/wsChatInterface";

startWebsocketChatConnection();

<<<<<<< Updated upstream
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
=======
export default function Chat({ username }) {
  const [allMessages, setAllMessages] = useState([]);

  registerOnMessageCallback(onMessageReceived);

  function onMessageReceived(msg) {
    msg = JSON.parse(msg);
    setAllMessages(allMessages.concat(msg["message"]));
  }

  return (
    <div className="background-containter">
      <div className="container">
        <div className="chat-header">
          <h1 className="container-title">Messages</h1>
          <TextBar />
>>>>>>> Stashed changes
        </div>
        <MessageWindow messages={allMessages} username={username} />
      </div>
    </div>
  );
}
