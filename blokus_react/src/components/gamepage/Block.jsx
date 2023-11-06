function SingleBlock({color}){
    return(
        <div className={"single-block " + color +"-block"}>
            <div className= {"inner-" + color + "-block"}></div>
        </div>
    )
}

function EmptyBlock(){
    return(
        <div className="empty-block"></div>
    )
}




export default function Multiblock({selecteBlock}){
    const block = selecteBlock.template;
    const color = selecteBlock.color;
    return (
        <div className="multi-block"> 
            <div style={{ position: 'relative' }}>
                {block.map((row, rowIndex) => {
                    return (
                            <div style= {{display:"flex"}}>
                                {row.map((block) => {
                                    return block ? <SingleBlock color={color}/> : <EmptyBlock/> 
                                        })
                                }
                            </div>
                    )
                })}
            </div>
        </div>
    )
}