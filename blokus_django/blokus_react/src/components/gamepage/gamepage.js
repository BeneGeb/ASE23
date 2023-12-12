import BlockOverview from "./BlockOverview/BlockOverview";
import "../../styles/Gamepage/gamepage.css";
import { useState, React } from "react";
import { generateBlocks } from "../../Helper/BlockGenerator";
import {
  startWebsocketGameConnection,
  registerOnGameMessageCallback,
  sendPlacedBlock,
  startGame,
  sendPlayerSurrender,
} from "../../webSocketConnections/webSocketGameInterface";
import Gamefield from "./field/Gamefield";
import {
  isIndexInArrayOfArray,
  findIndexInArrayOfArray,
  findFieldsOfColorInArray,
} from "../../Helper/ArrayHelper";

import {
  checkFieldPossible,
  evalDiagonalFields,
} from "../../Helper/BlokusHelper";
import Chat from "../chat/Chat";

import PlaceBlockButtons from "./Buttons/placeBlockButtons";
import SurrChatButtons from "./Buttons/surrChatButtons";
import WinnerOverview from "./WinnerOverview/WinnerOverview";

// startWebsocketGameConnection();

// setTimeout(startGame, 2000);

const colorMapping = {
  "#FF0000": "red",
  "#00FF00": "green",
  "#0000FF": "blue",
  "#FFFF00": "yellow",
};

