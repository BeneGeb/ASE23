import * as React from 'react';
import { DragDropContext,Droppable,Draggable } from 'react-beautiful-dnd';

const INITIAL_LIST = [
    {
      id: '1',
      firstName: 'Robin',
      lastName: 'Wieruch',
    },
    {
      id: '2',
      firstName: 'Aiden',
      lastName: 'Kettel',
    },
    {
      id: '3',
      firstName: 'Jannet',
      lastName: 'Layn',
    },
  ];

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };
  
  const Drop = () => {
    const [list, setList] = React.useState(INITIAL_LIST);

    const handleDragEnd = ({ destination, source }) => {
        if (!destination) return;

        setList(reorder(list, source.index, destination.index));
      };


      const Item = ({ index, item, dragItemStyle = {}, children }) => (
        <Draggable index={index} draggableId={item.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              // {...provided.dragHandleProps}
              style={{
                // default item style
                padding: '8px 16px',
                // default drag style
                ...provided.draggableProps.style,
                // customized drag style
                background: snapshot.isDragging
                  ? 'pink'
                  : 'transparent',
                  ...(snapshot.isDragging ? dragItemStyle : {}),
              }}
            >
              {/* {item.firstName} {item.lastName} */}
              {children(item, provided.dragHandleProps)}
            </div>
          )}
        </Draggable>
      );
      
      const List = ({ list, onDragEnd, dragListStyle = {}, ...props }) => (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}   style={{ display: 'flex' }}>
                {list.map((item, index) => (
                  <Item key={item.id} index={index} item={item} {...props}/>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      );
      
  
    return (
        <List
          list={list}
          onDragEnd={handleDragEnd}
          dragItemStyle={{
            background: 'pink',
            borderRadius: '16px',
          }}
          dragListStyle={{
            background: 'lightblue',
            borderRadius: '16px',
          }}
        >
          {(item, dragHandleProps) => (
        <>
          {item.firstName}&nbsp;
          {item.lastName}&nbsp;
          <span {...dragHandleProps}>#</span>
        </>
      )}
        </List>
      );
    };
  
  export default Drop;
  
  