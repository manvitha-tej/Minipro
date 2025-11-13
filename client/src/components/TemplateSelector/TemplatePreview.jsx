import React, { useEffect, useState } from "react";
import styles from "./TemplatePreview.module.css";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const TemplatePreview = ({ templateId, userId = "12345" }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/profiles/${userId}`);
        if (!res.ok) throw new Error("No profile found, using demo data.");
        const data = await res.json();
        setProfile(data);
      } catch (error) {
        console.warn("⚠️ Using fallback demo profile.");
        setProfile({
          name: "Chethan Er",
          title: "AI Developer & Designer",
          about:
            "Building intelligent assistants and crafting modern web experiences.",
          skills: [
            { name: "Python", level: 90 },
            { name: "React", level: 85 },
            { name: "Node.js", level: 80 },
          ],
          projects: [
            { title: "Adralli", description: "AI-powered portfolio builder." },
            { title: "Jarvis AI", description: "Voice-based Python assistant." },
          ],
          socials: {
            github: "https://github.com/chethan",
            linkedin: "https://linkedin.com/in/chethan",
            twitter: "https://twitter.com/chethan",
          },
          profileImage: "/images/profile1.jpg",
        });
      }
    };
    fetchProfile();
  }, [userId]);

  if (!profile)
    return (
      <div className={styles.previewContainer}>
        <h3 className={styles.previewTitle}>Loading Template...</h3>
      </div>
    );

  const { name, title, about, skills, projects, socials, profileImage } =
    profile;

  return (
    <div className={styles.previewContainer}>
      <h3 className={styles.previewTitle}>Live Template Preview</h3>
      <div className={styles.previewBox}>
        <div className={styles.modern}>
          <header className={styles.header}>
            <img src={profileImage} alt="Profile" className={styles.avatar} />
            <h1>{name}</h1>
            <p>{title}</p>
            <div className={styles.socials}>
              {socials.github && (
                <a href={socials.github} target="_blank" rel="noreferrer">
                  <FaGithub />
                </a>
              )}
              {socials.linkedin && (
                <a href={socials.linkedin} target="_blank" rel="noreferrer">
                  <FaLinkedin />
                </a>
              )}
              {socials.twitter && (
                <a href={socials.twitter} target="_blank" rel="noreferrer">
                  <FaTwitter />
                </a>
              )}
            </div>
          </header>

          <section className={styles.section}>
            <h2>About Me</h2>
            <p>{about}</p>
          </section>

          <section className={styles.section}>
            <h2>Skills</h2>
            {skills.map((skill) => (
              <div key={skill.name} className={styles.skillBar}>
                <span>{skill.name}</span>
                <div className={styles.bar}>
                  <div
                    className={styles.progress}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </section>

          <section className={styles.section}>
            <h2>Projects</h2>
            <div className={styles.projectGrid}>
              {projects.map((p) => (
                <div key={p.title} className={styles.projectCard}>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;
