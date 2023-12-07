import React, { useState } from "react";
import { sendPlayerData } from "../../webSocketConnections/webSocketGameInterface";
import "../../styles/lobby/playerEditPanel.css";

const NameInput = ({ name, onPlayerDataChange }) => {
  return (
    <input
      type="text"
      className="player-name-edit"
      maxLength={10}
      value={name}
      name={"player_name"}
      onChange={onPlayerDataChange}
    />
  );
};

const CheckBoxColor = ({ color, onPlayerDataChange }) => {
  return (
    <div className="color-box">
      <div className="div-radio-red">
        <input
          type="radio"
          name="color"
          value="#FF0000"
          checked={color === "#FF0000"}
          onChange={onPlayerDataChange}
        />
      </div>
      <div className="div-radio-blue">
        <input
          type="radio"
          name="color"
          value="#0000FF"
          checked={color === "#0000FF"}
          onChange={onPlayerDataChange}
        />
      </div>
      <div className="div-radio-green">
        <input
          type="radio"
          name="color"
          value="#00FF00"
          checked={color === "#00FF00"}
          onChange={onPlayerDataChange}
        />
      </div>
      <div className="div-radio-yellow">
        <input
          type="radio"
          name="color"
          value="#FFFF00"
          checked={color === "#FFFF00"}
          onChange={onPlayerDataChange}
        />
      </div>
    </div>
  );
};

export default function PlayerEditField({ playerData }) {
  const [newPlayerData, setNewPlayerData] = useState();

  function onPlayerDataChange(e) {
    const { name, value } = e.target;

    setNewPlayerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function submitChanges() {
    const color = newPlayerData?.color ? newPlayerData.color : playerData.color;
    const player_name = newPlayerData?.player_name
      ? newPlayerData.player_name
      : playerData.player_name;
    sendPlayerData(player_name, color);
  }

  const showColor = newPlayerData?.color
    ? newPlayerData.color
    : playerData.color;
  const showName = newPlayerData?.player_name
    ? newPlayerData.player_name
    : playerData.player_name;

  return (
    <div className="parent-div-edit">
      <h1 className="headline-edit"> Personal Settings</h1>
      <NameInput name={showName} onPlayerDataChange={onPlayerDataChange} />
      <div className="div-blockus-block">
        <CheckBoxColor
          color={showColor}
          onPlayerDataChange={onPlayerDataChange}
        />
      </div>
      <div className="button-div-edit">
        <button
          type="button"
          className="confirmation-button"
          onClick={submitChanges}
        >
          set
        </button>
      </div>
    </div>
  );
}
