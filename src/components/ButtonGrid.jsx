import React from 'react'

export default function ButtonGrid({ isRunning, times, onButtonClick }) {
  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
      {times.map((value, index) => (
        <button
          key={index}
          onClick={() => onButtonClick(index)}
          className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl shadow-md text-sm"
          disabled={!isRunning}
        >
          {isRunning ? `${Math.floor(value / 60000)} min` : '🔒'}
        </button>
      ))}
    </div>
  )
}
