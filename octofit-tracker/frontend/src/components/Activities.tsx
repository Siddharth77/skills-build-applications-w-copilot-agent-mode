import React, { useEffect, useState } from "react";
import { buildApiUrl, normalizeResponse } from "../api";

function Activities() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const response = await fetch(buildApiUrl("activities/"));
        if (!response.ok) {
          throw new Error(`Failed to load activities (${response.status})`);
        }
        const json = await response.json();
        setActivities(normalizeResponse(json));
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
      <h2>Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div>
          {activities.length === 0 ? (
            <p>No activities found.</p>
          ) : (
            <div className="list-group">
              {activities.map((activity, index) => (
                <div key={activity._id ?? index} className="list-group-item">
                  <div>
                    <strong>{activity.type ?? "Activity"}</strong> by {activity.user?.name ?? "unknown user"}
                  </div>
                  <div>{activity.durationMinutes ?? 0} min · {activity.caloriesBurned ?? 0} cal</div>
                  <small>{new Date(activity.date ?? Date.now()).toLocaleString()}</small>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Activities;
