import React, { useState } from 'react';
import '../../styles/field/dnd.css';
const Square = ({index,handleDropSquare,color}) => {

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleDropSquare();
  };
  return (
    <div
      className={color ? color + '-square' : 'empty-square'}
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e)}
    ></div>
  );
};
  
const GameFieldBuild = () => {
    // Erstelle ein Array mit 400 Elementen, um 20 mal 20 Quadrate zu erstellen
    const [squaresArray, setsquaresArray] = useState(Array.from({ length: 400 }, (v, i) => null));
    function handleDropSquare(index){
      console.log('drop');
      console.log(index);
      console.log(squaresArray);
      let newSquaresArray = [...squaresArray];
      newSquaresArray[index] = 'red';
      setsquaresArray(newSquaresArray);
    
    }
  
    return (
      <div className="game-field">
        {squaresArray.map((value,index) => (
          <Square key={index} index ={index} handleDropSquare ={()=>handleDropSquare(index)} color = {value}/>
        ))}
      </div>
    );
  };
  
const Gamefield = () => {
  const [draggedItem, setDraggedItem] = useState(null);
  
  const handleDragStart = (e, index) => {
    setDraggedItem({ index });
  };
  return(
   
<div className='fieldApp'>
    <div>
    <GameFieldBuild />
    </div>
    <div className='block-overview'>
        <div className='blocki'
            draggable
            onDragStart={(e) => handleDragStart(e, 0)}
              ></div>
    </div>

</div>
  );
 
};


export default Gamefield;