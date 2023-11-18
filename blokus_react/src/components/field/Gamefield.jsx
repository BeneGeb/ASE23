import React, { useState } from "react";
import "../../styles/field/dnd.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SingleSquare from "../gamepage/SingleSquare";

const GameField = () => {
  const [squaresArray, setsquaresArray] = useState(
    Array.from({ length: 400 }, (v, i) => null)
  );

  function handleDropSquare(index, color) {
    let newSquaresArray = [...squaresArray];
    newSquaresArray[index] = color;
    setsquaresArray(newSquaresArray);
  }

  return (
    <div className="inner-game-field">
      {squaresArray.map((value, index) => (
        <SingleSquare
          droppable={true}
          key={index}
          index={index}
          handleDropSquare={handleDropSquare}
          color={value}
        />
      ))}
    </div>
  );
};
export default GameField;
