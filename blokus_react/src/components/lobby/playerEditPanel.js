import React from 'react';
import {SingleBlocks} from './playerOverview.js';
import '../../styles/lobby/playerEditPanel.css'


function NameInput({name}){
    return(
        <input type="text" id="playername" name="playername" className='player-name-edit' defaultValue={name}></input>
    );
}

function ColorPicker(){
    return(
        <div className='color-picker'> 

        </div>    
     );
}

export default function PlayerEditField({playername, playercolor}){
    return(
        <div className='parent-div-edit'>
           <h1 className='headline-edit'> Personal Settings</h1>
           <NameInput name={playername}/>
           <div className='div-blockus-block'>
            <   SingleBlocks blockColor={playercolor}/>
           </div>
           <ColorPicker/>
        </div>
    );
}
