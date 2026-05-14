# CodePulse: Real-Time Collaborative Code Analyzer

CodePulse is a professional-grade MERN stack application designed to facilitate real-time collaboration among developers. It integrates live synchronization with a custom automated code analysis engine to streamline the development workflow and improve code quality.

##  Key Features

*   **Real-Time Collaboration**: Powered by **Socket.IO** to enable instant code synchronization, typing indicators, and live communication between developers.
*   **Automated AI Code Analysis**: A custom backend analysis engine that evaluates code snippets for structural integrity, performance bottlenecks, and best practices.
*   **Dynamic Dashboard**: A sleek, user-centric interface built with React to manage projects, view analysis reports, and coordinate in real-time.
*   **Data Persistence**: Secure storage of code snippets and analysis history using **MongoDB**.[cite: 1]

##  Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Vite, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Real-Time** | Socket.IO |
| **API Client** | Axios |

##  Project Structure

```text
CodePulse/
├── backend/            # Express server & Business Logic
│   ├── models/         # Mongoose Schemas (Snippet.js, User.js)
│   ├── routes/         # REST API Endpoints
│   └── utils/          # Analysis Logic (analyzer.js)
├── frontend/           # React Client
│   ├── src/pages/      # Dashboard, Login, Register
│   ├── src/services/   # API & Socket Configurations
│   └── src/components/ # Reusable UI Components
└── .gitignore          # Version control exclusion rules
```

 Installation & Setup
1. Prerequisites
Node.js installed

MongoDB instance (Local or Atlas)

2. Backend Setup
Bash
cd backend
npm install
# Configure your .env with MONGO_URI and PORT
npm start

3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
[cite: 1]

 Analysis Engine Logic
The platform utilizes a rule-based analysis algorithm that parses the code string to identify:

Complexity: Detects excessively long functions or deeply nested loops.

Documentation: Checks for the presence of comments and documentation strings.

Naming Conventions: Evaluates variable and function naming patterns for readability.

[cite: 1]

Contribution
Developed by Zainab Sheikh as part of the Final Year Project.[cite: 1]
