import React, { useState } from "react";
import "../../../styles/Gamepage/field.css";
import SingleSquare from "../SingleSquare";

const GameField = ({ squaresArray, markedFields }) => {
  return (
    <div className="inner-game-field">
      {squaresArray.map((value, index) => (
        <SingleSquare
          key={index}
          fieldIndex={index}
          color={markedFields.includes(index) ? "marked" : value}
        />
      ))}
    </div>
  );
};
export default GameField;
