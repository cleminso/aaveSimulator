import React from 'react';
import SidePanel from './components/SidePanel';
import TopBar from './components/TopBar';
import MainContent from './components/MainContent';

const App: React.FC = () => {
  return (
    <div className="flex h-screen">
      <SidePanel />
      <div className="flex flex-col flex-1 ml-6">
        <TopBar />
        <div className="mt-6">
          <MainContent />
        </div>
      </div>
    </div>
  );
};

export default App;
