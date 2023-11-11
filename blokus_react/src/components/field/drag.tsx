import { useState } from "react";
import * as React from "react";
import '../../styles/field/dnd.css';

function Drag() {
    const [widgets, setWidgets] = useState<string[]>([]);

    function handleOnDrag(e: React.DragEvent, widgetType: string){
        e.dataTransfer.setData("widgetType", widgetType);
       
    };

        function handleOnDrop(e: React.DragEvent){
            const widgetType = e.dataTransfer.getData("widgetType") as string;
            console.log("widgetType", widgetType);
            setWidgets([...widgets, widgetType]);
        };

        function handleOnDragOver(e: React.DragEvent){
            e.preventDefault();
        };

        return(
            <div>
                <div>
                <div className="draggable" draggable onDragStart={(e) => handleOnDrag(e, "Quadrat A")}>
                Quadrat A
                </div>
                <div className="draggable" draggable onDragStart={(e) => handleOnDrag(e, "Quadrat B")}>
                Quadrat B
                </div>
                <div className="draggable" draggable onDragStart={(e) => handleOnDrag(e, "Quadrat C")}>
                Quadrat C
                </div>
                </div>
                <div className="droppable" onDrop={handleOnDrop} onDragOver={handleOnDragOver}>
                    {widgets.map((widget, index) => (
                        <div key={index}>
                            {widget}</div>
                    ))}
                    </div>
            </div>
        )
    };

    export default Drag;
