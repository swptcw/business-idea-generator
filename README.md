# Business Idea Generator

A React app that generates personalized business ideas using Claude AI.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Get your Claude API key from: https://console.anthropic.com/

3. Deploy to Vercel (instructions below)

## Deploy to Vercel

### Option 1: Via GitHub (Recommended)

1. Initialize git in this folder:
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Create a new repository on GitHub

3. Push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

4. Go to https://vercel.com and sign in with GitHub

5. Click "New Project" and import your repository

6. Add Environment Variable:
   - Name: `ANTHROPIC_API_KEY`
   - Value: (paste your Claude API key)

7. Click "Deploy"

### Option 2: Via Vercel CLI

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Add your API key as environment variable:
```bash
vercel env add ANTHROPIC_API_KEY
```
(Paste your API key when prompted)

5. Redeploy with environment variable:
```bash
vercel --prod
```

## Local Development

```bash
npm run dev
```

Note: For local testing, you'll need to set up environment variables differently.

## Project Structure

```
ideacreator/
├── api/
│   └── generate.js        # Serverless function for Claude API
├── src/
│   ├── App.jsx           # Main React component
│   └── main.jsx          # React entry point
├── index.html
├── package.json
└── vite.config.js
```
