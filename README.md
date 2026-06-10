# 🔐 USA IAM Contractor Project Finder (Gemini Edition)

A full-stack AI-powered tool to find **Identity & Access Management (IAM) contractor opportunities across all 50 US states**, powered by **Google Gemini AI (FREE)**.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🌎 Nationwide Search | Projects across all 50 US states |
| 🤖 Google Gemini AI | Free tier — 1,500 requests/day, very generous limits |
| 📊 60–120+ Results | Each tool search returns 60+ projects; "All Tools" returns 120+ |
| 📞 Contact Info | Every project shows recruiter name, email, phone — always visible |
| 🔍 LinkedIn Search | One-click LinkedIn people search by recruiter name |
| ⬇ Excel Export | Download all results as formatted `.xlsx` spreadsheet |
| 🃏 Card + Table View | Toggle between card view and table view |
| 🔍 Inline Filter | Filter visible results by title, company, location, or skills |
| 🚀 Quick Searches | One-click for Okta, SailPoint, CyberArk, Azure AD, etc. |

---

## 📁 Project Structure

```
usa-iam-tool/
├── backend/
│   ├── server.js          ← Express API server (Gemini)
│   ├── package.json
│   └── .env               ← ⚠️ Put your GEMINI_API_KEY here
└── frontend/
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── index.js
        ├── index.css
        ├── App.js
        └── App.css
```

---

## 🚀 Setup & Run in VS Code

### Prerequisites

- **Node.js** v18 or higher — https://nodejs.org
- A **free Google Gemini API key** — https://aistudio.google.com/apikey

### Step 1 — Open in VS Code

```bash
code usa-iam-tool
```

### Step 2 — Get Your FREE Gemini API Key

1. Go to **https://aistudio.google.com/apikey**
2. Sign in with your Google account (free)
3. Click **"Create API Key"**
4. Copy the key

**Free tier limits (very generous):**
- ✅ 1,500 requests per day
- ✅ 1,000,000 tokens per minute
- ✅ No credit card required

### Step 3 — Add API Key to Project

Open `backend/.env` and replace:
```
GEMINI_API_KEY=your_gemini_api_key_here
```
with your actual key:
```
GEMINI_API_KEY=AIzaSy_your_actual_key_here
```

### Step 4 — Install & Run Backend

Open a terminal in VS Code (`Ctrl+``):

```bash
cd backend
npm install
npm start
```

You should see:
```
🚀 USA IAM Tool running on http://localhost:3001
🤖 Model: gemini-1.5-flash (Google Gemini - FREE)
📦 Batch size: 30 projects per call
```

### Step 5 — Install & Run Frontend

Open a **second terminal**:

```bash
cd frontend
npm install
npm start
```

App opens at **http://localhost:3000** ✅

---

## 🎯 How to Use

1. Select an **IAM Tool** (Okta, SailPoint, CyberArk, etc.) or "All Tools"
2. Optionally set State, Contract Type, Remote, Clearance, Min Pay filters
3. Click **🔍 Search**
4. Wait ~15–30 seconds for Gemini to generate results
5. Browse in **Card** or **Table** view
6. Contact info (name, email, phone) is shown directly on every card
7. Click **🔍 Search on LinkedIn** to find the recruiter on LinkedIn
8. Click **⬇ Download Excel** to export all results

---

## 📊 Results Per Search

| Search Type | Projects Generated |
|---|---|
| Specific tool (e.g. Okta) | ~60 projects (2 batches × 30) |
| All Tools | ~120 projects (4 batches × 30) |

---

## 🛠️ Troubleshooting

| Problem | Solution |
|---|---|
| `Invalid API key` | Check `GEMINI_API_KEY` in `backend/.env` — get key at aistudio.google.com |
| `quota` / rate limit error | You've hit daily limit (1,500 req/day). Wait until tomorrow or create new key |
| Backend not starting | Run `cd backend && npm install` first |
| Frontend blank page | Make sure backend is running on port 3001 |
| 0 results | Check backend terminal for error details |

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, CSS |
| Backend | Node.js, Express |
| AI | Google Gemini 1.5 Flash — **free tier** |
| Excel Export | SheetJS (xlsx) + FileSaver.js |

---

## 🆓 Why Gemini is Better Than Groq (Free Tier)

| | Groq (Free) | Gemini 1.5 Flash (Free) |
|---|---|---|
| Daily requests | ~limited | **1,500/day** |
| Tokens per minute | 6,000 TPM | **1,000,000 TPM** |
| Output quality | Good | **Excellent** |
| JSON mode | No | **Yes (native)** |
| Batch size | 20 | **30** |
