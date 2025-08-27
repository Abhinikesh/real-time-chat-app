import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiUsers, FiX, FiCircle } from 'react-icons/fi';
import './ChatSidebar.css';

const ChatSidebar = ({
  isOpen,
  onClose,
  onlineUsers,
  currentUser,
  onUserSelect,
  selectedUserId,
  unreadCounts
}) => {
  const handleUserSelect = (userId) => {
    onUserSelect(userId);
    onClose();
  };

  const renderOnlineUsers = () => {
    if (!onlineUsers || onlineUsers.length === 0) {
      return (
        <div className="sidebar-empty-state">
          <FiUsers className="empty-icon" />
          <p>No users online</p>
        </div>
      );
    }

    return (
      <div className="online-users-list">
        {onlineUsers.map((user) => (
          <motion.div
            key={user.id}
            className={`user-item ${selectedUserId === user.id ? 'selected' : ''}`}
            onClick={() => handleUserSelect(user.id)}
            whileHover={{ backgroundColor: 'var(--bg-hover)' }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="user-avatar">
              {user.avatar ? (
                <img src={user.avatar} alt={user.username} />
              ) : (
                <FiUser />
              )}
              <div className={`online-indicator ${user.online ? 'online' : 'offline'}`}>
                <FiCircle />
              </div>
            </div>

            <div className="user-info">
              <div className="user-name">{user.username}</div>
              <div className="user-status">
                {user.online ? 'Online' : 'Offline'}
              </div>
            </div>

            {unreadCounts[user.id] > 0 && (
              <div className="unread-badge">
                {unreadCounts[user.id]}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="chat-sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="sidebar-header">
              <h2>Online Users</h2>
              <button className="close-button" onClick={onClose}>
                <FiX />
              </button>
            </div>

            {/* Content */}
            <div className="sidebar-content">
              {renderOnlineUsers()}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatSidebar;
