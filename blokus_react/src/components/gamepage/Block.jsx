import SingleSquare from "./SingleSquare";
import { useState } from "react";
import "../../styles/Gamepage/gamepage.css";

function EmptySquare() {
  return <div></div>;
}

export default function Multiblock({ selecteBlock }) {
  const block = selecteBlock.template;
  const color = selecteBlock.color;

  return (
    <div className="multi-block">
      <div
        style={{ position: "relative", backgroundClip: "padding-box" }}
        draggable
      >
        {block.map((row, rowIndex) => {
          return (
            <div style={{ display: "flex" }}>
              {row.map((block) => {
                return block ? (
                  <SingleSquare color={color} droppable={false} />
                ) : (
                  <EmptySquare />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
