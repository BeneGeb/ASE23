import React, { useState, useEffect } from "react";
import PlayerOverviewField from "./playerOverview";
import PlayerEditField from "./playerEditPanel";
import Chat from "../chat/Chat";
import "../../styles/lobby/lobby.css";
import {
  startWebsocketGameConnection,
  registerOnLobbyMessageCallback,
  sendJoinedPlayer,
  playerJoinedLobby,
} from "../../webSocketConnections/webSocketGameInterface";
import { useNavigate } from "react-router-dom";

// startWebsocketGameConnection();
// setTimeout(() => playerJoinedLobby(0), 2000);

export default function LobbyPage({}) {
  const navigate = useNavigate();
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
  const [playerId, setPlayerId] = useState(0);
  const [playerIndex, setPlayerIndex] = useState(0);

  useEffect(() => {
    function fetchData() {
      startWebsocketGameConnection();
      setTimeout(() => sendJoinedPlayer(), 400);
    }
    fetchData();
  }, []);
  const updatePlayerData = (player_id, newData) => {
    const updatedPlayerData = [...playerData];

    const index = playerData.findIndex(
      (element) => element.player_id === player_id
    );

    updatedPlayerData[index] = {
      ...updatedPlayerData[index],
      player_name: newData.player_name,
      color: newData.color,
    };
    setPlayerData(updatedPlayerData);
  };

  const updateReadyStatus = (player_id, isReadySatus) => {
    const updatedPlayerData = [...playerData];
    const index = playerData.findIndex(
      (element) => element.player_id === player_id
    );
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
      const playerData = json["player_list"];
      setPlayerData(playerData);
      const playerIndex = playerData.findIndex(
        (element) => element.player_id === playerId
      );
      setPlayerIndex(playerIndex);
    } else if (type === "send_playerData") {
      const updatedData = {
        player_id: json["player_id"],
        player_name: json["player_name"],
        color: json["color"],
      };
      updatePlayerData(json["player_id"], updatedData);
    } else if (type === "send_ready_information") {
      const player_id = json["player_id"];
      const isReady = json["isReady"];
      updateReadyStatus(player_id, isReady);
    } else if (type === "send_player_id") {
      setPlayerId(json["player_id"]);
    } else if (type === "send_start_game") {
      console.log("start game");
      navigate("/gamepage");
    } else if (type === "error") {
      const message = json["message"];
      console.log(message) 
    }
  }

  return (
    <div class="lobby-page">
      <div className="upper-divs">
        <PlayerOverviewField
          playerlist={playerData}
          player_index={playerIndex}
        />
        <PlayerEditField playerData={playerData[playerIndex]} />
      </div>
      <div className="chat-div">
        <div className="chat-inner-div">
          <Chat username={playerData[playerIndex].player_name} inLobby={true} />
        </div>
      </div>
    </div>
  );
}
