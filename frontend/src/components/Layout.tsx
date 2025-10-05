import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      {/* Header */}
      <header className="page-header">
  <Link to="/" className="main-title">basarsubasi's <span className="title-photos">photos</span></Link>
  <Link to="/bw-photos">b&w</Link>
  <Link to="/color-photos">colored</Link>
</header>
      {/* Page Content */}
      <div className="content">{children}</div>
      
      {/* Footer */}
      <footer className="page-footer">
        2025 © başar subaşı | <a href="https://github.com/basarsubasi/gallery" target="_blank" rel="noopener noreferrer">source code</a>
      </footer>
    </div>
  );
};

export default Layout;
