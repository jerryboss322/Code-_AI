# 🤖 CodeAi Backend — Groq API Integration

A Node.js/Express backend that securely proxies requests from your CodeAi
frontend to the **Groq API** (OpenAI-compatible), streaming responses in
real-time.

---

## 📁 Project Structure

```
codeai-backend/
├── server.js       ← Express server (backend + proxy)
├── index.html      ← Your CodeAi frontend (served by Express)
├── .env            ← 🔐 Secret API key lives here (never commit!)
├── .gitignore      ← Keeps .env out of Git
├── package.json    ← Dependencies
└── README.md
```

---

## ⚡ Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Check your `.env` file
```env
GROQ_API_KEY=gsk_your_key_here
GROQ_API_URL=https://api.groq.com/openai/v1/chat/completions
GROQ_MODEL=openai/gpt-oss-20b
PORT=3000
```

### 3. Start the server
```bash
node server.js
```

> For auto-reload during development:
> ```bash
> npm run dev
> ```

### 4. Open your browser
```
http://localhost:3000
```

---

## ✅ What's Wired Up

| Feature | Status |
|---|---|
| Correct Groq endpoint URL | ✅ `https://api.groq.com/openai/v1/chat/completions` |
| Model | ✅ `openai/gpt-oss-20b` |
| Authorization header | ✅ `Bearer <GROQ_API_KEY>` |
| JSON body format | ✅ OpenAI-compatible messages array |
| Streaming (SSE) | ✅ Real-time token streaming |
| Frontend calling backend | ✅ `POST /api/chat` |
| API key hidden in `.env` | ✅ Never exposed to browser |
| Temperature + Max Tokens | ✅ Controlled via Settings UI |

---

## 🔐 Security

- Your API key lives **only** in `.env` on your server
- The browser **never** sees the key — requests go to your backend, not Groq directly
- `.env` is listed in `.gitignore` so it won't be accidentally pushed to GitHub

---

## 🛠 API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/` | Serves the CodeAi frontend |
| `POST` | `/api/chat` | Proxy to Groq (streaming SSE) |
| `GET` | `/api/health` | Health check + model info |

---

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `express` | Web server + routing |
| `dotenv` | Load `.env` variables |
| `node-fetch` | HTTP requests to Groq |
| `cors` | Cross-origin support |
