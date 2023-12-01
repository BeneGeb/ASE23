import Multiblock from "../Squares/MultiSquare";

function SwitchBlockButton({ direction, onClick }) {
  return (
    <button
      onClick={onClick}
      class={"arrow-selection-button " + direction + "-arrow"}
    ></button>
  );
}

function BlockView({ selectedBlock, currPlayer, color }) {
  return (
    <div class={currPlayer ? "block-view " + color : "block-view"}>
      <Multiblock selectedBlock={selectedBlock} />
    </div>
  );
}

export default function BlockSelector({
  selectedBlock,
  onSwitchBlockClick,
  currPlayer,
  color,
}) {
  return (
    <div class="block-selector">
      <SwitchBlockButton
        direction="left"
        onClick={() => onSwitchBlockClick("left")}
      />
      <BlockView
        selectedBlock={selectedBlock}
        currPlayer={currPlayer}
        color={color}
      />
      <SwitchBlockButton
        direction="right"
        onClick={() => onSwitchBlockClick("right")}
      />
    </div>
  );
}
