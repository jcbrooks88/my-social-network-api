import React from 'react';
import Navbar from './Navbar';
import UserInfo from './UserInfo';  // Import UserInfo component
import '../assets/blogLayout.css';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout-container">
      {/* Header with Navbar */}
      <header className="header">
        <Navbar /> {/* The Navbar component handles login/logout */}
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="user-info">
          {/* Display UserInfo or login form based on authentication */}
          <UserInfo />
        </div>
        {children}
      </main>

      {/* Footer */}
      <footer className="footer">
        &copy; 2025 Quirky Blog
      </footer>
    </div>
  );
};

export default MainLayout;

