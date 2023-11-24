export default function SingleSquare({
  color,
  droppable,
  handleDropSquare,
  fieldIndex,
  onMouseDownSquare,
}) {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedItemColor = e.dataTransfer.getData("color");
    handleDropSquare(fieldIndex, draggedItemColor);
    console.log(fieldIndex);
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
        onMouseDown={onMouseDownSquare}
      >
        <div className={"inner-" + color + "-block"}></div>
      </div>
    );
  }
}
