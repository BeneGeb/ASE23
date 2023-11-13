import '../../styles/Gamepage/gamepage.css'
import { useState } from 'react';

const draggables = [
    {
      id: "1",
    },
    {
      id: "2",
    },
    {
      id: "3",
    },
  ];
  
  const Dnd = () => {
    return (
      <DragAndDrop draggables={draggables} />
    );
  };
  
  export default Dnd;
  