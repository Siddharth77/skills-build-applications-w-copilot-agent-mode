import React, { useEffect, useState } from "react";
import { buildApiUrl, normalizeResponse } from "../api";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const response = await fetch(buildApiUrl("leaderboard/"));
        if (!response.ok) {
          throw new Error(`Failed to load leaderboard (${response.status})`);
        }
        const json = await response.json();
        const data = normalizeResponse(json.leaderboard ?? json);
        setLeaderboard(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div>
          {leaderboard.length === 0 ? (
            <p>No leaderboard entries available.</p>
          ) : (
            <ol className="list-group list-group-numbered">
              {leaderboard.map((entry, index) => (
                <li key={entry._id ?? index} className="list-group-item">
                  <div>
                    <strong>{entry._id ?? `Rank ${index + 1}`}</strong>
                  </div>
                  <div>
                    {entry.totalCalories ?? 0} calories, {entry.totalDuration ?? 0} min
                  </div>
                  <small>{entry.activityCount ?? 0} activities</small>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
