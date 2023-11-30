import React, { useState } from "react";
import "../../../styles/Gamepage/field.css";
import SingleSquare from "../SingleSquare";
import { isIndexInArrayOfArray } from "../../../Helper/ArrayHelper";

const GameField = ({
  squaresArray,
  markedFields,
  onSquareClick,
  placedBlock,
  selectionColor,
}) => {
  return (
    <div className="inner-game-field">
      {squaresArray.map((color, index) => {
        let styling = "";
        if (placedBlock.includes(index)) styling = "placed " + selectionColor;
        else if (isIndexInArrayOfArray(index, markedFields)) styling = "marked";
        else styling = color;

        return (
          <SingleSquare
            key={index}
            color={styling}
            onSquareClick={() => onSquareClick(index)}
          />
        );
      })}
    </div>
  );
};
export default GameField;
