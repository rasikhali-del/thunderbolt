import { useParams, useNavigate } from "react-router-dom";

export default function PlayerPage({ players }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const player = players.find((p) => p.id === parseInt(id));

  if (!player) return <p>Player not found</p>;

  return (
    <div className="player-page container">
      <button onClick={() => navigate(-1)} className="btn secondary">← Back</button>
      <div className="player-details">
        <div className="player-photo">
          <img src={player.photo} alt={player.name} />
        </div>
        <div className="player-info">
          <h2>{player.name}</h2>
          <h4>{player.role}</h4>
          <p>{player.bio}</p>
        </div>
      </div>
    </div>
  );
}
