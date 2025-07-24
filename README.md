# 🌍 TravelGrid

Welcome to **TravelGrid**, your all-in-one travel platform designed to streamline your travel planning experience! With TravelGrid, you can effortlessly book tickets, rent vehicles, reserve hotels, explore curated travel guides, and select customizable travel packages—all in one place. Whether you're a solo traveler or planning a group adventure, TravelGrid simplifies every step of your journey.

> 👩‍💻 This project is proudly part of **GirlScript Summer of Code 2025 (GSSoC)**, and we invite enthusiastic contributors to collaborate in building a seamless, user-friendly travel solution.

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Backend Setup](#-backend-setup)
- [Frontend Setup](#-frontend-setup)
- [Contributing to TravelGrid](#-contributing-to-travelgrid)
- [Project Structure](#-project-structure)
- [Code of Conduct](#-code-of-conduct)

---

## 🌍 About the Project

**TravelGrid** is a comprehensive platform that simplifies travel planning. From booking flights, trains, or buses to renting vehicles, reserving hotels, or exploring expertly curated travel guides, TravelGrid offers a seamless and intuitive experience.  
Our mission is to make travel planning **accessible, affordable, and enjoyable** for everyone.

As a **GSSoC 2025** project, TravelGrid provides contributors with an opportunity to collaborate on a real-world application, honing their skills and building a meaningful product.

---

## ✨ Features

- 🧳 **Travel Booking** – Easily book flights, trains, buses, and more.
- 🚗 **Vehicle Rentals** – Rent or hire vehicles tailored to your travel needs.
- 🏨 **Hotel Reservations** – Browse and book hotels based on your preferences.
- 🧭 **Travel Guides** – Discover curated guides to plan your ideal trip.
- 🎒 **Travel Packages** – Choose pre-designed packages or customize your own.
- 📱 **Responsive Design** – Seamless across desktop, tablet, and mobile.
- 🎨 **Interactive UI** – Built with modern React + Tailwind + ShadCN.
- 🔐 **User Authentication (Backend)** – Secure signup/login with JWT & MongoDB.
- 🌐 **API Ready** – RESTful backend API integration with error handling & modular routing.

---

## 🛠 Tech Stack

### Frontend:
- **React.js**
- **Tailwind CSS**
- **ShadCN** (UI Component Library)
- **Vite** (for blazing-fast dev build)

### Backend:
- **Node.js**
- **Express.js**
- **MongoDB** (via Mongoose)
- **JWT Authentication**
- **CORS**, **dotenv**, **bcryptjs**, **nodemon**

### Tools & Platforms:
- **Git & GitHub** – Version control
- **Postman** – API testing
- **Render / Railway** – Deployment
- **ESLint & Prettier** – Code consistency

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16+)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Git**
- **VS Code** or any code editor

---

## 🖥️ Backend Setup

```bash
# Clone the repository
git clone https://github.com/Adarsh-Chaubey03/TravelGrid.git
cd TravelGrid/server

# Install backend dependencies
npm install

# Create .env file
touch .env

#dotenv Configuration

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key

#Frontend Setup
#Start the front-end Server
npm run dev
# Go to the client folder
cd ../client
# Install dependencies
npm install
# Start development server
npm run dev

#Contributing to TravelGrid
We welcome GSSoC 2025 contributors! Follow these guidelines for a smooth collaboration.
Issues: Pick an unassigned issue or propose one with a clear description. Wait for approval.

Responsive Design: Make all components responsive using Tailwind CSS.

Code Quality: Keep code modular under src/components/. Use ESLint + Prettier.

Pull Requests: Each PR should solve one issue, be well-tested, and clearly described.

Review Schedule: Code reviews and task updates happen between 6–7 PM daily.

Communication: No spammy comments. For help, contact:

GitHub: @Adarsh-Chaubey03

#TravelGrid/
├── client/              # Frontend
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── styles/
│       ├── App.jsx
│       └── main.jsx
│
├── server/              # Backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   ├── .env             # Not committed
│   └── README.md
│
├── .gitignore
├── README.md
├── vite.config.js
└── package.json

#Code of Conduct
Please refer to the Code of Conduct for details on contributing guidelines and community behavior. # code of conduct is in repo please read it before contribution.