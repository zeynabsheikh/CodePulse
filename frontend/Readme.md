#  CodePulse – Real-Time Collaborative Code Review & AI Feedback

CodePulse is a full-stack MERN application designed for developers to analyze their code snippets and collaborate in real-time. It uses logic-based analysis to provide feedback and Socket.IO for live reviews.

##  Features
- **Logic-Based Analysis:** Detects long functions, missing comments, and nested loops.
- **Real-Time Collaboration:** Syncs comments and reviews across multiple users without page refresh.
- **Typing Indicators:** See when your teammate is writing code live.
- **Persistence:** All snippets and analysis results are saved in MongoDB.

##  Tech Stack
- **Frontend:** React.js, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Real-Time Engine:** Socket.IO

##  Getting Started

### 1. Prerequisites
- Node.js installed
- MongoDB URI (Local or Atlas)

### 2. Installation
Extract the ZIP and open terminal in the project folder:

# Install Backend dependencies
cd backend
npm install

# Install Frontend dependencies
cd ../frontend
npm install

### 3. Running the App
Open two terminals:

**Terminal 1 (Backend):**
cd backend
npm start

**Terminal 2 (Frontend):**
cd frontend
npm run dev

### 4. Testing Real-Time Collaboration
To test the real-time review system:
1. Open the app in a **Normal Window**.
2. Open the app in an **Incognito Window**.
3. Type a comment in the "Live Collaboration" box and watch it appear instantly in the other window!

---
**Author:** Zainab Noor
