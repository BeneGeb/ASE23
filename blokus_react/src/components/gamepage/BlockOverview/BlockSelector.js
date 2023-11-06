import Multiblock from "../Block";
import {useState} from "react";


function SwitchBlockButton({direction, onClick}){
    return (
        <button onClick={onClick} class={"arrow-selection-button "+direction+"-arrow"}></button>
    );
}


function BlockView({selectedBlock}){
    return (
        <div class="block-view">
            <Multiblock selecteBlock={selectedBlock}/>
        </div>
    );
}

export default function BlockSelector({selectedBlocks, onSwitchBlockClick}){
    return (
        <div class="block-selector">
            <SwitchBlockButton direction="left" onClick={() => onSwitchBlockClick("left")}/>
             <BlockView selectedBlock={selectedBlocks} />
            <SwitchBlockButton direction="right" onClick={() => onSwitchBlockClick("right")}/>
        </div>
    );
}