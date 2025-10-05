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
  <Link to="/" className="main-title">basarsubasi's photos</Link>
  <Link to="/bw-photos">b&w</Link>
  <Link to="/color-photos">colored</Link>
</header>
      {/* Page Content */}
      <div className="content">{children}</div>
      
      {/* Footer */}
      <footer className="page-footer">2025 © Başar Subaşı</footer>
    </div>
  );
};

export default Layout;
