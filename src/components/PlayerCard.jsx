import React from "react";

export default function PlayerCard({ player, onClose }) {
  if (!player) return null;

  return (
    <div className="player-card">
      <button className="close-btn" onClick={onClose}>✕</button>
      <div className="player-left">
        <img src={player.image} alt={player.name} />
      </div>
      <div className="player-right">
        <h2>{player.name}</h2>
        <p><strong>Runs:</strong> {player.runs}</p>
        <p><strong>Wickets:</strong> {player.wickets}</p>
        <p><strong>Best Bowling:</strong> {player.bestBowling}</p>
        <p><strong>Top Score:</strong> {player.topScore}</p>
        <p><strong>Matches Played:</strong> {player.matches}</p>
      </div>
    </div>
  );
}
