import React, {useState} from 'react';
import '../../styles/lobby/playerOverview.css'

function PlayerNameField({name}){
    return (
            <div className='player-field'>
                <h1 className='player-name'>{name}</h1>
            </div>
    );
}

function ReadyButton(){
    return(
        <div className='ready-button-container'>
            <h1 className='ready-button'>Ready</h1>
        </div>
    );
}

function SingleBlocks(){
    return(
        <div className='outer-blockus-block'>
            <div className='inner-blockus-block'></div>
        </div>
    );
}

const CheckBoxReady = () => {
    const [isChecked, setIsChecked] = useState(false);
  
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);S
    };

    return (
      <div className='check-box'>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </div>
    );
}

export default function playerOverviewField({playernamelist}){
    return(
        <div className='parent-div'>
            <div className='header-div'>
                <h1>Player</h1>
                <h1>Color</h1>
            </div>
            <div className='playername-div'>
                {playernamelist.map((item, index) =>(   
                    <PlayerNameField name={item}/>
                ))}
            </div>
            <div className='block-div'>
                {playernamelist.map(() =>(   
                    <SingleBlocks/>
                ))}
            </div>
            <div className='checkbox_div'>
                {playernamelist.map(() => (
                    <CheckBoxReady />
                ))}   
            </div>
            <ReadyButton/>
        </div>
    );
}

