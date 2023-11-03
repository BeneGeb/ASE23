function SwitchBlockButton({direction, onClick}){
    return (
        <button onClick={onClick} class={"arrow-selection-button "+direction+"-arrow"}></button>
    );
}

function BlockView(){
    return (
        <div class="block-view">
        </div>
    );
}

export default function BlockSelector(){

    function onSwitchBlockClick(direction){
        console.log(direction);
    }
    return (
        <div class="block-selector">
            <SwitchBlockButton direction="left" onClick={() => onSwitchBlockClick("left")}/>
             <BlockView />
            <SwitchBlockButton direction="right" onClick={() => onSwitchBlockClick("right")}/>
        </div>
    );
}