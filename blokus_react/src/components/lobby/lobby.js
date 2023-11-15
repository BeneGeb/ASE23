import React from 'react';
import PlayerOverviewField from './playerOverview';
import PlayerEditField from './playerEditPanel';
import '../../styles/lobby/lobby.css'

export default function LobbyPage({items, colors, playername, playercolor}){
    return (
        <div class="lobby-page">
            <div className='upper-divs'>
                <PlayerOverviewField playernamelist={items} colorlist={colors}/> 
                <PlayerEditField playername={playername} playercolor={playercolor}/>
            </div>
            <div className='chat-div'>

            </div>
        </div>
    );
}