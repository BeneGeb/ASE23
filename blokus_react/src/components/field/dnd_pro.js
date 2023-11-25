import React, { useState } from 'react';

const DragAndDrop = () => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  const handleDragStart = (e, index) => {
    setDraggedItem({ index });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    const draggedOverItemIndex = index;

    if (draggedItem && draggedOverItemIndex !== draggedItem.index) {
      // Berechne die Position und gib sie aus
      const newPosition = draggedOverItemIndex > draggedItem.index ? draggedOverItemIndex + 1 : draggedOverItemIndex;
      console.log(`Item moved to position ${newPosition}`);
    }
  };

  const handleDrop = (e, index) => {
    e.preventDefault();

    const draggedItemIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    const newItems = [...items];
    newItems.splice(index, 0, newItems.splice(draggedItemIndex, 1)[0]);

    setItems(newItems);
    setDraggedItem(null);
  };

  return (
    <div>
      <h2>Drag and Drop Example</h2>
      <ul>
        {items.map((item, index) => (
          <div className='square'
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            style={{
              background: draggedItem && draggedItem.index === index ? '#efefef' : 'transparent',
            }}
          >
            {item}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default DragAndDrop;
