import React, {useState} from 'react';
import '../../styles/lobby/playerOverview.css'
import { sendIfPlayerReady } from '../../webSocketConnections/webSocketLobby';

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

const CheckBoxReady = ({ player_id, isReady }) => {
    const [isChecked, setIsChecked] = useState(isReady);
    
    const handleCheckboxChange = () => {
      const newCheckedState = !isChecked;
      setIsChecked(newCheckedState);
      sendIfPlayerReady(player_id, newCheckedState);
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
};

export default function PlayerOverviewField({playerlist}){
    return(
        <div className='parent-div'>
            <div className='header'>
                <h1 className='headline'>Player</h1>
                <h1 className='headline'>Color</h1>
                <div className='placeholder-div-header'></div>
            </div>
            <div className='content-div'>
                {playerlist.map((player, index) =>(   
                    <div className='row-element'> 
                        <PlayerNameField name={player.player_name}/>
                        <SingleBlocks blockColor={player.color}/>
                        <CheckBoxReady player_id={player.player_id} isReady={player.isReady}/>
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

