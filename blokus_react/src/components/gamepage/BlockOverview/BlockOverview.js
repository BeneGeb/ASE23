import '../../../styles/Gamepage/BlockOverview/blockoverview.css'
import BlockFilter from './BlockFilter';
import BlockSelector from './BlockSelector';
import { useState } from 'react';


export default function BlockOverview({allBlocks, currPlayer, color}){
    const [selectedFilter, setSelectedFilter] = useState(1);
    const [selectedBlockIndex, setSelectedBlockIndex] = useState(0);

    
    const filteredBlocks = allBlocks.filter(block => block.getSize() === selectedFilter);

    function onFilterChange(filterValue){
        setSelectedFilter(filterValue);
        setSelectedBlockIndex(0);
    }

    function onSwitchBlockClick(direction){
        if(direction === "left"){
            let newIndex = selectedBlockIndex - 1;
            if(newIndex < 0){
                newIndex = filteredBlocks.length - 1;
            }
            setSelectedBlockIndex(newIndex);
        }else{
            let newIndex = selectedBlockIndex + 1;
            if(newIndex >= filteredBlocks.length){
                newIndex = 0;
            }
            setSelectedBlockIndex(newIndex);
        }
        
    }

    return (
        <div class={currPlayer? "block-overview " + color: "block-overview"}>
            <BlockSelector currPlayer={currPlayer} selectedBlocks={filteredBlocks[selectedBlockIndex]} onSwitchBlockClick={onSwitchBlockClick} color={color}/>
            <BlockFilter onFilterChange={onFilterChange} selectedFilter={selectedFilter} />
        </div>
    );
}