import { useEffect, useState } from "react";
import { buildApiUrl, normalizeResponse } from "../api";

function Workouts() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const response = await fetch(buildApiUrl("workouts/"));
        if (!response.ok) {
          throw new Error(`Failed to load workouts (${response.status})`);
        }
        const json = await response.json();
        setWorkouts(normalizeResponse(json));
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
      <h2>Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div>
          {workouts.length === 0 ? (
            <p>No workouts found.</p>
          ) : (
            <div className="row gy-3">
              {workouts.map((workout, index) => (
                <div key={workout._id ?? index} className="col-12 col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">{workout.name ?? "Workout"}</h5>
                      <p className="card-text">{workout.description ?? "No description"}</p>
                      <p className="mb-1">Difficulty: {workout.difficulty ?? "unknown"}</p>
                      <p className="mb-0">Duration: {workout.durationMinutes ?? 0} min</p>
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

export default Workouts;
