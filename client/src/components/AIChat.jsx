import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ResizableBox } from "react-resizable";
import { motion, AnimatePresence } from "framer-motion";
import "react-resizable/css/styles.css";

/**
 * Adralli Copilot AI Chatbox 💬
 * Features:
 * ✅ Smooth open/close animation
 * ✅ Draggable + Resizable
 * ✅ Persistent position & size
 * ✅ Real-time Ollama chat (WebSocket)
 * ✅ Chat memory per folder/profile
 */

export default function AIChat({
  currentFolderId = null,
  currentProfileId = null,
  currentProfileType = null,
}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 380, height: 480 });

  const wsRef = useRef(null);
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // 🧠 Load saved window position and size
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("adralli_chat_window"));
    if (saved) {
      setPos(saved.pos);
      setSize(saved.size);
    } else {
      setPos({ x: window.innerWidth - 420, y: window.innerHeight - 520 });
    }
  }, []);

  // 🧠 Save window position and size
  useEffect(() => {
    localStorage.setItem("adralli_chat_window", JSON.stringify({ pos, size }));
  }, [pos, size]);

  // 🧠 Load chat history from MongoDB
  useEffect(() => {
    if (!isOpen) return;
    const loadHistory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/chat/history", {
          params: { folderId: currentFolderId, profileId: currentProfileId },
        });
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to load chat history:", err);
      }
    };
    loadHistory();
  }, [isOpen, currentFolderId, currentProfileId]);

  // 🔌 Connect to WebSocket
  useEffect(() => {
    const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
    wsRef.current = new WebSocket(`${wsProtocol}://${window.location.hostname}:5000/ws/ai`);

    wsRef.current.onmessage = (event) => {
      const text = event.data.toString();
      if (text === "[[END]]") return;

      setMessages((prev) => {
        const msgs = [...prev];
        const last = msgs[msgs.length - 1];
        if (last && last.role === "assistant") last.content += text;
        else msgs.push({ role: "assistant", content: text });
        return msgs;
      });
    };

    wsRef.current.onclose = () => console.warn("🔴 WebSocket closed");
    wsRef.current.onerror = (err) => console.error("WebSocket error:", err);

    return () => wsRef.current.close();
  }, []);

  // 🖱️ Manual drag
  const handleMouseDown = (e) => {
    dragging.current = true;
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };
  const handleMouseUp = () => (dragging.current = false);
  const handleMouseMove = (e) => {
    if (dragging.current) {
      const newX = e.clientX - dragOffset.current.x;
      const newY = e.clientY - dragOffset.current.y;
      setPos({
        x: Math.max(0, Math.min(newX, window.innerWidth - size.width)),
        y: Math.max(0, Math.min(newY, window.innerHeight - size.height)),
      });
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [size]);

  // ✉️ Send message
  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    wsRef.current.send(
      JSON.stringify({
        text: input,
        folderId: currentFolderId,
        profileId: currentProfileId,
        profileType: currentProfileType,
      })
    );
    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-button"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              bottom: 24,
              right: 24,
              background: "#1d4ed8",
              color: "white",
              borderRadius: "50%",
              width: 60,
              height: 60,
              fontSize: 24,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              zIndex: 9999,
            }}
          >
            🤖
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.8, y: 80 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 50 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: pos.y,
              left: pos.x,
              zIndex: 10000,
            }}
          >
            <ResizableBox
              width={size.width}
              height={size.height}
              minConstraints={[300, 300]}
              maxConstraints={[600, 700]}
              handleSize={[8, 8]}
              onResizeStop={(e, data) =>
                setSize({ width: data.size.width, height: data.size.height })
              }
            >
              <motion.div
                style={{
                  background: "white",
                  borderRadius: 12,
                  border: "1px solid #ddd",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  overflow: "hidden",
                }}
              >
                {/* Header (draggable) */}
                <div
                  onMouseDown={handleMouseDown}
                  style={{
                    background: "#1d4ed8",
                    color: "white",
                    padding: "10px 14px",
                    cursor: "grab",
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontWeight: 600,
                  }}
                >
                  Adralli Copilot 💬
                  <button
                    onClick={() => setIsOpen(false)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "white",
                      fontSize: 18,
                      cursor: "pointer",
                    }}
                  >
                    ✕
                  </button>
                </div>

                {/* Messages */}
                <div
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: 10,
                    background: "#f9fafb",
                  }}
                >
                  {messages.length === 0 ? (
                    <p style={{ textAlign: "center", color: "#888" }}>
                      Start chatting with your Copilot 🤖
                    </p>
                  ) : (
                    messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          margin: "6px 0",
                          padding: "8px 12px",
                          borderRadius: 8,
                          whiteSpace: "pre-wrap",
                          background:
                            msg.role === "assistant" ? "#e2e8f0" : "#dbeafe",
                          textAlign:
                            msg.role === "assistant" ? "left" : "right",
                        }}
                      >
                        <b>{msg.role === "assistant" ? "🤖" : "🧑"}:</b>{" "}
                        {msg.content}
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Input */}
                <div
                  style={{
                    display: "flex",
                    padding: 10,
                    borderTop: "1px solid #ddd",
                  }}
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Ask something..."
                    style={{
                      flex: 1,
                      border: "1px solid #ccc",
                      borderRadius: 8,
                      padding: "8px 10px",
                      outline: "none",
                    }}
                  />
                  <button
                    onClick={sendMessage}
                    style={{
                      marginLeft: 8,
                      background: "#1d4ed8",
                      color: "white",
                      border: "none",
                      borderRadius: 8,
                      padding: "8px 16px",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    ➤
                  </button>
                </div>
              </motion.div>
            </ResizableBox>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
