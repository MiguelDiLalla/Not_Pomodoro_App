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
  const [notification, setNotification] = useState(null)

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

    // Add a notification to the sidebar
    const notificationMsg = `Completed a ${Math.floor(elapsedMs / 60000)}m ${Math.floor((elapsedMs % 60000) / 1000)}s flow session`;
    setNotification({
      message: notificationMsg,
      time: new Date().toLocaleTimeString(),
      id: Date.now()
    });

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
    <div className="relative min-h-screen font-sans bg-gradient-to-br from-red-400 via-pink-400 to-teal-600 text-white overflow-hidden flex">
      {/* Enhanced Procedural Background with dynamic blobs */}
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
        
        {/* Noise texture overlay for organic grain effect */}
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-soft-light pointer-events-none"></div>
      </div>
      
      {/* Main content area - centered panels */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-4xl w-full flex flex-col md:flex-row gap-6 p-6">
          {/* Panel 1: Info Panel */}
          <section className="flex-1 p-6 bg-black/30 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 transition-all max-w-md mx-auto md:mx-0">
            <h1 className="text-4xl font-display mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">FlowLoop</h1>
            <p className="text-lg">
              This weird little app helps you stay focused by hiding time. Press <strong className="text-teal-300">Run</strong> to begin.
              {isRunning ? (
                <span className="block text-sm mt-2 opacity-75">A secret timer is ticking. Click any button to switch to it.</span>
              ) : (
                <span className="block text-sm mt-2 opacity-75">You'll see 7 mystery buttons. One timer is ticking. You won't know which until it ends...</span>
              )}
            </p>
          </section>

          {/* Panel 2: Button Panel */}
          <section className="flex-1 p-6 bg-black/40 backdrop-blur-md rounded-2xl shadow-xl flex flex-col items-center justify-center border border-white/10 transition-all max-w-md mx-auto md:mx-0">
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
              <div className="mt-4 flex items-center">
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse mr-2"></div>
                <span className="text-sm font-semibold">Flow in progress</span>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Sidebar for history and notifications - now always visible on desktop, toggle on mobile */}
      <aside 
        className={`
          fixed md:relative top-0 right-0 h-full w-64 bg-black/70 backdrop-blur-lg flex flex-col z-20
          transition-all duration-300 ease-in-out shadow-2xl
          ${sidebarVisible ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-5 border-b border-white/10">
          <h2 className="font-display text-xl">🕒 Flow History</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {/* Notifications Section */}
          {notification && (
            <div className="mb-6">
              <h3 className="text-sm uppercase tracking-wider opacity-70 mb-2">Last Notification</h3>
              <div className="p-3 bg-teal-600/30 rounded-lg border border-teal-500/20 mb-2">
                <p className="text-sm">{notification.message}</p>
                <p className="text-xs opacity-60 mt-1">{notification.time}</p>
              </div>
            </div>
          )}
          
          {/* Session History Section */}
          <h3 className="text-sm uppercase tracking-wider opacity-70 mb-2">Session History</h3>
          {elapsedList.length > 0 ? (
            <ul className="space-y-2">
              {elapsedList.map((ms, i) => (
                <li key={i} className="p-2 bg-white/10 rounded-lg flex justify-between items-center">
                  <span>{Math.floor(ms / 60000)}m {Math.floor((ms % 60000) / 1000)}s</span>
                  <span className="text-xs opacity-60">#{elapsedList.length - i}</span>
                </li>
              )).reverse()}
            </ul>
          ) : (
            <div className="flex items-center justify-center text-sm opacity-60 py-4">
              <p>No sessions yet</p>
            </div>
          )}
        </div>
        
        {/* Total Stats */}
        <div className="p-4 bg-black/30 border-t border-white/10">
          <p className="font-semibold">Total Flow Time</p>
          <p className="text-2xl font-display text-teal-300">{formatTotalTime()}</p>
        </div>
      </aside>

      {/* Mobile toggle for sidebar */}
      <button 
        className="md:hidden fixed z-30 top-4 right-4 bg-black/60 text-white p-2 rounded-full"
        onClick={() => setSidebarVisible(!sidebarVisible)}
      >
        {sidebarVisible ? 
          <span>✕</span> : 
          <span>📊</span>
        }
      </button>

      <NotificationManager />
      <HiddenTimer
        duration={hiddenDuration}
        isRunning={isRunning}
        onTimerEnd={handleTimerEnd}
      />
    </div>
  )
}
