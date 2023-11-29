import SingleSquare from "./SingleSquare";
import { useState } from "react";
import "../../styles/Gamepage/gamepage.css";

export default function Multiblock({ selecteBlock }) {
  const block = selecteBlock.template;
  const color = selecteBlock.color;
  const clickedSquareIndex = { rowIndex: 0, columnIndex: 0 };
  const [dragged, setDragged] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("color", color);
    setDragged(true);
    // console.log(
    //   selecteBlock.getRelativeSquares(
    //     clickedSquareIndex.columnIndex,
    //     clickedSquareIndex.rowIndex
    //   )
    // );
    //console.log(block.getRelativePosition(rowIndex, columnIndex));
  };

  const handleDragStop = (e) => {
    setDragged(false);
  };

  const handleMouseDownSquare = (columnIndex, rowIndex) => {
    clickedSquareIndex.rowIndex = rowIndex;
    clickedSquareIndex.columnIndex = columnIndex;
    console.log(clickedSquareIndex);
    console.log(selecteBlock);
  };

  return (
    <div className={"multi-block" + dragged ? "dragged" : ""}>
      <div
        style={{ position: "relative", backgroundClip: "padding-box" }}
        draggable
        onDragStart={(e) => handleDragStart(e)}
        onDragEnd={(e) => handleDragStop(e)}
      >
        {block.map((row, columnIndex) => {
          return (
            <div style={{ display: "flex" }}>
              {row.map((block, rowIndex) => {
                return block ? (
                  <div>
                    <SingleSquare
                      color={color}
                      droppable={false}
                      onMouseDownSquare={(e) =>
                        handleMouseDownSquare(rowIndex, columnIndex)
                      }
                    />
                  </div>
                ) : (
                  <div className="fill-square"> </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
