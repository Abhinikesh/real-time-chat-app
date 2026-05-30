<div align="center">

# 💬 Real-Time Chat App

### *WhatsApp-like Private Messaging — Built with MERN + Socket.IO*

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-View_App-3B82F6?style=for-the-badge)](#)
[![GitHub Stars](https://img.shields.io/github/stars/abhinikesh/chat-app?style=for-the-badge&color=FFD700)](https://github.com/abhinikesh)
[![License](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](LICENSE)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--Time-010101?style=for-the-badge&logo=socket.io)](https://socket.io)

<br/>

> A modern, real-time private chat application with a WhatsApp-like desktop interface — featuring instant messaging, online status, and JWT authentication.

<br/>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| ⚡ **Real-Time Messaging** | Instant message delivery via Socket.IO WebSockets |
| 🔒 **Private Conversations** | One-on-one messaging — only between selected users |
| 🟢 **Online / Offline Status** | See who's active in real time |
| 🔐 **JWT Authentication** | Secure login and session management |
| 🖥️ **Desktop-Style UI** | WhatsApp/Telegram-like layout with margins and rounded corners |
| 👤 **User Search** | Find and start conversations with any registered user |
| 💾 **Message Persistence** | All messages saved to MongoDB |
| 📜 **Auto Scroll** | Conversation always scrolls to the latest message |

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology |
|-------|-----------|
| **Frontend** | React, React Router, Framer Motion, React Icons |
| **Backend** | Node.js, Express.js |
| **Real-Time** | Socket.IO |
| **Database** | MongoDB, Mongoose |
| **Auth** | JWT, bcryptjs |
| **Styling** | CSS Variables, Responsive Design |

</div>

---

## 🔌 Socket.IO Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `connection` | Server | Client connects |
| `join` | Client → Server | User joins the chat system |
| `sendMessage` | Client → Server | Send a private message |
| `newMessage` | Server → Client | Receive an incoming message |
| `userJoined` | Server → Client | Another user came online |
| `userLeft` | Server → Client | A user went offline |

---

## 🔧 Troubleshooting

| Issue | Fix |
|-------|-----|
| Port already in use | Free up ports `3000` and `5000` |
| MongoDB not connecting | Run `mongod` and verify it's active |
| Socket not connecting | Confirm server is running on port `5000` |
| Messages not appearing | Check browser console for Socket.IO errors |

---

## 📄 License

Licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built with ❤️ using MERN + Socket.IO**

⭐ If this project helped you, drop a star — it means a lot!

</div>
