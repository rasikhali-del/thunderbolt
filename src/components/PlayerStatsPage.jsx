import { useParams, useNavigate } from "react-router-dom";
import "../Thunderbolts.css";

export default function PlayerStatsPage({ matches, players }) {
  const { playerName } = useParams();
  const navigate = useNavigate();

  // Find player by name (exact match with hyphen conversion)
  const player = players.find(p => 
    playerName.toLowerCase().replace(/-/g, ' ') === p.name.toLowerCase()
  );
  // Get all matches where this player appears as opponent or top performer
  const playerMatches = matches.filter(m => 
    m.opponent?.toLowerCase() === player?.name.toLowerCase() ||
    (player && m.topPerformer && m.topPerformer.toLowerCase().includes(player.name.toLowerCase()))
  );
  // Get matches where player is opponent (their own performance)
  const playerOwnMatches = matches.filter(m => 
    m.opponent?.toLowerCase() === player?.name.toLowerCase()
  );

  // Calculate player statistics
  const totalRuns = playerOwnMatches.reduce((sum, m) => sum + (parseInt(m.runs) || 0), 0);
  const totalWickets = playerOwnMatches.reduce((sum, m) => sum + (parseInt(m.wickets) || 0), 0);
  const matchesPlayed = playerOwnMatches.length;
  const averageRuns = matchesPlayed > 0 ? (totalRuns / matchesPlayed).toFixed(2) : 0;
  
  // Find best performance
  const bestPerformance = playerMatches.reduce((best, m) => {
    if (!best || (parseInt(m.runs) || 0) > (parseInt(best.runs) || 0)) {
      return m;
    }
    return best;
  }, null);

  if (!player) {
    return (
      <div className="player-stats-page container">
        <button onClick={() => navigate(-1)} className="btn secondary">← Back</button>
        <p>Player not found</p>
      </div>
    );
  }

  return (
    <div className="player-stats-page container">
      <button onClick={() => navigate(-1)} className="btn secondary">← Back to Match Stats</button>
      
      <div className="player-stats-layout">
        {/* Left side - Player Picture */}
        <div className="player-photo-section">
          <div className="player-photo-container">
            <img 
              src={player.photo} 
              alt={player.name}
              className="player-large-photo"
            />
          </div>
          <div className="player-basic-info">
            <h1>{player.name}</h1>
            <h3>{player.role}</h3>
            <p>{player.bio}</p>
          </div>
        </div>

        {/* Right side - Player Statistics */}
        <div className="player-stats-section">
          <h2>Performance Statistics</h2>
          
          <div className="stats-overview">
            <div className="stat-card">
              <h4>Total Runs</h4>
              <p className="stat-number">{totalRuns}</p>
            </div>
            <div className="stat-card">
              <h4>Total Wickets</h4>
              <p className="stat-number">{totalWickets}</p>
            </div>
            <div className="stat-card">
              <h4>Average Runs</h4>
              <p className="stat-number">{averageRuns}</p>
            </div>
          </div>

          <div className="best-performance">
            <h3>Best Performance</h3>
            {bestPerformance ? (
              <div className="performance-card">
                <p><strong>Runs:</strong> {bestPerformance.runs}</p>
                <p><strong>Wickets:</strong> {bestPerformance.wickets}</p>
                <p><strong>Best Bowling:</strong> {bestPerformance.result}</p>
                <p><strong>Match #{bestPerformance.id}</strong></p>
              </div>
            ) : (
              <p>No performance data available</p>
            )}
          </div>

          <div className="match-history">
            <h3>Match History</h3>
            <div className="matches-list">
              {playerMatches.length > 0 ? (
                playerMatches.map((match) => (
                  <div key={match.id} className="match-summary">
                    <div className="match-header">
                      <span className="match-number">Match #{match.id}</span>
                      <span className="match-result">{match.result}</span>
                    </div>
                    <div className="match-stats">
                      <span className="runs">Runs: {match.runs}</span>
                      <span className="wickets">Wickets: {match.wickets}</span>
                      <span className="top-performer">Top: {match.topPerformer}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No match history available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
