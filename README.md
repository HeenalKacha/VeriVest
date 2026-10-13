<!-- <div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/70c61ee9-bdbc-47b5-9abd-b31fa6349488

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev` -->
# VeriVest — Verify Before You Trust

**An AI-powered platform to help users identify suspicious investment messages, links, screenshots, and entities before taking action.**

## 📌 Overview

VeriVest is a web application designed to help users recognize potential investment scams and misleading financial claims. It allows users to submit suspicious messages, screenshots, links, or entity details for analysis and provides risk-related insights to support safer financial decision-making.

The platform also includes educational resources and simulation features to help users improve their scam awareness.

## ✨ Features

- **Message Analysis:** Analyze suspicious investment messages and financial claims.
- **Screenshot Analysis:** Submit screenshots of potentially fraudulent content for review.
- **Link Analysis:** Check suspicious investment-related URLs.
- **Entity Profiling:** Examine information about potentially suspicious entities.
- **Risk Assessment:** Present risk-related findings to help users evaluate suspicious content.
- **Learn & Simulator:** Explore educational content and practice identifying potential scams.
- **Tips & Group Profiler:** Access scam-awareness tips and group-related profiling features.
- **Bilingual Interface:** Switch between English and Hindi.

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express
- **AI Integration:** Google Gemini API
- **Version Control:** Git and GitHub
- **Deployment:** Vercel

## ⚙️ Getting Started

### Prerequisites

- Node.js and npm
- A Google Gemini API key

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/HeenalKacha/VeriVest.git
   ```

2. Navigate to the project directory:

   ```bash
   cd VeriVest
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the project root and add your Gemini API key:

   ```env
   GEMINI_API_KEY=your_gemini_api_key
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

   Open the local URL displayed in your terminal.

> Follow the project's configured scripts and backend setup if the frontend and backend need to run separately.

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | API key used for Gemini integration |

**Security:** Never commit `.env.local` or expose your actual API key in public repositories. Use environment variables in your deployment settings.

## 🚀 Deployment

VeriVest can be deployed using Vercel, provided the project's frontend and backend routes are configured correctly for the deployment environment.

1. Import the GitHub repository into Vercel.
2. Configure the required environment variables.
3. Verify the build settings and deployment logs.
4. Test the deployed application and its API endpoints.

## 🎯 Project Objective

The objective of VeriVest is to improve awareness of digital investment scams by combining AI-assisted analysis with accessible educational tools.

## ⚠️ Disclaimer

VeriVest provides AI-assisted risk insights for educational and informational purposes only. Its results may be inaccurate or incomplete and should not be treated as a guarantee that an investment, message, link, or entity is safe or fraudulent. Always verify financial information through official sources before making decisions.

## 👩‍💻 Author

**Heenal Kacha**

GitHub: [@HeenalKacha](https://github.com/HeenalKacha)
