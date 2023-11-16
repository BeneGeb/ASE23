import React, { useState } from 'react';
import '../../styles/field/dnd.css';

const Dnd = () => {
  // const [dragging, setDragging] = useState(false);
  // const [position, setPosition] = useState({ x: 0, y: 0 });

  // const handleDragStart = (e) => {
  //   e.preventDefault();
  //   setDragging(true);
  // };

  // const handleDragEnd = (e) => {
  //   e.preventDefault();
  //   setDragging(false);
  // };

  // const handleDragOver = (e) => {
  //   e.preventDefault();
  //   setPosition({ x: e.clientX, y: e.clientY });
  // };
  const draggables = document.querySelectorAll('.draggable')
  const containers = document.querySelectorAll('.container')
  
  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging')
    })
  
    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging')
    })
  })
  
  containers.forEach(container => {
    container.addEventListener('dragover', e => {
      e.preventDefault()
      const afterElement = getDragAfterElement(container, e.clientY)
      const draggable = document.querySelector('.dragging')
      if (afterElement == null) {
        container.appendChild(draggable)
      } else {
        container.insertBefore(draggable, afterElement)
      }
    })
  })
  
  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
  
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect()
      const offset = y - box.top - box.height / 2
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child }
      } else {
        return closest
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element
  }



  return (
    <div className='app'>
      <div className='container'>
        <p className='draggable' draggable='true'>Drag the box around!</p>
        <p className='draggable' draggable='true'>Drag the box around! 2</p>
      </div>
      <div className='container'>
        <p className='draggable' draggable='true'>Drag the box around!3</p>
        <p className='draggable' draggable='true'>Drag the box around! 4</p>
      </div>
    </div>
   
  );
};

export default Dnd;
