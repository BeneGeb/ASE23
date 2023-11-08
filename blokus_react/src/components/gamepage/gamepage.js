import BlockOverview from "./BlockOverview/BlockOverview";
import '../../styles/Gamepage/gamepage.css'
import { useState } from 'react';
import { generateBlocks } from "../../Helper/BlockGenerator";




export default function GamePage(){
    const [allBlocks, setAllBlocks] = useState(generateBlocks());
  
    return (
        <div class="gamepage">
            {allBlocks.map((block, index) => (
                <BlockOverview key={index} allBlocks={block}/>
            )
            )}
        </div>
    );
}