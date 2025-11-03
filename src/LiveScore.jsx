// LiveScore.jsx
import { useState, useEffect } from "react";
import "./Thunderbolts.css";

export default function LiveScore() {
  const [score, setScore] = useState({ runs: 120, wickets: 3, overs: 15.2 });

  useEffect(() => {
    const interval = setInterval(() => {
      setScore((prev) => ({
        ...prev,
        runs: prev.runs + Math.floor(Math.random() * 6),
        overs: (prev.overs + 0.1).toFixed(1),
      }));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-score">
      <h2>🏆 Live Match</h2>
      <div className="score-box">
        <h3>Thunderbolts</h3>
        <p>
          <strong>{score.runs}/{score.wickets}</strong> ({score.overs} overs)
        </p>
        <span className="blinker">●</span> Live
      </div>
    </div>
  );
}
