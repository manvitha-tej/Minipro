import React, { useContext, useState } from "react";
import { FolderContext } from "../context/FolderContext";

export default function FolderList({ onSelectFolder }) {
  const { folders, createFolder, renameFolder, deleteFolder } = useContext(FolderContext);
  const [newFolder, setNewFolder] = useState("");
  const [editingFolder, setEditingFolder] = useState(null);
  const [editedName, setEditedName] = useState("");

  const handleCreate = () => {
    if (!newFolder.trim()) return;
    createFolder(newFolder);
    setNewFolder("");
  };

  const handleRename = (id) => {
    renameFolder(id, editedName);
    setEditingFolder(null);
  };

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "auto" }}>
      <h1 style={{
        textAlign: "center",
        color: "#1d4ed8",
        marginBottom: "20px"
      }}>
        Adralli Portfolio Manager 🚀
      </h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter new folder name..."
          value={newFolder}
          onChange={(e) => setNewFolder(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px"
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
            cursor: "pointer"
          }}
        >
          + Create
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {folders.map((folder) => (
          <li key={folder._id}
              style={{
                background: "white",
                padding: "12px 16px",
                borderRadius: "8px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer"
              }}>
            {editingFolder === folder._id ? (
              <>
                <input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "6px",
                    border: "1px solid #ccc",
                    borderRadius: "6px"
                  }}
                />
                <button onClick={() => handleRename(folder._id)}>Save</button>
              </>
            ) : (
              <>
                <span onClick={() => onSelectFolder(folder._id)}>
                  📁 {folder.name}
                </span>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => {
                      setEditingFolder(folder._id);
                      setEditedName(folder.name);
                    }}
                    style={{ border: "none", background: "none", cursor: "pointer" }}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteFolder(folder._id)}
                    style={{ border: "none", background: "none", cursor: "pointer" }}
                  >
                    🗑️
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
