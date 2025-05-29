import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaChartLine, FaCog, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={toggleSidebar}></div>
      <div className={`sidebar ${isOpen ? 'show' : ''}`}>
        <div className="sidebar-header">
          <h3 className="sidebar-brand">NGO Admin</h3>
          <button className="sidebar-close d-md-none" onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>
        
        <div className="sidebar-divider"></div>
        
        <ul className="sidebar-nav">
          <li className={`sidebar-item ${activeItem === 'dashboard' ? 'active' : ''}`}>
            <Link to="/" className="sidebar-link" onClick={() => handleItemClick('dashboard')}>
              <FaTachometerAlt className="sidebar-icon" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className={`sidebar-item ${activeItem === 'ngos' ? 'active' : ''}`}>
            <Link to="/" className="sidebar-link" onClick={() => handleItemClick('ngos')}>
              <FaUsers className="sidebar-icon" />
              <span>NGO Management</span>
            </Link>
          </li>
          <li className={`sidebar-item ${activeItem === 'analytics' ? 'active' : ''}`}>
            <Link to="/" className="sidebar-link" onClick={() => handleItemClick('analytics')}>
              <FaChartLine className="sidebar-icon" />
              <span>Analytics</span>
            </Link>
          </li>
          <li className={`sidebar-item ${activeItem === 'settings' ? 'active' : ''}`}>
            <Link to="/" className="sidebar-link" onClick={() => handleItemClick('settings')}>
              <FaCog className="sidebar-icon" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
        
        <div className="sidebar-divider"></div>
        
        <div className="sidebar-footer">
          <Link to="/" className="sidebar-link">
            <FaSignOutAlt className="sidebar-icon" />
            <span>Logout</span>
          </Link>
        </div>
      </div>

      <button className="sidebar-toggle d-md-none" onClick={toggleSidebar}>
        <FaBars />
      </button>
    </>
  );
};

export default Sidebar;