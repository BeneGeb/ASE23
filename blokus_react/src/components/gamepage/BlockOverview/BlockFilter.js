import React from 'react';

function FilterButton({value, selectedButton, onClick}){
    return (
            <button class="filter-button" id={selectedButton == value ? "selected-filter-button": "" } onClick={onClick}>
                <div> {value}</div>
                <div> x</div>
            </button>
    );
}

export default function BlockFilter({onFilterChange, selectedFilter}){
      
        return (
            <div class="block-filter">
                <div class="inner-block-filter"> 
                {Array(5).fill(null).map((item,index) => (
                    <FilterButton key={index} selectedButton={selectedFilter} value={index+1} onClick={() => onFilterChange(index+1)} />
                )) }
                </div>
            </div>
        );
}