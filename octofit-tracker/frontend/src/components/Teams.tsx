import { useEffect, useState } from "react";
import { buildApiUrl, normalizeResponse } from "../api";

function Teams() {
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const response = await fetch(buildApiUrl("teams/"));
        if (!response.ok) {
          throw new Error(`Failed to load teams (${response.status})`);
        }
        const json = await response.json();
        setTeams(normalizeResponse(json));
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
      <h2>Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div>
          {teams.length === 0 ? (
            <p>No teams found.</p>
          ) : (
            <div className="row gy-3">
              {teams.map((team, index) => (
                <div key={team._id ?? index} className="col-12 col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">{team.name ?? "Unnamed team"}</h5>
                      <p className="card-text">{team.description ?? "No description"}</p>
                      <p className="mb-0">Members: {(team.members ?? []).length}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Teams;
