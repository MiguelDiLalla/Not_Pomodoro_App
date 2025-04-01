import React from 'react'

export default function RunPauseButton({ isRunning, setIsRunning }) {
  const handleClick = () => {
    // Play click sound
    const click = new Audio('/sounds/click.mp3');
    click.volume = 0.4;
    click.play().catch(e => console.log('Audio play error:', e));
    
    setIsRunning(prev => !prev)
  }

  return (
    <button
      onClick={handleClick}
      className={`
        group relative overflow-hidden px-10 py-5 rounded-2xl font-display text-2xl shadow-xl 
        transition-all duration-300 transform hover:scale-105 active:scale-95
        ${isRunning
          ? 'bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600'
          : 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700'
        }
      `}
      aria-label={isRunning ? "Pause timer" : "Start timer"}
    >
      {/* Inner glow effect */}
      <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      
      {/* Button text with animated dots for "run" state */}
      <span className="relative z-10 flex items-center justify-center">
        {isRunning ? (
          'Pause'
        ) : (
          <>
            Run
            <span className="ml-1 relative flex h-3">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-white opacity-75 -right-6 bottom-1"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white -right-6 bottom-1"></span>
            </span>
          </>
        )}
      </span>
    </button>
  )
}
