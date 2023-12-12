import "../../../styles/Gamepage/winneroverview.css";
import SingleSquare from "../Squares/SingleSquare";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WinnerOverview({ playerData, allBlocks }) {
  const [winnerList, setWinnerList] = useState([]);
  const navigate = useNavigate();

  function getScore(player) {
    const playerBlocks = allBlocks.get(
      playerData.find((playerData) => playerData.player_id == player.player_id)
        .color
    );

    let score = 0;
    playerBlocks.forEach((block) => {
      score += block.getSize();
    });
    return score;
  }

  function getAllScores() {
    let newWinnerList = [];
    playerData.forEach((player) => {
      newWinnerList.push({
        player_name: player.player_name,
        color: player.color,
        score: getScore(player),
      });
    });
    newWinnerList.sort((a, b) => a.score - b.score);

    let currentRank = 1;
    let currentScore = newWinnerList[0].score;

    newWinnerList.forEach((player, index) => {
      if (index > 0 && player.score !== currentScore) {
        // Wenn der Score sich ändert, aktualisiere den Rang und den aktuellen Score
        currentRank = index + 1;
        currentScore = player.score;
      }
      player.rank = currentRank;
    });

    setWinnerList(newWinnerList);
  }

  useEffect(() => {
    getAllScores();

    return () => {};
  }, []);

  return (
    <div className="winner-overview-container">
      <div className="winner-overview">
        <div className="winner-overview-title">Ranking Overview</div>

        <div className="winner-overview-allplayers">
          {winnerList.map((player) => (
            <WinnerOverviewPlayer player={player} />
          ))}
        </div>
        <div className="winner-overview-allbuttons">
          <button
            className="winner-overview-button"
            onClick={() => navigate("/lobby")}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}

function WinnerOverviewPlayer({ player }) {
  return (
    <div className="winner-overview-player">
      <div className="winner-overview-player-rank">
        {player.rank}. <SingleSquare color={player.color} />
      </div>

      <div className="winner-overview-player-name">{player.player_name}</div>
      <div className="winner-overview-player-score">{player.score}</div>
    </div>
  );
}
