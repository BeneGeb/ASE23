import React, { useState } from 'react';
import '../../styles/field/dnd.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
    const Square = () => (
        <div className="square"></div>
    );

    const blocks = Array.from({ length: 400 }, (_, index) => ({ id: index + 1, color: 'green' }));
    const SortableUser = ({ id, color }) => {
        return (
        <Draggable id={id}>
            <div className="blocki" style={{ backgroundColor: 'black' }} />
        </Draggable>
        );
    }

  const GameFieldBuild = () => {
    // Erstelle ein Array mit 400 Elementen, um 20 mal 20 Quadrate zu erstellen
    //<DragDropContext></DragDropContext>
    const squaresArray = Array.from({ length: 400 }, (v, i) => i);

    const onDragEnd = (event) => {
        console.log('onDrag',event);
    };
  
    return (
        <div className='app'>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='game-field'>
                    {(provided) => (
                        <div
                            className='game-field'
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <>
                                {squaresArray.map((index) => (
                                    <Square key={index} />
                                ))}
                                {provided.placeholder}
                            </>
                        </div>
                    )}
                </Droppable>
                <div className='blocki'>
                    {blocks.map((block) => (
                        <SortableContext
                            key={block.id}
                            items={[block.id]}
                            strategy={verticalListSortingStrategy}
                        >
                            <SortableUser id={block.id} color={block.color} />
                        </SortableContext>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
  };
const Gamefield = () => (
   
<div className="app">
    <div>
    <GameFieldBuild />
    </div>

  </div>
 
);


export default Gamefield;