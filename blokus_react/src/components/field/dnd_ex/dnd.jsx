import React, { useState } from 'react';
import '../../styles/field/dnd.css';

const Dnd = () => {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDragStart = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragEnd = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        backgroundColor: dragging ? 'red' : 'blue',
        width: '100px',
        height: '100px',
      }}
    />
  );
};

export default Dnd;
