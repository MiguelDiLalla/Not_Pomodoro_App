import React, { useState, useEffect } from 'react'
import RunPauseButton from './components/RunPauseButton'
import ButtonGrid from './components/ButtonGrid'
import NotificationManager from './components/NotificationManager'
import HiddenTimer from './components/HiddenTimer'

export default function App() {
  const [isRunning, setIsRunning] = useState(false)
  const [times, setTimes] = useState([]) // 8 total: 7 buttons + 1 hidden
  const [hiddenIndex, setHiddenIndex] = useState(null)
  const [elapsedList, setElapsedList] = useState([])
  const [totalElapsed, setTotalElapsed] = useState(0)
  const [sidebarVisible, setSidebarVisible] = useState(false)

  // Utility
  const generateRandomTime = () =>
    Math.floor(Math.random() * (21 - 2 + 1) + 2) * 60 * 1000

  // On "Run", generate new times
  useEffect(() => {
    if (isRunning && times.length === 0) {
      const newTimes = Array.from({ length: 8 }, () => generateRandomTime())
      const hidden = Math.floor(Math.random() * 8)
      setTimes(newTimes)
      setHiddenIndex(hidden)
    }
    if (!isRunning) {
      setTimes([])
      setHiddenIndex(null)
    }
  }, [isRunning])

  const handleButtonClick = (index) => {
    const newValue = generateRandomTime()
    const updated = [...times]
    updated[index] = newValue
    setTimes(updated)
    setHiddenIndex(index) // restart hidden timer to selected
  }

  const handleTimerEnd = (elapsedMs) => {
    setElapsedList((prev) => [...prev, elapsedMs])
    setTotalElapsed((prev) => prev + elapsedMs)

    // Auto-click a random button
    const buttonIndices = [...Array(8).keys()].filter(i => i !== hiddenIndex)
    const randomButton = buttonIndices[Math.floor(Math.random() * buttonIndices.length)]
    handleButtonClick(randomButton)
  }

  const hiddenDuration = times[hiddenIndex] || null
  const visibleTimes = times.filter((_, i) => i !== hiddenIndex)

  // Format total elapsed time nicely
  const formatTotalTime = () => {
    const hours = Math.floor(totalElapsed / 3600000)
    const minutes = Math.floor((totalElapsed % 3600000) / 60000)
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    } else {
      return `${minutes}m`
    }
  }

  return (
    <div className="relative min-h-screen font-sans bg-gradient-to-br from-red-400 via-pink-400 to-teal-600 text-white overflow-hidden">
      {/* Enhanced Procedural Background with more dynamic blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Primary larger blobs with the original animation */}
        <div className="absolute w-96 h-96 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob top-0 -left-24"></div>
        <div className="absolute w-[28rem] h-[28rem] bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 -top-12 right-0"></div>
        <div className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 bottom-0 left-1/3"></div>
        <div className="absolute w-[30rem] h-[30rem] bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 bottom-0 right-1/4"></div>
        
        {/* Secondary smaller blobs with the alternate animation */}
        <div className="absolute w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-alt animation-delay-3000 top-1/4 left-1/4"></div>
        <div className="absolute w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob-alt animation-delay-5000 bottom-1/4 right-1/3"></div>
        <div className="absolute w-48 h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-alt animation-delay-1000 top-1/3 right-1/4"></div>
        
        {/* Tertiary mini blobs with shorter animations */}
        <div className="absolute w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-blob-alt animation-delay-4000 top-2/3 left-1/4"></div>
        <div className="absolute w-36 h-36 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-blob animation-delay-3000 bottom-1/3 right-1/2"></div>
        
        {/* Noise texture overlay for organic grain effect */}
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-soft-light pointer-events-none"></div>
        
        {/* Subtle vignette effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10 pointer-events-none"></div>
      </div>
      
      {/* Sidebar (hoverable) with improved visibility */}
      <aside 
        className={`
          absolute top-0 right-0 h-full p-6 bg-black/70 backdrop-blur-md flex flex-col z-10 
          transition-all duration-300 ease-in-out rounded-l-2xl shadow-xl
          ${sidebarVisible ? 'w-64' : 'w-0 opacity-0'}
        `}
        onMouseEnter={() => setSidebarVisible(true)}
        onMouseLeave={() => setSidebarVisible(false)}
      >
        <h2 className="font-display text-xl mb-4">🕒 Flow Sessions</h2>
        
        {elapsedList.length > 0 ? (
          <ul className="space-y-2 overflow-auto flex-1 pr-2">
            {elapsedList.map((ms, i) => (
              <li key={i} className="p-2 bg-white/10 rounded-lg flex justify-between items-center">
                <span className="font-mono">{Math.floor(ms / 60000)}m {Math.floor((ms % 60000) / 1000)}s</span>
                <span className="text-xs opacity-60">#{i+1}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex-1 flex items-center justify-center text-sm opacity-60">
            <p>No sessions yet</p>
          </div>
        )}
        
        <div className="mt-auto pt-4 border-t border-white/20">
          <p className="font-semibold">Total Flow</p>
          <p className="text-2xl font-display text-teal-300">{formatTotalTime()}</p>
        </div>
      </aside>

      {/* Subtle visual cue to show sidebar */}
      <div 
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white/20 p-1 px-2 rounded-l-md cursor-pointer hover:bg-white/30 transition-all"
        onMouseEnter={() => setSidebarVisible(true)}
      >
        <span className="block rotate-90 text-xs opacity-90">history</span>
      </div>

      {/* Layout with improved spacing and glass morphism */}
      <main className="grid grid-rows-[auto_1fr] h-screen p-6 gap-6">
        {/* Panel 1: Info */}
        <section className="p-6 bg-black/20 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 transition-all">
          <h1 className="text-4xl font-display mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">FlowLoop</h1>
          <p className="text-lg max-w-2xl">
            This weird little app helps you stay focused by hiding time. Press <strong className="text-teal-300">Run</strong> to begin.
            {isRunning ? (
              <span className="block text-sm mt-2 opacity-75">A secret timer is ticking. Click any button to switch to it.</span>
            ) : (
              <span className="block text-sm mt-2 opacity-75">You'll see 7 mystery buttons. One timer is ticking. You won't know which until it ends...</span>
            )}
          </p>
        </section>

        {/* Panel 2: Buttons with improved visuals */}
        <section className="p-8 bg-black/30 backdrop-blur-sm rounded-2xl shadow-lg flex flex-col items-center justify-center border border-white/10 transition-all">
          <RunPauseButton isRunning={isRunning} setIsRunning={setIsRunning} />
          <ButtonGrid
            isRunning={isRunning}
            times={visibleTimes}
            onButtonClick={(index) => {
              // Adjust index for hidden exclusion
              const trueIndex = index >= hiddenIndex ? index + 1 : index
              handleButtonClick(trueIndex)
            }}
          />
          
          {/* Status indicator with animated pulse */}
          {isRunning && (
            <div className="mt-8 flex items-center">
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse mr-2"></div>
              <span className="text-sm font-semibold">Flow in progress</span>
            </div>
          )}
        </section>
      </main>

      <NotificationManager />
      <HiddenTimer
        duration={hiddenDuration}
        isRunning={isRunning}
        onTimerEnd={handleTimerEnd}
      />
      
      {/* Subtle footer */}
      <footer className="absolute bottom-2 right-2 text-xs opacity-40">
        <p>FlowLoop • weird time tracking</p>
      </footer>
    </div>
  )
}
