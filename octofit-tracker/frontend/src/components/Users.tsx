import React, { useEffect, useState } from "react";
import { buildApiUrl, normalizeResponse } from "../api";

function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const response = await fetch(buildApiUrl("users/"));
        if (!response.ok) {
          throw new Error(`Failed to load users (${response.status})`);
        }
        const json = await response.json();
        setUsers(normalizeResponse(json));
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
      <h2>Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div>
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <ul className="list-group">
              {users.map((user, index) => (
                <li key={user._id ?? index} className="list-group-item">
                  <strong>{user.name ?? "Unnamed"}</strong>
                  <div>{user.email ?? "No email"}</div>
                  <small>Role: {user.role ?? "user"}</small>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Users;
