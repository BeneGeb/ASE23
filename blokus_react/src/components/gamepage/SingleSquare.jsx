export default function SingleSquare({ color, onMouseDownSquare, fieldBlock }) {
  if (fieldBlock) {
    return (
      <div
        className={color ? "single-block " + color + "-block" : "empty-square"}
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
