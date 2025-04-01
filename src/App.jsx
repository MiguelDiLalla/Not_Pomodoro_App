import React from 'react';
import TitlePanel from './components/TitlePanel';
import ButtonsPanel from './components/ButtonsPanel';
import HistorySidebar from './components/HistorySidebar';
import AnimatedBackground from './components/AnimatedBackground';
import { TimerProvider } from './context/TimerContext';
import NotificationManager from './components/NotificationManager';

function App() {
  return (
    <TimerProvider>
      <div className="relative h-screen w-screen overflow-hidden bg-gray-900 text-white">
        <AnimatedBackground />
        
        <div className="relative z-10 grid h-full w-full grid-cols-1 md:grid-cols-[1fr,auto,1fr] md:gap-4 md:p-4">
          {/* Left panel - Title and description */}
          <div className="flex items-center justify-center p-4 md:justify-end">
            <TitlePanel />
          </div>
          
          {/* Center panel - Buttons and controls */}
          <div className="flex items-center justify-center p-4">
            <ButtonsPanel />
          </div>
          
          {/* Right panel - History sidebar */}
          <div className="hidden md:flex md:items-center md:justify-start md:p-4">
            <HistorySidebar />
          </div>
        </div>
        
        <NotificationManager />
      </div>
    </TimerProvider>
  );
}

export default App;