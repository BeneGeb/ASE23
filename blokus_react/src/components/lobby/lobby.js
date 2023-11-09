import React from 'react';
import PlayerOverviewField from './playerOverview';
import '../../styles/lobby/lobby.css'


const items = ['Item 1', 'Item 2', 'Item 3'];

export default function LobbyPage({items}){
    return (
        <div class="lobby-page">
            <PlayerOverviewField playernamelist={items}/> 
        </div>
    );
}