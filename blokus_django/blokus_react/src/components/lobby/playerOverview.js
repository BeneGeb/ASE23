import React, { useState } from "react";
import "../../styles/lobby/playerOverview.css";
import { useNavigate } from "react-router-dom";
import {
  sendIfGameStart,
  sendIfPlayerReady,
  playerQuit,
} from "../../webSocketConnections/webSocketGameInterface";

function PlayerNameField({ name }) {
  return (
    <div className="player-field">
      <h1 className="player-name">{name}</h1>
    </div>
  );
}

export function SingleBlocks({ blockColor }) {
  return (
    <div
      className="outer-blockus-block"
      style={{
        backgroundColor: blockColor,
        border: "3px solid rgba(105,105,105, 0.3)",
      }}
    >
      <div
        className="inner-blockus-block"
        style={{
          backgroundColor: blockColor,
          border: "3px solid rgba(105,105,105,0.3)",
        }}
      ></div>
    </div>
  );
}

const CheckBoxReady = ({ isReady }) => {
  return (
    <div className="check-box">
      <input type="checkbox" checked={isReady} />
    </div>
  );
};

const ButtonReady = ({ isReady }) => {
  const [isChecked, setIsChecked] = useState(isReady);

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    sendIfPlayerReady(newCheckedState);
  };
  return (
    <button
      type="button"
      className="ready-button"
      onClick={handleCheckboxChange}
    >
      Ready
    </button>
  );
};

const ButtonQuit = ({ player_index }) => {
  const navigate = useNavigate();
  const hangleQuit = () => {
    playerQuit(player_index);
    navigate("/login");
  };
  return (
    <button type="button" className="quit-button" onClick={hangleQuit}>
      Quite
    </button>
  );
};

const ButtonStart= () => {
  const handleStart = () => {
    sendIfGameStart();
  };
  return (
    <button type="button" className="quit-button" onClick={handleStart}>
      Start
    </button>
  );  
}

export default function PlayerOverviewField({ playerlist, player_index }) {
  return (
    <div className="parent-div">
      <div className="header">
        <h1 className="headline">Player</h1>
        <h1 className="headline">Color</h1>
        <div className="placeholder-div-header"></div>
      </div>
      <div className="content-div">
        {playerlist.map((player, index) => (
          <div className="row-element">
            <PlayerNameField name={player.player_name} />
            <SingleBlocks blockColor={player.color} />
            <CheckBoxReady
              player_index={player.player_id}
              isReady={player.isReady}
            />
          </div>
        ))}
      </div>
      <div className="button-div">
        <ButtonReady
          player_index={player_index}
          isReady={playerlist[player_index].isReady}
        />
        <ButtonStart/>
        <ButtonQuit player_index={player_index} />
      </div>
    </div>
  );
}