export default function GamePage() {
  const [allBlocks, setAllBlocks] = useState(generateBlocks());
  const [showWinner, setShowWinner] = useState(false);
  const [currPlayer, setCurrPlayer] = useState(0);
  const [squaresArray, setsquaresArray] = useState(
    Array.from({ length: 400 }, (v, i) => "")
  );
  const [playerData, setPlayerData] = useState([
    {
      player_id: 0,
      player_name: "-",
      color: "red",
      selectedBlock: allBlocks.get("red")[0],
      selectedFilter: 1,
    },
    {
      player_id: 1,
      player_name: "-",
      color: "green",
      selectedBlock: allBlocks.get("green")[0],
      selectedFilter: 1,
    },
    {
      player_id: 2,
      player_name: "-",
      color: "blue",
      selectedBlock: allBlocks.get("blue")[0],
      selectedFilter: 1,
    },
    {
      player_id: 3,
      player_name: "-",
      color: "yellow",
      selectedBlock: allBlocks.get("yellow")[0],
      selectedFilter: 1,
    },
  ]);
  const [markedFields, setMarkedFields] = useState([]);
  const [placedBlock, setPlacedBlock] = useState([]);

  registerOnGameMessageCallback(onGameMessageReceived);

  //Handler for Receiving Messages from Server
  function onGameMessageReceived(jsonData) {
    const json = JSON.parse(jsonData);
    const type = json["type"];

    if (type === "send_gamefield") {
      updateCurrentGamestate(
        json["field"],
        json["currPlayer"],
        json["playerList"]
      );
    } else if (type === "send_block_placed") {
      deletePlacedBlockFromAllBlocks(json["playerId"], json["blockId"]);
      evalMarkedFields(squaresArray, null);
    } else if (type === "send_end_game") {
      console.log(jsonData);
      console.log("Game Ended");
      const showWinner = () => setShowWinner(true);
      showWinner();
    }
  }

  function updateCurrentGamestate(field, currPlayer, newPlayerData) {
    setCurrPlayer(currPlayer);
    setsquaresArray(field);
    evalMarkedFields(field, null);
    const updatedPlayerData = [...playerData];

    newPlayerData.forEach((newData, index) => {
      updatedPlayerData[index] = {
        ...updatedPlayerData[index],
        player_id: newData.player_id,
        color: colorMapping[newData.color],
        player_name: newData.player_name,
      };
    });
    console.log(updatedPlayerData);
    setPlayerData(updatedPlayerData);
    setPlacedBlock([]);
  }

  function deletePlacedBlockFromAllBlocks(player_id, block_id) {
    let copyAllBlocks = allBlocks;
    const playerColor = playerData.find(
      (player) => player.player_id === player_id
    ).color;

    //Delete placed Block from allBlocks
    let blocksIndex = copyAllBlocks.get(playerColor);
    copyAllBlocks.set(
      playerColor,
      blocksIndex.filter((block) => block.block_id !== block_id)
    );

    const updatedPlayerData = [...playerData];

    const playerIndex = updatedPlayerData.findIndex(
      (player) => player.color === playerColor
    );

    const playerFilter = updatedPlayerData[playerIndex].selectedFilter;
    const filteredBlocks = allBlocks
      .get(playerColor)
      .filter((block) => block.getSize() === playerFilter);

    if (playerIndex !== -1) {
      updatedPlayerData[playerIndex] = {
        ...updatedPlayerData[playerIndex],
        selectedBlock: filteredBlocks[0],
      };
    }

    evalMarkedFields(squaresArray, filteredBlocks[0]);
    setPlayerData(updatedPlayerData);
    setAllBlocks(copyAllBlocks);
  }

  function evalMarkedFields(field, selectedBlock) {
    const currPlayerData = playerData.find(
      (player) => player.player_id === currPlayer
    );
    //get selected Block and color of current Player
    if (selectedBlock == null) {
      selectedBlock = currPlayerData.selectedBlock;
    }

    if (selectedBlock == null) {
      setMarkedFields([]);
      return;
    }
    const color = currPlayerData.color;

    //get all possible indices to place new block
    const allFields = findFieldsOfColorInArray(color, field);
    const allDiagonalFields = evalDiagonalFields(allFields);
    let markedFields = [];

    //check if no block has been placed before
    if (allDiagonalFields.length !== 0) {
      //Try every possibility for every diagonal block
      allDiagonalFields.forEach((index) => {
        const newFields = selectedBlock.evalAllFixedIndices(index);

        newFields.forEach((possibility) => {
          if (checkFieldPossible(possibility, color, squaresArray))
            markedFields.push(possibility);
        });
      });
    } else {
      //check possibility for placing block in corner
      const playerIndex = playerData.findIndex(
        (player) => player.player_id === currPlayer
      );
      let startIndex;

      //Fixed Corner Values depending on player
      if (playerIndex === 0) startIndex = 0;
      else if (playerIndex === 1) startIndex = 380;
      else if (playerIndex === 2) startIndex = 399;
      else if (playerIndex === 3) startIndex = 19;

      const newFields = selectedBlock.evalAllFixedIndices(startIndex);
      newFields.forEach((possibility) => {
        if (checkFieldPossible(possibility, color, squaresArray))
          markedFields.push(possibility);
      });
    }
    setMarkedFields(markedFields);
  }

  function onSquareClick(index) {
    console.log(index);
    if (isIndexInArrayOfArray(index, markedFields)) {
      const placedBlock = findIndexInArrayOfArray(index, markedFields);

      setPlacedBlock(placedBlock);
    }
  }

  function onSubmitField() {
    if (placedBlock.length === 0) return;
    setMarkedFields([]);
    const selectedBlockId = playerData.find(
      (player) => player.player_id == currPlayer
    ).selectedBlock.block_id;
    sendPlacedBlock(
      placedBlock,
      playerData.find((player) => player.player_id == currPlayer).color,
      selectedBlockId
    );
    setPlacedBlock([]);
  }

  function onRotateSquare() {
    const updatedPlayerData = [...playerData];

    const playerIndex = updatedPlayerData.findIndex(
      (player) => player.player_id === currPlayer
    );

    const selectedBlock = updatedPlayerData[playerIndex].selectedBlock;
    if (!selectedBlock) return;
    selectedBlock.turnBlock();

    updatedPlayerData[playerIndex] = {
      ...updatedPlayerData[playerIndex],
      selectedBlock: selectedBlock,
    };

    setPlacedBlock([]);
    evalMarkedFields(squaresArray, selectedBlock);
    setPlayerData(updatedPlayerData);
  }

  function onMirrorSquare() {
    const updatedPlayerData = [...playerData];

    const playerIndex = updatedPlayerData.findIndex(
      (player) => player.player_id === currPlayer
    );

    const selectedBlock = updatedPlayerData[playerIndex].selectedBlock;
    if (!selectedBlock) return;
    selectedBlock.mirrorBlock();

    updatedPlayerData[playerIndex] = {
      ...updatedPlayerData[playerIndex],
      selectedBlock: selectedBlock,
    };

    setPlacedBlock([]);
    evalMarkedFields(squaresArray, selectedBlock);
    setPlayerData(updatedPlayerData);
  }

  function onFilterChange(playerId, newFilter) {
    const updatedPlayerData = [...playerData];

    const playerIndex = updatedPlayerData.findIndex(
      (player) => player.player_id === playerId
    );

    const filteredBlocks = allBlocks
      .get(playerData.find((player) => player.player_id == playerId).color)
      .filter((block) => block.getSize() === newFilter);

    if (playerIndex !== -1) {
      updatedPlayerData[playerIndex] = {
        ...updatedPlayerData[playerIndex],
        selectedFilter: newFilter,
        selectedBlock: filteredBlocks[0],
      };
    }

    if (playerId === currPlayer)
      evalMarkedFields(squaresArray, filteredBlocks[0]);
    setPlacedBlock([]);
    setPlayerData(updatedPlayerData);
  }

  function onSwitchBlockClick(playerId, direction) {
    const updatedPlayerData = [...playerData];

    const playerIndex = updatedPlayerData.findIndex(
      (player) => player.player_id === playerId
    );

    const playerFilter = updatedPlayerData[playerIndex].selectedFilter;
    const filteredBlocks = allBlocks
      .get(playerData.find((player) => player.player_id == playerId).color)
      .filter((block) => block.getSize() === playerFilter);

    const selectedBlockIndex = filteredBlocks.findIndex(
      (block) => block === playerData[playerIndex].selectedBlock
    );

    let newIndex;
    if (direction === "left") {
      newIndex = selectedBlockIndex - 1;
      if (newIndex < 0) newIndex = filteredBlocks.length - 1;
    } else {
      newIndex = selectedBlockIndex + 1;
      if (newIndex >= filteredBlocks.length) newIndex = 0;
    }

    if (playerIndex !== -1) {
      updatedPlayerData[playerIndex] = {
        ...updatedPlayerData[playerIndex],
        selectedBlock: filteredBlocks[newIndex],
      };
    }
    if (playerId === currPlayer)
      evalMarkedFields(squaresArray, filteredBlocks[newIndex]);
    setPlacedBlock([]);
    setPlayerData(updatedPlayerData);
  }

  function ChatPopup({ username }) {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
      setIsOpen(!isOpen);
    };
    return (
      <div>
        <button classname="open-button-chat" onClick={togglePopup}>
          Chat
        </button>

        {isOpen && (
          <div className="popup">
            <Chat username={username} />
          </div>
        )}
      </div>
    );
  }

  function onSurrender() {
    console.log("Surrender");
    sendPlayerSurrender();
  }

  function onChat() {
    console.log("Chat");
  }

  return (
    <div class="gamepage">
      <div className="overviews-container">
        <BlockOverview
          key={0}
          currPlayer={0 == currPlayer}
          playerData={playerData.find((player) => player.player_id == 0)}
          onFilterChange={onFilterChange}
          onSwitchBlockClick={onSwitchBlockClick}
        />
        <PlaceBlockButtons
          onSubmit={onSubmitField}
          onRotate={onRotateSquare}
          onMirror={onMirrorSquare}
        />
        <BlockOverview
          key={1}
          currPlayer={1 == currPlayer}
          playerData={playerData.find((player) => player.player_id == 1)}
          onFilterChange={onFilterChange}
          onSwitchBlockClick={onSwitchBlockClick}
        />
      </div>
      <div className="game-field">
        <Gamefield
          squaresArray={squaresArray}
          markedFields={markedFields}
          onSquareClick={onSquareClick}
          placedBlock={placedBlock}
          selectionColor={
            playerData.find((player) => player.player_id == currPlayer).color
          }
        />
      </div>
      <div className="overviews-container">
        <BlockOverview
          key={3}
          currPlayer={3 == currPlayer}
          playerData={playerData.find((player) => player.player_id == 3)}
          onFilterChange={onFilterChange}
          onSwitchBlockClick={onSwitchBlockClick}
        />
        <SurrChatButtons onSurrender={onSurrender} onChat={onChat} />
        <BlockOverview
          key={2}
          currPlayer={2 == currPlayer}
          playerData={playerData.find((player) => player.player_id == 2)}
          onFilterChange={onFilterChange}
          onSwitchBlockClick={onSwitchBlockClick}
        />
      </div>
      {showWinner ? (
        <WinnerOverview playerData={playerData} allBlocks={allBlocks} />
      ) : null}
    </div>
  );
}
