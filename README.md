# Real-Time Chat Application

A modern, real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.IO, featuring a WhatsApp/Telegram-like desktop interface.

## ✨ Features

### Core Features (Live & Functional)
- **Real-time messaging** using Socket.IO
- **Private conversations** between two users
- **User authentication** with JWT tokens
- **Online/offline status** indicators
- **WhatsApp-like desktop interface** (not full-screen)
- **User search and selection** for starting conversations
- **Responsive design** for different screen sizes

### Simplified Features (Streamlined for Performance)
- Basic animations with Framer Motion
- Clean, modern UI design
- Real-time message delivery
- Automatic message scrolling
- User avatar support

## 🚀 How to Use - Two Person Chat

### 1. **Start the Application**
```bash
npm run dev
```
This will start both the server (port 5000) and client (port 3000).

### 2. **Register Two Users**
- Open your browser and go to `http://localhost:3000`
- Register two different user accounts (e.g., "Alice" and "Bob")
- Use different email addresses for each user

### 3. **Start a Private Chat**
1. **Login with the first user** (e.g., Alice)
2. **See the chat list** on the left side showing all other users
3. **Click on a user** (e.g., Bob) to start a private conversation
4. **Type your message** in the input field at the bottom
5. **Press Enter or click Send** to send the message

### 4. **Switch to Second User**
1. **Logout** from the first user
2. **Login with the second user** (e.g., Bob)
3. **Click on the first user** (e.g., Alice) in the chat list
4. **You'll see the conversation history** and can continue chatting

### 5. **Real-time Messaging**
- Messages are delivered instantly between users
- Online status is shown in real-time
- Messages are saved to the database
- Each conversation is private between the two users

## 🎯 Key Differences from Previous Version

- **Not full-screen**: Desktop app-like interface with margins and rounded corners
- **Private messaging**: Messages only go to the selected user, not broadcast to all
- **User selection**: Left sidebar shows all users, click to start chatting
- **Conversation-based**: Each chat is a private conversation between two users
- **WhatsApp-like layout**: Familiar interface similar to popular chat apps

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, Socket.IO, MongoDB, Mongoose
- **Frontend**: React, React Router, Framer Motion, React Icons
- **Authentication**: JWT, bcryptjs
- **Real-time**: Socket.IO for live messaging
- **Styling**: CSS with CSS variables, responsive design

## 📁 Project Structure

```
├── server/
│   ├── index.js          # Main server with Socket.IO
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   └── config/           # Configuration
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/     # Login/Register
│   │   │   └── chat/     # Chat components
│   │   ├── contexts/     # Authentication context
│   │   └── App.js        # Main app component
│   └── public/
└── package.json
```

## 🔌 Socket.IO Events

- `connection`: User connects to server
- `join`: User joins the chat system
- `sendMessage`: Send private message to specific user
- `newMessage`: Receive new message
- `userJoined`: Another user joined
- `userLeft`: User went offline

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running
- Git

### Installation
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd real-time-chat-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client && npm install
   cd ..
   ```

3. **Start MongoDB**
   ```bash
   mongod
   ```

4. **Run the application**
   ```bash
   npm run dev
   ```

## 🌐 Usage

1. **Open your browser** and navigate to `http://localhost:3000`
2. **Register** a new account or **login** with existing credentials
3. **Select a user** from the left sidebar to start chatting
4. **Type messages** and press Enter to send
5. **Switch users** by logging out and logging in as another user

## 🎨 Customization

- **Colors**: Modify CSS variables in `client/src/index.css`
- **Styling**: Update component-specific CSS files
- **Features**: Add new Socket.IO events and handlers
- **Database**: Modify schemas in `server/models/`

## 🔧 Troubleshooting

### Common Issues
- **Port conflicts**: Ensure ports 3000 and 5000 are available
- **MongoDB connection**: Check if MongoDB is running
- **Socket connection**: Verify server is running on port 5000

### Debug Mode
- Check browser console for client-side errors
- Check server terminal for backend errors
- Verify Socket.IO connection in browser dev tools

## 🚀 Performance Tips

- The app is optimized for real-time messaging
- Messages are delivered instantly via WebSocket
- Database queries are optimized with proper indexing
- UI is responsive and lightweight

## 🔮 Future Enhancements

- **Group chats** with multiple users
- **File sharing** and media messages
- **Message reactions** and emojis
- **Push notifications** for offline users
- **Message encryption** for security
- **Voice and video calls**
- **Message search** and filtering
- **User profiles** and status updates

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Enjoy your real-time chat experience! 🎉**
