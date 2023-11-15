import React, {useState} from 'react';
import '../../styles/lobby/playerOverview.css'

function PlayerNameField({name}){
    return (
            <div className='player-field'>
                <h1 className='player-name'>{name}</h1>
            </div>
    );
}

export function SingleBlocks({blockColor}){
    return(
        <div className='outer-blockus-block' style = {{backgroundColor: blockColor, border : "3px solid rgba(105,105,105, 0.3)" }}>
            <div className='inner-blockus-block' style = {{ backgroundColor: blockColor, border: "3px solid rgba(105,105,105,0.3)" }}></div>
        </div>
    );
}

const CheckBoxReady = () => {
    const [isChecked, setIsChecked] = useState(false);
  
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
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

export default function PlayerOverviewField({playernamelist, colorlist}){
    return(
        <div className='parent-div'>
            <div className='header'>
                <h1 className='headline'>Player</h1>
                <h1 className='headline'>Color</h1>
                <div className='placeholder-div-header'></div>
            </div>
            <div className='content-div'>
                {playernamelist.map((items, index) =>(   
                    <div className='row-element'> 
                        <PlayerNameField name={items}/>
                        <SingleBlocks blockColor={colorlist[index]}/>
                        <CheckBoxReady />
                    </div>
                ))}
            </div>
            <div className='button-div'>
                <button type="button" className='ready-button'>Ready</button>
                <div className='placeholder-div'></div>
            </div>
        </div>
    );
}

