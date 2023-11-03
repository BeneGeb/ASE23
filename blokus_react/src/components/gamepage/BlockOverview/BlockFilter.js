import React from 'react';

function FilterButton({value, selectedButton, onClick}){
    return (
            <button class="filter-button" id={selectedButton == value ? "selected-filter-button": "" } onClick={onClick}>
                <div> {value}</div>
                <div> x</div>
            </button>
    );
}

export default function BlockFilter(){
        const [selectedButton, setSelectedButton] = React.useState(1);
        
        function onSelectionButtonClick(buttonValue){
            setSelectedButton(buttonValue);
        }

        return (
            <div class="block-filter">
                <div class="inner-block-filter"> 
                {Array(5).fill(null).map((item,index) => (
                    <FilterButton key={index} selectedButton={selectedButton} value={index+1} onClick={() => onSelectionButtonClick(index+1)} />
                )) }
                </div>
            </div>
        );
}