export default function SingleSquare({
  color,
  droppable,
  handleDropSquare,
  index,
}) {
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  //Alle Blöcke die dazu gehörnen
  //welcher Block von allen bist du
  const handleDrop = (e) => {
    e.preventDefault();
    const draggedItemColor = e.dataTransfer.getData("color");
    handleDropSquare(index, draggedItemColor);
    console.log(index);
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("color", color);
  };

  if (droppable) {
    return (
      <div
        className={color ? "single-block " + color + "-block" : "empty-square"}
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e)}
      >
        <div className={"inner-" + color + "-block"}></div>
      </div>
    );
  } else {
    return (
      <div
        className={color ? "single-block " + color + "-block" : "empty-square"}
        onDragStart={(e) => handleDragStart(e)}
      >
        <div className={"inner-" + color + "-block"}></div>
      </div>
    );
  }
}
