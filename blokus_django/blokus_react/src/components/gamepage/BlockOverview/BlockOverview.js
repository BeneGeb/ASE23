import "../../../styles/Gamepage/BlockOverview/blockoverview.css";
import BlockFilter from "./BlockFilter";
import BlockSelector from "./BlockSelector";
import { useState } from "react";

export default function BlockOverview({
  playerData,
  currPlayer,
  onFilterChange,
  onSwitchBlockClick,
}) {
  function handleFilterChange(filterValue) {
    onFilterChange(playerData.player_id, filterValue);
  }

  function handleSwitchBlockClick(direction) {
    onSwitchBlockClick(playerData.player_id, direction);
  }

  return (
    <div
      class={
        currPlayer ? "block-overview " + playerData.color : "block-overview"
      }
    >
      <BlockSelector
        currPlayer={currPlayer}
        selectedBlock={playerData.selectedBlock}
        onSwitchBlockClick={handleSwitchBlockClick}
        color={playerData.color}
      />
      <BlockFilter
        onFilterChange={handleFilterChange}
        selectedFilter={playerData.selectedFilter}
      />
    </div>
  );
}
