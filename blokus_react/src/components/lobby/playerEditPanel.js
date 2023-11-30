import React, {useState} from 'react';
import {SingleBlocks} from './playerOverview.js';
import '../../styles/lobby/playerEditPanel.css'


function NameInput({name}){
    return(
        <input type="text" id="playername" name="playername" className='player-name-edit' defaultValue={name}></input>
    );
}

const CheckBoxColor = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className='color-box'>
      <div className='div-radio-red'>
        <input
          type="radio"
          value = "#FF0000"
          checked={selectedOption === "#FF0000"}
          onChange={handleOptionChange}
        />
      </div>
      <div className='div-radio-blue'>
        <input
          type="radio"
          value = "#0000FF" 
          checked={selectedOption === "#0000FF"}
          onChange={handleOptionChange}
        />
      </div>
      <div className='div-radio-green'>
        <input
          type="radio"
          value = "#00FF00" 
          checked={selectedOption === "#00FF00"}
          onChange={handleOptionChange}
        />
      </div>
      <div className='div-radio-yellow'>
        <input
          type="radio"
          value = "#FFFF00" 
          checked={selectedOption === "#FFFF00"}
          onChange={handleOptionChange}
        />
      </div>
    </div>
  );
}

const ColorPicker = (defaultcolor) => {
    const [selectedColor, setSelectedColor] = useState(defaultcolor);
  
    const handleColorChange = (color) => {
      setSelectedColor(color);
    };

    return (
        <CheckBoxColor/>
    );
};

export default function PlayerEditField({playername, playercolor}){
    return(
        <div className='parent-div-edit'>
           <h1 className='headline-edit'> Personal Settings</h1>
           <NameInput name={playername}/>
           <div className='div-blockus-block'>
                <ColorPicker defaultcolor={playercolor}/>
           </div>
           <div className='button-div-edit'>
                <button type="button" className='confirmation-button'>set</button>
            </div>
        </div>
    );
}
