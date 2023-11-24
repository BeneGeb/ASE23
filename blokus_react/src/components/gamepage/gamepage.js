import BlockOverview from "./BlockOverview/BlockOverview";
import '../../styles/Gamepage/gamepage.css'
import { useState } from 'react';
import { generateBlocks } from "../../Helper/BlockGenerator";
import { startWebsocketGameConnection, registerOnGameMessageCallback, sendPlacedBlock} from "../../webSocketConnections/webSocketGameInterface";
import Gamefield from "../field/Gamefield";

startWebsocketGameConnection();

export default function GamePage(){
    const [allBlocks, setAllBlocks] = useState(generateBlocks());
    const [squaresArray, setsquaresArray] = useState(
        Array.from({ length: 400 }, (v, i) => "")
    );

    registerOnGameMessageCallback(onGameMessageReceived)
  
    function onGameMessageReceived (jsonData) {
        const request = JSON.parse(jsonData)
        const field = request["field"]
        setsquaresArray(field)
    }


    return (
        <div class="gamepage">
            <button onClick={() => sendPlacedBlock([4,8,9],"red")} />
            <div className="left-overviews">
                 <BlockOverview key={0} allBlocks={allBlocks[0]}/>
                 <BlockOverview key ={1}allBlocks={allBlocks[1]}/>
            </div>
            <div className="game-field">
                <Gamefield squaresArray={squaresArray}/>
            </div>
            <div className="right-overviews">
                 <BlockOverview key={2} allBlocks={allBlocks[2]}/>
                 <BlockOverview key={3} allBlocks={allBlocks[3]}/>
            </div>
        </div>
    );
}
