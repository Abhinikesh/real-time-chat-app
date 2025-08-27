import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';
import './ChatInput.css';

const ChatInput = ({ onSendMessage, currentUser }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim() && currentUser) {
      onSendMessage({
        content: message.trim(),
        sender: currentUser.id,
        senderName: currentUser.username,
        senderAvatar: currentUser.avatar,
        timestamp: new Date().toISOString(),
        messageType: 'text'
      });

      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      className="chat-input-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="chat-input-form">
        <div className="input-wrapper">
          {/* Message Input */}
          <div className="message-input-section">
            <textarea
              className="message-input"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              rows="1"
              maxLength="1000"
            />
          </div>

          {/* Send Button */}
          <div className="send-section">
            <button
              type="submit"
              className="send-button"
              disabled={!message.trim()}
              title="Send message"
            >
              <FiSend />
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default ChatInput;
