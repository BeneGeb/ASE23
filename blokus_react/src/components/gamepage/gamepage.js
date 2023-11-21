import BlockOverview from "./BlockOverview/BlockOverview";
import '../../styles/Gamepage/gamepage.css'
import { useState } from 'react';
import { generateBlocks } from "../../Helper/BlockGenerator";
import { startWebsocketGameConnection, sendPlacedBlock } from "../../webSocketConnections/webSocketGameInterface";
import Gamefield from "../field/Gamefield";


startWebsocketGameConnection();

export default function GamePage(){
    const [allBlocks, setAllBlocks] = useState(generateBlocks());
  
    return (
        <div class="gamepage">
            <Gamefield/>
            {allBlocks.map((block, index) => (
                <BlockOverview key={index} allBlocks={block}/>
            )
            )}
            <button onClick={() => sendPlacedBlock("green")} > </button>
        </div>
    );
}