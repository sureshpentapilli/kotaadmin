import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaBell, FaEnvelope, FaUser, FaSearch } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="header-search">
        <div className="search-input">
          <input type="text" placeholder="Search..." />
          <FaSearch className="search-icon" />
        </div>
      </div>
      
      <div className="header-right">
        <div className="header-icons">
          <Dropdown align="end">
            <Dropdown.Toggle as="div" className="notification-icon">
              <div className="icon-badge">3</div>
              <FaBell />
            </Dropdown.Toggle>
            <Dropdown.Menu className="notification-dropdown">
              <Dropdown.Item href="#">
                <div className="notification-item">
                  <div className="notification-icon alert-primary">
                    <FaUser />
                  </div>
                  <div className="notification-content">
                    <div className="notification-title">New NGO Registered</div>
                    <div className="notification-time">5 minutes ago</div>
                  </div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item href="#">
                <div className="notification-item">
                  <div className="notification-icon alert-success">
                    <FaUser />
                  </div>
                  <div className="notification-content">
                    <div className="notification-title">NGO Status Updated</div>
                    <div className="notification-time">1 hour ago</div>
                  </div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item href="#">
                <div className="notification-item">
                  <div className="notification-icon alert-danger">
                    <FaUser />
                  </div>
                  <div className="notification-content">
                    <div className="notification-title">System Alert</div>
                    <div className="notification-time">Yesterday</div>
                  </div>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
          <Dropdown align="end">
            <Dropdown.Toggle as="div" className="notification-icon">
              <div className="icon-badge">7</div>
              <FaEnvelope />
            </Dropdown.Toggle>
            <Dropdown.Menu className="notification-dropdown">
              <Dropdown.Item href="#">New message from Priya</Dropdown.Item>
              <Dropdown.Item href="#">New message from Rahul</Dropdown.Item>
              <Dropdown.Item href="#">New message from Admin</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        
        <div className="header-divider"></div>
        
        <Dropdown align="end">
          <Dropdown.Toggle as="div" className="user-profile">
            <img
              src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Admin User"
              className="user-avatar"
            />
            <span className="user-name d-none d-md-inline-block">Admin User</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#">Profile</Dropdown.Item>
            <Dropdown.Item href="#">Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;