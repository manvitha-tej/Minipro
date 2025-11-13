import React, { useState, useEffect } from "react";
import API from "../services/api";

const FolderManager = () => {
  const [folders, setFolders] = useState([]);
  const [newFolder, setNewFolder] = useState("");

  // 🧩 Fetch folders from backend
  const fetchFolders = async () => {
    try {
      const res = await API.get("/folders");
      setFolders(res.data);
    } catch (err) {
      console.error("Error fetching folders:", err);
    }
  };

  // ➕ Create new folder
  const createFolder = async () => {
    if (!newFolder.trim()) return;
    try {
      await API.post("/folders", { name: newFolder, userId: "defaultUser" });
      setNewFolder("");
      fetchFolders();
    } catch (err) {
      console.error("Error creating folder:", err);
    }
  };

  // ✏️ Rename folder
  const renameFolder = async (id) => {
    const newName = prompt("Enter new name:");
    if (!newName) return;
    try {
      await API.put(`/folders/${id}`, { name: newName });
      fetchFolders();
    } catch (err) {
      console.error("Error renaming folder:", err);
    }
  };

  // 🗑️ Delete folder
  const deleteFolder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this folder?")) return;
    try {
      await API.delete(`/folders/${id}`);
      fetchFolders();
    } catch (err) {
      console.error("Error deleting folder:", err);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📁 Folder Manager</h1>

      {/* Input */}
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="New folder name..."
          value={newFolder}
          onChange={(e) => setNewFolder(e.target.value)}
          style={styles.input}
        />
        <button onClick={createFolder} style={styles.button}>➕ Create</button>
      </div>

      {/* Folder List */}
      <ul style={styles.folderList}>
        {folders.length === 0 ? (
          <p>No folders yet 😅</p>
        ) : (
          folders.map((f) => (
            <li key={f._id} style={styles.folderItem}>
              <span>{f.name}</span>
              <div>
                <button onClick={() => renameFolder(f._id)} style={styles.editBtn}>✏️</button>
                <button onClick={() => deleteFolder(f._id)} style={styles.deleteBtn}>🗑️</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

// ✨ Inline Styling (simple and clean)
const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fdfdfd",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    marginLeft: "10px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "6px",
  },
  folderList: {
    listStyle: "none",
    padding: 0,
  },
  folderItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    margin: "5px 0",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fafafa",
  },
  editBtn: {
    marginRight: "10px",
    cursor: "pointer",
    background: "none",
    border: "none",
    fontSize: "16px",
  },
  deleteBtn: {
    cursor: "pointer",
    background: "none",
    border: "none",
    fontSize: "16px",
  },
};

export default FolderManager;
