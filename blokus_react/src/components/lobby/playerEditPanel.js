import React, { useState} from "react";
import { sendPlayerData } from "../../webSocketConnections/webSocketGameInterface";
import "../../styles/lobby/playerEditPanel.css";

export default function PlayerEditField({playername, playercolor, player_id}) {
  const [playerData, setPlayerData] = useState({
    player_name: playername, 
    color: playercolor, 
  })
  
  const updatePlayerName = (newName) => {
    setPlayerData({
      ...playerData,
      player_name: newName,
    });
  };

  const updatePlayerColor = (newColor) => {
    setPlayerData({
      ...playerData,
      color: newColor,
    });
  };

  const NameInput = ({ name }) => {
    const handleChange = (event) => {
      const newVlaue = event.target.value;
      updatePlayerName(newVlaue);
    };
    return (
      <input
        type="text"
        id="playername"
        name="playername"
        className="player-name-edit"
        value={name}
        onChange={handleChange}
      ></input>
    );
  };

  const CheckBoxColor = ({ default_color }) => {
    const [selectedOption, setSelectedOption] = useState(default_color);

    const handleOptionChange = (event) => {
      const color = event.target.value;
      setSelectedOption(color);
      updatePlayerColor(color);
    };

    return (
      <div className="color-box">
        <div className="div-radio-red">
          <input
            type="radio"
            value="#FF0000"
            checked={selectedOption === "#FF0000"}
            onChange={handleOptionChange}
          />
        </div>
        <div className="div-radio-blue">
          <input
            type="radio"
            value="#0000FF"
            checked={selectedOption === "#0000FF"}
            onChange={handleOptionChange}
          />
        </div>
        <div className="div-radio-green">
          <input
            type="radio"
            value="#00FF00"
            checked={selectedOption === "#00FF00"}
            onChange={handleOptionChange}
          />
        </div>
        <div className="div-radio-yellow">
          <input
            type="radio"
            value="#FFFF00"
            checked={selectedOption === "#FFFF00"}
            onChange={handleOptionChange}
          />
        </div>
      </div>
    );
  };

  const send_changed_data = (player_id, player_data) => {
    sendPlayerData(player_id, player_data.player_name, player_data.color);
  };

  return (
    <div className="parent-div-edit">
      <h1 className="headline-edit"> Personal Settings</h1>
        <NameInput name={playerData.player_name} />
      <div className="div-blockus-block">
        <CheckBoxColor default_color={playerData.color} />
      </div>
      <div className="button-div-edit">
        <button
          type="button"
          className="confirmation-button"
          onClick={() => send_changed_data(player_id, playerData)}>
          set
        </button>
      </div>
    </div>
  );
}
