import React from 'react'

export default function RunPauseButton({ isRunning, setIsRunning }) {
  const handleClick = () => {
    setIsRunning(prev => !prev)
  }

  return (
    <button
      onClick={handleClick}
      className={`px-8 py-4 rounded-2xl font-bold text-xl shadow-lg transition-all duration-300 ${
        isRunning
          ? 'bg-red-400 hover:bg-red-500'
          : 'bg-teal-600 hover:bg-teal-700'
      }`}
    >
      {isRunning ? 'Pause' : 'Run'}
    </button>
  )
}
