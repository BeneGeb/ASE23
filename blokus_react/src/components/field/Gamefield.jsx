import React, { useState } from "react";
import "../../styles/field/dnd.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SingleSquare from "../gamepage/SingleSquare";

const GameField = ({ squaresArray }) => {
  // function handleDropSquare(index, color) {
  //   let newSquaresArray = [...squaresArray];
  //   newSquaresArray[index] = color;
  //   setsquaresArray(newSquaresArray);
  // }

  return (
    <div className="inner-game-field">
      {squaresArray.map((value, index) => (
        <SingleSquare key={index} fieldIndex={index} color={value} />
      ))}
    </div>
  );
};
export default GameField;
