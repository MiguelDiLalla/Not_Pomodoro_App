import React from 'react';
import '../styles/animations.css';

const AnimatedBackground = ({ mode = 'paused' }) => {
  // Determine blob color based on mode prop
  const blobClassName = mode === 'running' ? 'bg-orange-400/40' : 'bg-red-400/40';
  
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-gray-900">
      {/* Base teal layer */}
      <div className="absolute inset-0 bg-teal-600/30"></div>
      
      {/* Animated red blobs - aria-hidden for accessibility */}
      <div className="blob-container" aria-hidden="true" data-mode={mode}>
        {/* First blob - moves left to right */}
        <div className={`blob blob-1 ${blobClassName}`}></div>
        
        {/* Second blob - counter movement */}
        <div className={`blob blob-2 ${blobClassName}`}></div>
      </div>
    </div>
  );
};

export default AnimatedBackground;