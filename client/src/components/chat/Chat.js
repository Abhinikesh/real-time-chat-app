import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';
import axios from 'axios';
import ChatList from './ChatList';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useAuth } from '../../contexts/AuthContext';
import './Chat.css';

const Chat = () => {
  const { user, logout } = useAuth();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initialize Socket.IO connection
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Socket event listeners
    newSocket.on('connect', () => {
      console.log('Connected to server');
      // Emit join event when connected and user is available
      if (user) {
        newSocket.emit('join', {
          id: user.id,
          username: user.username,
          avatar: user.avatar,
          online: true
        });
      }
    });

    newSocket.on('newMessage', (message) => {
      // Only add message if it's from/to the selected user
      if (selectedUserId && 
          (message.sender === selectedUserId || message.sender === user.id)) {
        setMessages(prev => [...prev, message]);
      }
    });

    newSocket.on('userJoined', (userData) => {
      // This event is no longer needed as online status is handled by server
    });

    newSocket.on('userLeft', (userId) => {
      // This event is no longer needed as online status is handled by server
    });

    return () => {
      newSocket.close();
    };
  }, [user, selectedUserId]);

  useEffect(() => {
    // Fetch all users for chat list
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAllUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (user) {
      fetchUsers();
    }
  }, [user]);

  useEffect(() => {
    // Fetch messages for selected user
    const fetchMessages = async () => {
      if (!selectedUserId) {
        setMessages([]);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/messages/conversation/${selectedUserId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessages(response.data.messages || []);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setMessages([]);
      }
    };

    if (selectedUserId) {
      fetchMessages();
    }
  }, [selectedUserId]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (messageData) => {
    if (socket && messageData.content.trim() && selectedUserId) {
      const messageToSend = {
        ...messageData,
        receiver: selectedUserId,
        sender: user.id,
        senderName: user.username,
        senderAvatar: user.avatar,
        timestamp: new Date().toISOString(),
        messageType: 'text'
      };
      
      socket.emit('sendMessage', messageToSend);
    }
  };

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
    const user = allUsers.find(u => u._id === userId);
    setSelectedUser(user);
  };

  const handleNewChat = () => {
    // For now, just show the user list
    // In a real app, this might open a modal to start a new conversation
    console.log('New chat clicked');
  };

  const handleLogout = () => {
    if (socket) {
      socket.disconnect();
    }
    logout();
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      className="chat-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Left Sidebar - Chat List */}
      <ChatList
        currentUser={user}
        selectedUserId={selectedUserId}
        onUserSelect={handleUserSelect}
        onNewChat={handleNewChat}
      />

      {/* Right Side - Chat Area */}
      <div className="chat-main">
        {selectedUserId ? (
          <>
            <ChatHeader
              user={selectedUser}
              onLogout={handleLogout}
              isPrivateChat={true}
            />

            <ChatMessages
              messages={messages}
              currentUser={user}
              messagesEndRef={messagesEndRef}
            />

            <ChatInput
              onSendMessage={sendMessage}
              currentUser={user}
              disabled={!selectedUserId}
            />
          </>
        ) : (
          <div className="no-chat-selected">
            <div className="no-chat-content">
              <h2>Welcome to Chat App</h2>
              <p>Select a user from the left to start chatting</p>
              <div className="welcome-features">
                <div className="feature">
                  <span className="feature-icon">💬</span>
                  <span>Real-time messaging</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">👥</span>
                  <span>Private conversations</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🟢</span>
                  <span>Online status</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Chat;
