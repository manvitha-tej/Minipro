import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

// 🧩 Context Providers
import { FolderProvider } from "./context/FolderContext";
import { ProfileProvider } from "./context/ProfileContext";
import { ProjectProvider } from "./context/ProjectContext";

// 📂 Core Dashboard Components
import FolderList from "./components/FolderList";
import ProfileList from "./components/ProfileList";
import ProjectList from "./components/ProjectList";
import AIChat from "./components/AIChat";

// 🎨 Portfolio Builder Components
import TemplateSelector from "./components/TemplateSelector/TemplateSelector";
import CustomizationPanel from "./components/CustomizationPanel/CustomizationPanel";

// 🌐 Public Portfolio Page
import PublicPortfolio from "./pages/PublicPortfolio";

// 💻 ========== DASHBOARD COMPONENT ==========
const Dashboard = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedProfileType, setSelectedProfileType] = useState(null);
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
        position: "relative",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#1d4ed8",
          color: "white",
          padding: "20px",
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "600",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        Adralli Portfolio Manager 🚀
      </header>

      {/* Main Dashboard Section */}
      <main style={{ padding: "20px" }}>
        {!selectedFolder ? (
          <FolderList onSelectFolder={(id) => setSelectedFolder(id)} />
        ) : !selectedProfile ? (
          <ProfileList
            folderId={selectedFolder}
            onBack={() => setSelectedFolder(null)}
            onSelectProfile={(id, type) => {
              setSelectedProfile(id);
              setSelectedProfileType(type);
            }}
          />
        ) : (
          <ProjectList
            profileId={selectedProfile}
            onBack={() => setSelectedProfile(null)}
          />
        )}

        {/* 🎨 Button to Open Portfolio Builder */}
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <button
            onClick={() => navigate("/builder")}
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "12px 24px",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
          >
            🎨 Open Portfolio Builder
          </button>
        </div>
      </main>

      {/* 💬 Floating AI Assistant */}
      <AIChat
        currentFolderId={selectedFolder}
        currentProfileId={selectedProfile}
        currentProfileType={selectedProfileType}
      />
    </div>
  );
};

// 💡 ========== MAIN APP ROUTES ==========
export default function App() {
  return (
    <FolderProvider>
      <ProfileProvider>
        <ProjectProvider>
          <Router>
            <Routes>
              {/* 📂 Main Adralli Dashboard */}
              <Route path="/" element={<Dashboard />} />

              {/* 🎨 Template Selection Page */}
              <Route path="/builder" element={<TemplateSelector />} />

              {/* 🧩 Template Customization Page */}
              <Route
                path="/customize/:templateId"
                element={<CustomizationPanel />}
              />

              {/* 🌐 Public Portfolio Page */}
              <Route path="/u/:username" element={<PublicPortfolio />} />
            </Routes>
          </Router>
        </ProjectProvider>
      </ProfileProvider>
    </FolderProvider>
  );
}
