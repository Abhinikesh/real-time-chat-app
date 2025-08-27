import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { FiUser } from 'react-icons/fi';
import './ChatMessages.css';

const ChatMessages = ({ messages, currentUser, messagesEndRef }) => {
  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, messagesEndRef]);

  const formatTime = (timestamp) => {
    try {
      return format(new Date(timestamp), 'HH:mm');
    } catch (error) {
      return '--:--';
    }
  };

  const isOwnMessage = (message) => {
    return message.sender === currentUser.id;
  };

  const renderMessage = (message, index) => {
    const ownMessage = isOwnMessage(message);

    return (
      <motion.div
        key={index}
        className={`message ${ownMessage ? 'own-message' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="message-avatar">
          {message.senderAvatar ? (
            <img src={message.senderAvatar} alt={message.senderName} />
          ) : (
            <FiUser />
          )}
        </div>

        <div className="message-content">
          <div className="message-bubble">
            <div className="message-sender">{message.senderName}</div>
            <div className="message-text">{message.content}</div>
            <div className="message-time">{formatTime(message.timestamp)}</div>
          </div>
        </div>
      </motion.div>
    );
  };

  if (messages.length === 0) {
    return (
      <div className="chat-messages">
        <div className="messages-container">
          <div className="empty-state">
            <FiUser className="empty-icon" />
            <h3>No messages yet</h3>
            <p>Start the conversation by sending your first message!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-messages">
      <div className="messages-container">
        <AnimatePresence>
          {messages.map((message, index) => renderMessage(message, index))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
