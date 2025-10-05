import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddPhotoModal from './AddPhotoModal';
import '../styles/Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);

  const handlePhotoAdded = () => {
    // Refresh the page to show the new photo
    window.location.reload();
  };

  return (
    <div className="layout">
      {/* Header */}
      <header className="page-header">
        <Link to="/" className="main-title">basarsubasi's <span className="title-photos">photos (interface)</span></Link>
        <div className="header-links">
          <Link to="/bw-photos">b&w</Link>
          <Link to="/color-photos">colored</Link>
          <button className="add-photo-button" onClick={() => setShowAddPhotoModal(true)}>
            add photos
          </button>
        </div>
      </header>
      
      {/* Page Content */}
      <div className="content">{children}</div>
      
      {/* Footer */}
      <footer className="page-footer">
        2025 © başar subaşı | <a href="https://github.com/basarsubasi/gallery" target="_blank" rel="noopener noreferrer">source code</a>
      </footer>

      {/* Add Photo Modal */}
      {showAddPhotoModal && (
        <AddPhotoModal
          onClose={() => setShowAddPhotoModal(false)}
          onSuccess={handlePhotoAdded}
        />
      )}
    </div>
  );
};

export default Layout;
