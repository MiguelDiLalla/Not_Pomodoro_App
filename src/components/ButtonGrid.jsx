import React from 'react'

export default function ButtonGrid({ isRunning, times, onButtonClick }) {
  // Return early with placeholder buttons when not running
  if (!isRunning) {
    return (
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[...Array(7)].map((_, index) => (
          <button
            key={index}
            disabled
            className="px-4 py-3 rounded-xl shadow-md text-sm font-bold
                      bg-black/20 text-white/40 backdrop-blur-sm
                      border border-white/5 transition-all duration-300"
          >
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
      {times.map((value, index) => {
        // Random slight rotation for playful effect
        const rotation = Math.floor(Math.random() * 3 - 1);
        // Random subtle color variations
        const colorClass = [
          'from-white/20 to-white/5 hover:from-white/30 hover:to-white/10', 
          'from-red-400/20 to-red-500/5 hover:from-red-400/30 hover:to-red-500/10',
          'from-teal-400/20 to-teal-500/5 hover:from-teal-400/30 hover:to-teal-500/10'
        ][index % 3];
        
        return (
          <button
            key={index}
            onClick={() => {
              // Play click sound
              const click = new Audio('/sounds/click.mp3');
              click.volume = 0.3;
              click.play().catch(e => console.log('Audio play error:', e));
              
              onButtonClick(index);
            }}
            className={`
              relative px-5 py-4 rounded-xl shadow-lg text-base font-bold
              bg-gradient-to-br ${colorClass}
              backdrop-blur-sm border border-white/10
              transition-all duration-300 transform hover:scale-105 active:scale-95
              hover:shadow-xl hover:-translate-y-1 active:translate-y-0
            `}
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <div className="flex flex-col items-center">
              <span className="font-display text-lg">{Math.floor(value / 60000)}</span>
              <span className="text-xs opacity-70">minutes</span>
            </div>
            <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        )
      })}
    </div>
  )
}
