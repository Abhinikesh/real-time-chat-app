const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');

// Import routes
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');

const app = express();
const server = http.createServer(app);

// Socket.IO setup with CORS
const io = socketIo(server, {
  cors: {
    origin: config.CLIENT_URL,
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// MongoDB connection
mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user joining
  socket.on('join', (data) => {
    socket.join('general');
    socket.userId = data.id; // Store userId in socket for private messaging
    socket.broadcast.emit('userJoined', data);
  });

  // Handle sending messages
  socket.on('sendMessage', async (messageData) => {
    try {
      console.log('Received messageData:', messageData); // Debug log
      console.log('messageData.sender:', messageData.sender); // Debug log
      console.log('messageData.receiver:', messageData.receiver); // Debug log
      
      // Save message to database
      const Message = require('./models/Message');
      const message = new Message({
        sender: messageData.sender,
        receiver: messageData.receiver,
        content: messageData.content,
        messageType: messageData.messageType || 'text',
        timestamp: messageData.timestamp
      });
      await message.save();

      // Send message to specific receiver (private messaging)
      if (messageData.receiver) {
        // Find the receiver's socket and send message
        const receiverSocket = Array.from(io.sockets.sockets.values())
          .find(s => s.userId === messageData.receiver);
        
        if (receiverSocket) {
          receiverSocket.emit('newMessage', messageData);
        }
        
        // Also send back to sender for confirmation
        socket.emit('newMessage', messageData);
      } else {
        // Fallback: broadcast to all users (for group chat)
        io.emit('newMessage', messageData);
      }
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = config.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
