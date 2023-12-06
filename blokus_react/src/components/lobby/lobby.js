import React, { useState, useEffect } from "react";
import PlayerOverviewField from "./playerOverview";
import PlayerEditField from "./playerEditPanel";
import Chat from "../chat/Chat";
import "../../styles/lobby/lobby.css";
import {
  startWebsocketGameConnection,
  registerOnLobbyMessageCallback,
  sendJoinedPlayer,
} from "../../webSocketConnections/webSocketGameInterface";
startWebsocketGameConnection();

setTimeout(sendJoinedPlayer, 2000);

export default function LobbyPage({}) {
  const [playerData, setPlayerData] = useState([
    {
      player_id: 0,
      player_name: "-",
      color: "gray",
      isReady: false,
    },
    {
      player_id: 1,
      player_name: "-",
      color: "gray",
      isReady: false,
    },
    {
      player_id: 2,
      player_name: "-",
      color: "gray",
      isReady: false,
    },
    {
      player_id: 3,
      player_name: "-",
      color: "gray",
      isReady: false,
    },
  ]);

  function playerJoinedLobby(index) {
    const websocket = startWebsocketGameConnection();
    const color = ["Red", "Blue", "Green", "Blue"];
    const player_name = "Player_" + index;
    // Check if the websocket instance exists before accessing its properties
    if (websocket && websocket.readyState === websocket.OPEN) {
      // Use the websocket instance
      sendJoinedPlayer(index, player_name, color[index]);
    } else {
      console.log("WebSocket is not ready yet.");
    // Handle the case when the WebSocket is not open yet
    }
  }

  const updatePlayerData = (index, newData) => {
    const updatedPlayerData = [...playerData];
    updatedPlayerData[index] = {
      ...updatedPlayerData[index],
      player_name: newData.player_name,
      color: newData.color,
    };
    setPlayerData(updatedPlayerData);
  };

  const updateReadyStatus = (index, isReadySatus) => {
    const updatedPlayerData = [...playerData];
    updatedPlayerData[index] = {
      ...updatedPlayerData[index],
      isReady: isReadySatus,
    };
    console.log(updatedPlayerData);
    setPlayerData(updatedPlayerData);
  };

  registerOnLobbyMessageCallback(onLobbyMessageReceived);

  function onLobbyMessageReceived(jsonData) {
    const json = JSON.parse(jsonData);
    const type = json["type"];

    if (type === "send_joinedPlayer") {
      setPlayerData(json["player_list"]);
    } else if (type === "send_playerData") {
      const updatedData = {
        player_id: json["player_id"],
        player_name: json["player_name"],
        color: json["color"],
      };
      updatePlayerData(json["player_id"], updatedData);
    } else if (type === "send_ready_information") {
      console.log("sdasdasdasdasdas");
      const player_id = json["player_id"];
      const isReady = json["isReady"];
      updateReadyStatus(player_id, isReady);
    }
  }
  playerJoinedLobby(1);
  return (
    <div class="lobby-page">
      <div className="upper-divs">
        <PlayerOverviewField playerlist={playerData} player_id={0} />
        <PlayerEditField
          playername={playerData[0].player_name}
          playercolor={playerData[0].color}
          player_id={playerData[0]}
        />
      </div>
      <div className="chat-div">
        <Chat />
      </div>
    </div>
  );
}

