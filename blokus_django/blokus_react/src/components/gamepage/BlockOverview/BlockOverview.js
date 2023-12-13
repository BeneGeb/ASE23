import "../../../styles/Gamepage/BlockOverview/blockoverview.css";
import BlockFilter from "./BlockFilter";
import BlockSelector from "./BlockSelector";
import { useState } from "react";

export default function BlockOverview({
  playerData,
  currPlayer,
  onFilterChange,
  onSwitchBlockClick,
  surrendered,
}) {
  function handleFilterChange(filterValue) {
    onFilterChange(playerData.player_id, filterValue);
  }

  function handleSwitchBlockClick(direction) {
    onSwitchBlockClick(playerData.player_id, direction);
  }

  let newClassName = currPlayer
    ? "block-overview " + playerData.color
    : "block-overview";
  if (surrendered) {
    newClassName += " surrendered-overview";
  }

  return (
    <div className={newClassName}>
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
