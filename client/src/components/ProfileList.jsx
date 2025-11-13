import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";

export default function ProfileList({ folderId, onBack, onSelectProfile }) {
  const { profiles, fetchProfiles, createProfile, deleteProfile } =
    useContext(ProfileContext);
  const [newProfile, setNewProfile] = useState("");

  useEffect(() => {
    fetchProfiles(folderId);
  }, [folderId]);

  const handleCreate = () => {
    if (!newProfile.trim()) return;
    createProfile({ name: newProfile, folderId });
    setNewProfile("");
  };

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "auto" }}>
      <button
        onClick={onBack}
        style={{
          backgroundColor: "#e5e7eb",
          padding: "6px 12px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Back to Folders
      </button>

      <h2 style={{ textAlign: "center", color: "#1d4ed8", marginBottom: "15px" }}>
        Profiles in this Folder
      </h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Profile Name (e.g. Designer, Developer)"
          value={newProfile}
          onChange={(e) => setNewProfile(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />
        <button
          onClick={handleCreate}
          style={{
            backgroundColor: "#1d4ed8",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          + Add Profile
        </button>
      </div>

      <div>
        {profiles.length > 0 ? (
          profiles.map((p) => (
            <div
              key={p._id}
              style={{
                background: "white",
                borderRadius: "8px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                marginBottom: "10px",
                padding: "12px 16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => onSelectProfile(p._id)}
              >
                {p.name}
              </span>
              <button
                onClick={() => deleteProfile(p._id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "red",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
              >
                🗑️
              </button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>
            No profiles yet — add one above 👆
          </p>
        )}
      </div>
    </div>
  );
}
