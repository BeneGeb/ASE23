import BlockOverview from "./BlockOverview/BlockOverview";
import "../../styles/Gamepage/gamepage.css";
import { useState, React } from "react";
import { generateBlocks } from "../../Helper/BlockGenerator";
import {
  startWebsocketGameConnection,
  registerOnGameMessageCallback,
  sendPlacedBlock,
} from "../../webSocketConnections/webSocketGameInterface";
import Gamefield from "./field/Gamefield";
import {
  isIndexInArrayOfArray,
  findIndexInArrayOfArray,
} from "../../Helper/ArrayHelper";

startWebsocketGameConnection();

export default function GamePage() {
  const [allBlocks, setAllBlocks] = useState(generateBlocks());
  const [currPlayer, setCurrPlayer] = useState(0);
  const [squaresArray, setsquaresArray] = useState(
    Array.from({ length: 400 }, (v, i) => "")
  );
  const [playerData, setPlayerData] = useState([
    {
      player_id: 0,
      color: "red",
      selectedBlock: allBlocks.get("red")[0],
    },
    { player_id: 1, color: "green", selectedBlock: allBlocks.get("green")[0] },
    { player_id: 2, color: "blue", selectedBlock: allBlocks.get("blue")[0] },
    {
      player_id: 3,
      color: "yellow",
      selectedBlock: allBlocks.get("yellow")[0],
    },
  ]);
  const [markedFields, setMarkedFields] = useState([]);
  const [placedBlock, setPlacedBlock] = useState([]);

  registerOnGameMessageCallback(onGameMessageReceived);

  function onGameMessageReceived(jsonData) {
    const json = JSON.parse(jsonData);
    const field = json["field"];
    const currPlayer = json["currPlayer"];
    setCurrPlayer(currPlayer);
    setsquaresArray(field);

    evalMarkedFields(field);
  }

  function onSelectedBlockChanged(color, newBlock) {
    const newPlayerData = [...playerData];
    newPlayerData.find((player) => player.color === color).selectedBlock =
      newBlock;
    setPlayerData(newPlayerData);
    evalMarkedFields(squaresArray);
    setPlacedBlock([]);
  }

  function findFieldsOfColor(color, field) {
    var fields = [];
    for (var i = 0; i < field.length; i++) {
      if (squaresArray[i] === color) {
        fields.push(i);
      }
    }
    return fields;
  }

  function evalMarkedFields(field) {
    //TODO: Abfrage ob der Spieler auch dran ist
    const currPlayerData = playerData.find(
      (player) => player.player_id === currPlayer
    );
    const selectedBlock = currPlayerData.selectedBlock;
    const color = currPlayerData.color;

    const allFields = findFieldsOfColor(color, field);
    const allDiagonalFields = evalDiagonalFields(allFields);
    let markedFields = [];
    allDiagonalFields.forEach((index) => {
      const newFields = selectedBlock.evalAllFixedIndices(index);

      newFields.forEach((possibility) => {
        if (checkPossible(possibility, color)) markedFields.push(possibility);
      });
    });
    setMarkedFields(markedFields);
  }

  function checkPossible(indexList, color) {
    for (let i = 0; i < indexList.length; i++) {
      const index = indexList[i];

      if (squaresArray[index] !== "") return false; // Wenn das Feld schon belegt ist
      if (squaresArray[index - 1] === color) return false; // Wenn links schon belegt ist
      if (squaresArray[index + 1] === color) return false; // Wenn rechts schon belegt ist
      if (squaresArray[index - 20] === color) return false; // Wenn oben schon belegt ist
      if (squaresArray[index + 20] === color) return false; // Wenn unten schon belegt ist
      if (index < 0 || index > 399) return false;
    }
    return true;
  }

  function evalDiagonalFields(allFields) {
    let allDiagonalFields = [];
    allFields.forEach((index) => {
      const left_up = index - 21;
      if (left_up >= 0 && left_up < 400) allDiagonalFields.push(left_up);

      const right_up = index - 19;
      if (right_up >= 0 && right_up < 400) allDiagonalFields.push(right_up);

      const left_down = index + 19;
      if (left_down >= 0 && left_down < 400) allDiagonalFields.push(left_down);

      const right_down = index + 21;
      if (right_down >= 0 && right_down < 400)
        allDiagonalFields.push(right_down);
    });
    return allDiagonalFields;
  }

  function onSquareClick(index) {
    if (isIndexInArrayOfArray(index, markedFields)) {
      const placedBlock = findIndexInArrayOfArray(index, markedFields);

      setPlacedBlock(placedBlock);
    }
  }

  function onSubmitField() {
    setMarkedFields([]);
    sendPlacedBlock(
      placedBlock,
      playerData.find((player) => player.player_id == currPlayer).color
    );
    setPlacedBlock([]);
  }

  return (
    <div class="gamepage">
      <div className="left-overviews">
        <BlockOverview
          key={0}
          currPlayer={0 == currPlayer}
          allBlocks={allBlocks.get(
            playerData.find((player) => player.player_id == 0).color
          )}
          color={playerData.find((player) => player.player_id == 0).color}
          onSelectedBlockChanged={onSelectedBlockChanged}
        />
        {placedBlock.length !== 0 ? (
          <button onClick={onSubmitField}>test</button>
        ) : null}
        <BlockOverview
          key={1}
          currPlayer={1 == currPlayer}
          allBlocks={allBlocks.get(
            playerData.find((player) => player.player_id == 1).color
          )}
          color={playerData.find((player) => player.player_id == 1).color}
          onSelectedBlockChanged={onSelectedBlockChanged}
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
      <div className="right-overviews">
        <BlockOverview
          key={2}
          currPlayer={2 == currPlayer}
          allBlocks={allBlocks.get(
            playerData.find((player) => player.player_id == 2).color
          )}
          color={playerData.find((player) => player.player_id == 2).color}
          onSelectedBlockChanged={onSelectedBlockChanged}
        />
        <BlockOverview
          key={3}
          currPlayer={3 == currPlayer}
          allBlocks={allBlocks.get(
            playerData.find((player) => player.player_id == 3).color
          )}
          color={playerData.find((player) => player.player_id == 3).color}
          onSelectedBlockChanged={onSelectedBlockChanged}
        />
      </div>
    </div>
  );
}
