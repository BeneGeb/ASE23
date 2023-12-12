import "../../../styles/Gamepage/Buttons/controlbuttons.css";
export default function SurrChatButtons({ onSurrender, onChat }) {
  return (
    <div className="control-buttons-container">
      <button className="control-button chat-button" onClick={onChat}></button>
      <button
        className="control-button surrender-button"
        onClick={() => onSurrender()}
      ></button>
    </div>
  );
}
