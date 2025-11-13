// server/ai/ollamaChat.js
import { WebSocketServer } from "ws";
import { spawn } from "child_process";
import ChatMessage from "../models/ChatMessage.js";

/**
 * Adralli AI Copilot WebSocket Server
 * -----------------------------------
 * Streams Ollama model responses in real time.
 * Saves chat history to MongoDB (ChatMessage model).
 * Handles per-folder & per-profile context awareness.
 */

export default function startChatServer(server) {
  // Create WebSocket server
  const wss = new WebSocketServer({ server, path: "/ws/ai" });
  console.log("🤖 WebSocket AI Chat server running at /ws/ai");

  wss.on("connection", (ws) => {
    console.log("🟢 Client connected to Adralli AI Chat");

    ws.on("message", async (message) => {
      try {
        // Parse incoming message JSON
        const { text, folderId, folderName, profileId, profileType } = JSON.parse(
          message.toString()
        );

        if (!text) return;

        console.log(`📩 User Message: ${text}`);

        // Context awareness
        const context = profileType
          ? `You are an AI assistant helping a user improve their ${profileType} portfolio.`
          : "You are an AI assistant helping a user manage their project.";

        // Save user's message in MongoDB
        await ChatMessage.create({
          folderId,
          folderName,
          profileId,
          profileType,
          role: "user",
          content: text,
        });

        // Start Ollama process
        const ollama = spawn("ollama", ["run", "llama3"]);
        let fullReply = "";

        // Send context + message to Ollama
        ollama.stdin.write(`${context}\nUser: ${text}\nAssistant:`);
        ollama.stdin.end();

        // Stream Ollama’s response live to frontend
        ollama.stdout.on("data", (data) => {
          const chunk = data.toString();
          fullReply += chunk;
          ws.send(chunk); // stream this chunk to browser
        });

        // Capture errors from Ollama
        ollama.stderr.on("data", (data) => {
          console.error("❌ Ollama Error:", data.toString());
        });

        // When Ollama finishes generating
        ollama.on("close", async () => {
          console.log("✅ Ollama finished response.");
          ws.send("[[END]]");

          // Save AI reply in MongoDB
          if (fullReply.trim()) {
            await ChatMessage.create({
              folderId,
              folderName,
              profileId,
              profileType,
              role: "assistant",
              content: fullReply.trim(),
            });
          }

          fullReply = "";
        });
      } catch (err) {
        console.error("❌ Chat Error:", err.message);
        ws.send("⚠️ Server error: " + err.message);
      }
    });

    // Handle WebSocket disconnection
    ws.on("close", () => {
      console.log("🔴 Client disconnected from AI Chat");
    });
  });
}
