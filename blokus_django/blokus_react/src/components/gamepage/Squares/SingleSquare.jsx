export default function SingleSquare({ color, onSquareClick }) {
  return (
    <div
      className={color ? "single-block " + color + "-block" : "empty-square"}
      onClick={onSquareClick}
    >
      <div className={color + "-block-inner"}></div>
    </div>
  );
}
