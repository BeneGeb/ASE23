import BlockOverview from "./BlockOverview/BlockOverview";
import '../../styles/Gamepage/gamepage.css'
import { useState } from 'react';
import { generateBlocks } from "../../Helper/BlockGenerator";
import { startWebsocketGameConnection, registerOnGameMessageCallback, sendPlacedBlock} from "../../webSocketConnections/webSocketGameInterface";
import Gamefield from "../field/Gamefield";

startWebsocketGameConnection();

const allPlayer = [{"player_id": 0,"color": "red"}, {"player_id": 1,"color": "green"}, {"player_id": 2,"color": "blue"}, {"player_id": 3,"color": "yellow"}]

export default function GamePage(){
    const [allBlocks, setAllBlocks] = useState(generateBlocks());
    const [currPlayer, setCurrPlayer] = useState(1);
    const [squaresArray, setsquaresArray] = useState(
        Array.from({ length: 400 }, (v, i) => "")
    );

    registerOnGameMessageCallback(onGameMessageReceived)

    function onGameMessageReceived (jsonData) {
        const json = JSON.parse(jsonData)
        const field = json["field"]
        const currPlayer = json["currPlayer"]
        setCurrPlayer(currPlayer)
        setsquaresArray(field)
    }


    return (
        <div class="gamepage">
            <button onClick={() => sendPlacedBlock([4,8,9],"red")} />
            <div className="left-overviews">
                 <BlockOverview key={0} currPlayer={0==currPlayer} allBlocks={allBlocks.get("red")} color={"red"}/>
                 <BlockOverview key={1} currPlayer={1==currPlayer} allBlocks={allBlocks.get("yellow")} color={"yellow"}/>
            </div>
            <div className="game-field">
                <Gamefield squaresArray={squaresArray}/>
            </div>
            <div className="right-overviews">
                 <BlockOverview key={2} currPlayer={2==currPlayer} allBlocks={allBlocks.get("green")} color={"green"}/>
                 <BlockOverview key={3} currPlayer={3==currPlayer} allBlocks={allBlocks.get("blue")} color={"blue"}/>
            </div>
        </div>
    );
}
