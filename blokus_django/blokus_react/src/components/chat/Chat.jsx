import React from "react";
import "../../styles/Chat/Chat.css";
import { useState, useEffect } from "react";
import MessageWindow from "./MessageWindow";
import TextBar from "./TextBar";
import {
  startWebsocketChatConnection,
  registerOnMessageCallback,
} from "../../webSocketConnections/wsChatInterface";

export default function Chat({ username, inLobby }) {
  const [chatJson, setChatJson] = useState();
  let className = "";

  registerOnMessageCallback(onMessageReceived);
  useEffect(() => {
    async function fetchData() {
      startWebsocketChatConnection();
    }
    fetchData();
  }, []);

  function onMessageReceived(jsonData) {
    const json = JSON.parse(jsonData);
    setChatJson(json);
  }

  if (inLobby) {
    className = "background-containter";
  } else {
    className = "transparent-background-container";
  }

  return (
    <div className={className}>
      <div className="container">
        <div className="chat-header">
          <h1 className="container-title">Messages</h1>
          <TextBar username={username} />
        </div>
        <MessageWindow chatJson={chatJson} />
      </div>
    </div>
  );
}
