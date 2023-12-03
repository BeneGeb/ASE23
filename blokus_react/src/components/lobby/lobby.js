import React, { useState, useEffect } from "react";
import PlayerOverviewField from './playerOverview';
import PlayerEditField from './playerEditPanel';
import Chat from '../chat/Chat';
import '../../styles/lobby/lobby.css';
import {
    startWebsocketLobbyConnection,
    registerOnLobbyMessageCallback,
    sendJoinedPlayer,
} from "../../webSocketConnections/webSocketLobby";

startWebsocketLobbyConnection();

export default function LobbyPage({ playerDataSet, player_id }) {
    const [playerData, setPlayerData] = useState([
        {
            player_id: 0,
            player_name: '-',
            color: "gray",
            isReady: false,
        },
        {
            player_id: 1,
            player_name: '-',
            color: "gray",
            isReady: false,
        },
        {
            player_id: 2,
            player_name: '-',
            color: "gray",
            isReady: false,
        },
        {
            player_id: 3,
            player_name: '-',
            color: "gray",
            isReady: false,
        },
      ]); 

    useEffect(() => {
        registerOnLobbyMessageCallback(onLobbyMessageReceived);
    }, []);

    function playerJoinedLobby(index) {
        const color = ["#0000FF", "#FFFF00", "#00FF00", "#FF0000"];
        const player_name = 'Player_' + index;
        sendJoinedPlayer(index, player_name, color[index])
    }

    function updateJoinedPlayer(index, newData) {
        const updatedPlayerData = [...playerData];
        updatedPlayerData[index] = newData;
        setPlayerData(updatedPlayerData);
    }

    const updatePlayerData = (index, newData) => {
        const updatedPlayerData = [...playerData];
        updatedPlayerData[index] = {
        ...updatedPlayerData[index],
            player_name: newData.player_name,
            color: newData.color,
        }
        setPlayerData(updatedPlayerData);
    };

    const updateReadyStatus = (index, isReadySatus) => {
        const updatedPlayerData = [...playerData];
        updatedPlayerData[index] = {
        ...updatedPlayerData[index],
            isReady: isReadySatus,
        }
        setPlayerData(updatedPlayerData);
    };

    function onLobbyMessageReceived(jsonData) {
        const json = JSON.parse(jsonData);
        const type = json["type"];

        if (type === "send_joinedPlayer") {
            const updatedData = {
                player_id: json["player_id"],
                player_name: json["player_name"],
                color: json["color"],
                isReady: json["isReady"],
            }
            updateJoinedPlayer(player_id, updatedData)
        } else if (type === "send_playerData") {
            const updatedData = {
                player_id: json["player_id"],
                player_name: json["player_name"],
                color: json["color"],
            }
            updatePlayerData(player_id, updatedData)
        } else if (type === "send_ready_information") {
                const player_id = json["player_id"]
                const isReady = json["isReady"]
                updateReadyStatus(player_id, isReady)
        }
    }

    return (
        <div class="lobby-page">
            <div className='upper-divs'>
                <PlayerOverviewField playerlist={playerDataSet}/> 
                <PlayerEditField playername={playerDataSet[player_id].player_name} playercolor={playerDataSet[player_id.color]} player_id={player_id}/>
            </div>
            <div className='chat-div'>
                <Chat/>
            </div>
        </div>
    );
}