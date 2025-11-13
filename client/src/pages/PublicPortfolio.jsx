import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PublicPortfolio = () => {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/portfolio/${username}`)
      .then((res) => res.json())
      .then(setPortfolio)
      .catch(console.error);
  }, [username]);

  if (!portfolio) return <p>Loading...</p>;

  const { profileData, settings, templateId } = portfolio;

  return (
    <div
      style={{
        background: settings.backgroundColor,
        color: settings.textColor,
        fontFamily: settings.font,
        padding: "2rem",
      }}
    >
      <h1 style={{ color: settings.primaryColor }}>{profileData.name}</h1>
      <h3>{profileData.title}</h3>
      <p>{profileData.about}</p>

      <h2>Projects</h2>
      <ul>
        {profileData.projects.map((p, i) => (
          <li key={i}>
            <strong>{p.title}</strong>: {p.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PublicPortfolio;
