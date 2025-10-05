import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import SingleImagePage from './pages/SingleImagePage';
import Layout from './components/Layout';
import BwPhotos from './pages/BwPhotos';
import ColorPhotos from './pages/ColorPhotos';
import AuthModal from './components/AuthModal';
import { useAuth } from './hooks/useAuth';



const App: React.FC = () => {
  const { isAuthenticated, authenticate } = useAuth();

  // Show nothing while checking authentication status
  if (isAuthenticated === null) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Loading...</p>
      </div>
    );
  }

  // Show auth modal if not authenticated
  if (!isAuthenticated) {
    return <AuthModal onAuthenticate={authenticate} />;
  }

  // Show the app if authenticated
  return (
    <Router>
      <Layout>
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/image/:uuid" element={<SingleImagePage />} />
        <Route path="/bw-photos" element={<BwPhotos />} />
        <Route path="/color-photos" element={<ColorPhotos />} />
      </Routes>
      </Layout>
    </Router>
  );
};

export default App;
