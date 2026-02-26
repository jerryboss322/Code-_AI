const express = require("express");
const cors = require("cors");
const path = require("path");
const Groq = require("groq-sdk");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const client = new Groq({
  apiKey: "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"
});

app.post("/api/chat", async (req, res) => {
  const { messages, temperature, max_tokens } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages array is required" });
  }

  // Set SSE headers for streaming
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  try {
    const completion = await client.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: messages,
      temperature: typeof temperature === "number" ? temperature : 1,
      max_completion_tokens: typeof max_tokens === "number" ? max_tokens : 8192,
      top_p: 1,
      reasoning_effort: "medium",
      stream: true,
      stop: null,
    });

    // Stream each chunk back to the frontend in OpenAI SSE format
    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        res.write(`data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\n`);
      }
    }

    // Signal stream end
    res.write("data: [DONE]\n\n");
    res.end();

  } catch (err) {
    console.error("Groq SDK error:", err.message);
    res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
    res.end();
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

module.exports = app;

if (require.main === module) {
  app.listen(3000, () => {
    console.log("✅ CodeAi running at http://localhost:3000");
  });
}