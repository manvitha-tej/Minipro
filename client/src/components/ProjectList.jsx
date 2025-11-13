import React, { useState, useContext, useEffect } from "react";
import { ProjectContext } from "../context/ProjectContext";

export default function ProjectList({ profileId, onBack }) {
  const { projects, fetchProjects, createProject, deleteProject } =
    useContext(ProjectContext);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchProjects(profileId);
  }, [profileId]);

  const handleCreate = async () => {
    if (!title.trim()) return alert("Enter a project title!");

    const formData = new FormData();
    formData.append("profileId", profileId);
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("link", link);
    if (image) formData.append("image", image);

    await createProject(formData);

    setTitle("");
    setDesc("");
    setLink("");
    setImage(null);
  };

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "auto" }}>
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
        ← Back to Profiles
      </button>

      <h2 style={{ textAlign: "center", color: "#1d4ed8", marginBottom: "15px" }}>
        Projects for this Profile
      </h2>

      {/* Create Project Form */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "25px",
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />
        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />
        <input
          type="text"
          placeholder="Project Link (optional)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
          }}
        />

        <button
          onClick={handleCreate}
          style={{
            backgroundColor: "#1d4ed8",
            color: "white",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          + Add Project
        </button>
      </div>

      {/* Project List */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "15px",
        }}
      >
        {projects.length > 0 ? (
          projects.map((p) => (
            <div
              key={p._id}
              style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                padding: "15px",
                textAlign: "center",
              }}
            >
              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
              )}
              <h3 style={{ margin: "5px 0", color: "#1d4ed8" }}>{p.title}</h3>
              <p style={{ fontSize: "0.9rem" }}>{p.description}</p>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "block",
                    color: "#2563eb",
                    textDecoration: "none",
                    marginTop: "8px",
                    fontWeight: "bold",
                  }}
                >
                  🔗 Visit Project
                </a>
              )}
              <button
                onClick={() => deleteProject(p._id)}
                style={{
                  background: "red",
                  color: "white",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                🗑️ Delete
              </button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>
            No projects yet — add one above 👆
          </p>
        )}
      </div>
    </div>
  );
}
