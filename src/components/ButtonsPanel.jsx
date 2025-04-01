import React from 'react';
import ButtonGrid from './ButtonGrid';
import RunPauseButton from './RunPauseButton';

const ButtonsPanel = ({ 
  mode = 'paused', 
  onRunPauseClick, 
  buttonValues = [], 
  onButtonClick 
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-gray-800/70 rounded-2xl">
      <div className="w-full max-w-xs flex flex-col gap-4">
        {/* Button grid containing the random time intervals */}
        <ButtonGrid 
          buttonValues={buttonValues}
          onButtonClick={onButtonClick}
          mode={mode}
        />
        
        {/* Divider */}
        <div className="w-full border-t border-gray-600 my-2"></div>
        
        {/* Run/Pause button */}
        <RunPauseButton 
          mode={mode}
          onClick={onRunPauseClick}
        />
      </div>
    </div>
  );
};

export default ButtonsPanel;