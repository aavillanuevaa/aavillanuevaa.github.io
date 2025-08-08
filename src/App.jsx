import React from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './App.css';

const App = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Component */}
      <MainContent />
    </div>
  );
};

export default App;
