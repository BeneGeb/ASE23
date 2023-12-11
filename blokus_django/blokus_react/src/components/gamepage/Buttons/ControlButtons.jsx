import "../../../styles/Gamepage/Buttons/controlbuttons.css";
export default function ControlButtons({ onSubmit, onRotate, onMirror }) {
  return (
    <div className="control-buttons-container">
      <button
        className="control-button rotate-button"
        onClick={onRotate}
      ></button>
      <button
        className="control-button confirm-button"
        onClick={onSubmit}
      ></button>
      <button
        className="control-button mirror-button"
        onClick={onMirror}
      ></button>
    </div>
  );
}
