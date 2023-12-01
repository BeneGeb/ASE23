import SingleSquare from "./SingleSquare";
import { useState } from "react";
import "../../../styles/Gamepage/gamepage.css";

export default function Multiblock({ selectedBlock }) {
  if (!selectedBlock) return <div></div>;
  const block = selectedBlock.template;
  const color = selectedBlock.color;

  return (
    <div className={"multi-block"}>
      <div style={{ position: "relative", backgroundClip: "padding-box" }}>
        {block.map((row) => {
          return (
            <div style={{ display: "flex" }}>
              {row.map((block) => {
                return block ? (
                  <div>
                    <SingleSquare color={color} />
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
