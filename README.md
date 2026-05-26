# Dallas IAM Contractor Project Finder
### AI-powered tool for finding Identity & Access Management contracts in Dallas, TX

---

## Project Structure

```
dallas-iam-tool/
├── backend/
│   ├── server.js        ← Express API + Claude AI integration
│   ├── package.json
│   └── .env             ← PUT YOUR API KEY HERE
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.js       ← Main React UI
    │   ├── App.css      ← All styles
    │   └── index.js
    └── package.json
```

---

## Setup Instructions (VS Code)

### Step 1 — Get your Anthropic API Key

1. Go to https://console.anthropic.com
2. Sign up / log in
3. Click **API Keys** → **Create Key**
4. Copy the key

### Step 2 — Add your API Key

Open `backend/.env` and replace `your_api_key_here`:

```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxx
```

### Step 3 — Install & run the Backend

Open a terminal in VS Code (`Ctrl+`` ` ``):``

```bash
cd backend
npm install
npm run dev
```

You should see:
```
🚀 Dallas IAM Tool backend running on http://localhost:3001
```

### Step 4 — Install & run the Frontend

Open a **second terminal** in VS Code:

```bash
cd frontend
npm install
npm start
```

The app will open at **http://localhost:3000**

---

## How to Use

1. Type what you're looking for in the search box
2. Use filters to narrow by contract type, IAM tool, pay rate, etc.
3. Click quick-prompt chips for common searches
4. Click **FIND PROJECTS →** to search
5. Click **Details** on any card to see the full description
6. Click **Apply →** to go directly to the job posting

---

## Example Searches

- `"Find Okta admin contracts paying over $100/hr"`
- `"SailPoint IGA 6-month engagement, C2C preferred"`
- `"Azure AD short term project, hybrid ok"`
- `"CyberArk PAM implementation, clearance required"`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 |
| Backend | Node.js + Express |
| AI | Anthropic Claude (claude-sonnet-4) |
| Search | Claude web search tool |
| Styling | Custom CSS (IBM Plex fonts) |

---

## Troubleshooting

**"Cannot connect to backend"** → Make sure `npm run dev` is running in the backend folder

**"Check your API key"** → Verify your key in `backend/.env` starts with `sk-ant-`

**No results showing** → Try a simpler query like "IAM contracts Dallas"

---

Built with Claude AI · For IAM contractors in the Dallas, TX area
