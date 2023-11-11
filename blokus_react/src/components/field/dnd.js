import React, { useState } from 'react';
import '../../styles/field/dnd.css';


const DragAndDrop = ({ draggables }) => {
  const [droppable, setDroppable] = React.useState(false);

  const handleDragStart = (event) => {
    event.dataTransfer.setData("text", event.target.id);
  };

  const handleDragOver = (event) => {
    event.preventDefault();

    if (droppable) {
      event.target.style.backgroundColor = "lightgreen";
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();

    if (droppable) {
      event.target.style.backgroundColor = "green";
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const draggableId = event.dataTransfer.getData("text");

    // Den draggable mit dem übergebenen ID aus der Liste der draggables entfernen
    draggables.splice(draggables.findIndex((draggable) => draggable.id === draggableId), 1);

    // Den draggable in das droppable Element einfügen
    event.target.appendChild(draggables[draggables.length - 1]);

    // Die Farbe des droppable Elements zurücksetzen
    event.target.style.backgroundColor = "green";
  };

  return (
    <div>
      {draggables.map((draggable) => (
        <div
          key={draggable.id}
          className="draggable"
          id={draggable.id}
          onDragStart={handleDragStart}
        >
          {draggable.id}
        </div>
      ))}
      <div
        className="game-board"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      />
      <div className='game-board::before'>

      </div>
    </div>
  );
};

export default DragAndDrop;
