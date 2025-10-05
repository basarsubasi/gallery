import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import SingleImagePage from './pages/SingleImagePage';
import Layout from './components/Layout';
import BwPhotos from './pages/BwPhotos';
import ColorPhotos from './pages/ColorPhotos';



const App: React.FC = () => {
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
