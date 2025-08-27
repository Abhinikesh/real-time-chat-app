import React from 'react';
import { motion } from 'framer-motion';
import { FiLogOut, FiUser } from 'react-icons/fi';
import './ChatHeader.css';

const ChatHeader = ({ user, onLogout, isPrivateChat = false }) => {
  return (
    <motion.div
      className="chat-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="header-left">
        <div className="chat-title">
          {isPrivateChat ? (
            <>
              <div className="chat-user-info">
                <div className="chat-user-avatar">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.username} />
                  ) : (
                    <FiUser />
                  )}
                </div>
                <div className="chat-user-details">
                  <h3>{user?.username || 'Unknown User'}</h3>
                  <span className="user-status">
                    {user?.online ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <h2>Chat App</h2>
          )}
        </div>
      </div>

      <div className="header-right">
        <button className="logout-button" onClick={onLogout}>
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ChatHeader;
