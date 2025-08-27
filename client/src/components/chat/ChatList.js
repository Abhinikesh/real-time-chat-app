import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiSearch, FiPlus } from 'react-icons/fi';
import axios from 'axios';
import './ChatList.css';

const ChatList = ({ 
  currentUser, 
  selectedUserId, 
  onUserSelect, 
  onNewChat 
}) => {
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAllUsers = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/auth/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Filter out current user and add online status
      const filteredUsers = response.data.users
        .filter(user => user._id !== currentUser.id)
        .map(user => ({
          ...user,
          online: user.isOnline
        }));
      
      setAllUsers(filteredUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, [currentUser.id]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const filteredUsers = allUsers.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserSelect = (user) => {
    onUserSelect(user._id);
  };

  const getLastMessage = (userId) => {
    // This would be implemented to show last message preview
    return "Click to start chatting...";
  };

  return (
    <div className="chat-list">
      {/* Header */}
      <div className="chat-list-header">
        <div className="user-profile">
          <div className="user-avatar">
            {currentUser.avatar ? (
              <img src={currentUser.avatar} alt={currentUser.username} />
            ) : (
              <FiUser />
            )}
          </div>
          <div className="user-info">
            <div className="user-name">{currentUser.username}</div>
            <div className="user-status">Online</div>
          </div>
        </div>
        <button className="new-chat-btn" onClick={onNewChat}>
          <FiPlus />
        </button>
      </div>

      {/* Search */}
      <div className="chat-list-search">
        <div className="search-input-wrapper">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Users List */}
      <div className="chat-list-content">
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading users...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="empty-state">
            <FiUser className="empty-icon" />
            <p>No users found</p>
          </div>
        ) : (
          <div className="users-list">
            {filteredUsers.map((user) => (
              <motion.div
                key={user._id}
                className={`user-item ${selectedUserId === user._id ? 'selected' : ''}`}
                onClick={() => handleUserSelect(user)}
                whileHover={{ backgroundColor: 'var(--bg-hover)' }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="user-avatar">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.username} />
                  ) : (
                    <FiUser />
                  )}
                  <div className={`online-indicator ${user.online ? 'online' : 'offline'}`}></div>
                </div>

                <div className="user-info">
                  <div className="user-name">{user.username}</div>
                  <div className="last-message">{getLastMessage(user._id)}</div>
                </div>

                <div className="user-meta">
                  <div className="user-status">
                    {user.online ? 'Online' : 'Offline'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
