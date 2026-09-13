import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import NewPage from './pages/NewPage';
import OldPage from './pages/OldPage';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<NewPage />} />
        <Route path="/old" element={<OldPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
