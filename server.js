import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Folder "public" untuk menyimpan HTML dan JS front-end
app.use(express.static(path.join(__dirname, "public")));

const GROQ_API_KEY = process.env.GROQ_API_KEY; // Masukkan API Key di Secrets

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message || "";

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "mixtral-8x7b-32768",
          messages: [{ role: "user", content: userMessage }],
        }),
      }
    );

    const data = await response.json();

    return res.json({
      reply: data?.choices?.[0]?.message?.content || "Terjadi kesalahan!",
    });
  } catch (err) {
    return res.json({ reply: "Server error: " + err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server berjalan di port " + PORT);
});
