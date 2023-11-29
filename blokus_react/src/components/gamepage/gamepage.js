import BlockOverview from "./BlockOverview/BlockOverview";
import "../../styles/Gamepage/gamepage.css";
import { useState } from "react";
import { generateBlocks } from "../../Helper/BlockGenerator";
import {
  startWebsocketGameConnection,
  registerOnGameMessageCallback,
  sendPlacedBlock,
} from "../../webSocketConnections/webSocketGameInterface";
import Gamefield from "./field/Gamefield";

startWebsocketGameConnection();

export default function GamePage() {
  const [allBlocks, setAllBlocks] = useState(generateBlocks());
  const [currPlayer, setCurrPlayer] = useState(1);
  const [squaresArray, setsquaresArray] = useState(
    Array.from({ length: 400 }, (v, i) => "")
  );
  const [playerData, setPlayerData] = useState([
    { player_id: 0, color: "red", selectedBlock: 0 },
    { player_id: 1, color: "green", selectedBlock: 0 },
    { player_id: 2, color: "blue", selectedBlock: 0 },
    { player_id: 3, color: "yellow", selectedBlock: 0 },
  ]);

  registerOnGameMessageCallback(onGameMessageReceived);
  evalMarkedFields();

  function onGameMessageReceived(jsonData) {
    const json = JSON.parse(jsonData);
    const field = json["field"];
    const currPlayer = json["currPlayer"];
    setCurrPlayer(currPlayer);
    setsquaresArray(field);
  }

  function onSelectedBlockChanged(color, newBlock) {
    const newPlayerData = [...playerData];
    newPlayerData.find((player) => player.color === color).selectedBlock =
      newBlock;
    setPlayerData(newPlayerData);
    console.log(newBlock);
  }

  function evalMarkedFields() {
    const currPlayerData = playerData.find(
      (player) => player.player_id == currPlayer
    );

    if (squaresArray.includes(currPlayerData.color)) {
      console.log("jaaa");
    }
    console.log(squaresArray);
  }

  //NUR ZUM TESTEN----------
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    // Den Wert des Eingabefelds aktualisieren, wenn sich der Benutzer ändert
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    try {
      // Versuche den eingegebenen String in ein Array umzuwandeln
      const arrayValue = JSON.parse(inputValue);

      sendPlacedBlock(
        arrayValue,
        playerData.find((player) => player.player_id == currPlayer).color
      );
      // Hier kannst du das Array verwenden
      console.log("Aktueller Wert des Inputs als Array:", arrayValue);

      // Hier kannst du deine WebSocket-Funktion mit dem Array-Wert aufrufen
      // sendPlacedBlock(arrayValue, "red");
    } catch (error) {
      console.error("Fehler beim Parsen des Eingabewerts als Array:", error);
    }
  };
  //------------------------

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
        <button onClick={handleButtonClick}>test Websocket</button>
        <input value={inputValue} onChange={handleInputChange} />
        <Gamefield squaresArray={squaresArray} markedFields={[]} />
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
