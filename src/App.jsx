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

  return (
    <div className="relative min-h-screen font-sans bg-gradient-to-br from-red-400 to-teal-600 text-white">
      {/* Procedural Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-96 h-96 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob top-0 left-0"></div>
        <div className="absolute w-96 h-96 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 top-0 right-0"></div>
        <div className="absolute w-96 h-96 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 bottom-0 left-1/3"></div>
      </div>
      
      {/* Sidebar (hoverable) */}
      <aside className="absolute top-0 right-0 h-full w-64 p-4 bg-black/70 text-sm backdrop-blur-md hidden hover:flex flex-col z-10 transition-all duration-300 ease-in-out">
        <h2 className="font-bold mb-2">🕒 Elapsed</h2>
        <ul className="space-y-1">
          {elapsedList.map((ms, i) => (
            <li key={i}>{Math.floor(ms / 60000)}m {Math.floor((ms % 60000) / 1000)}s</li>
          ))}
        </ul>
        <div className="mt-auto pt-4 border-t border-white/20">
          <p className="mt-2 font-semibold">Total: {Math.floor(totalElapsed / 60000)}m</p>
        </div>
      </aside>

      {/* Layout */}
      <main className="grid grid-rows-[auto_1fr] h-screen p-4">
        {/* Panel 1: Info */}
        <section className="mb-4 p-4 bg-black/20 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-display mb-2">Welcome to Chronolotto</h1>
          <p className="text-base">
            This weird little app helps you stay focused by hiding time. Press <strong>Run</strong> to begin.
            You'll see 7 mystery buttons. One timer is ticking. You won't know which until it ends...
          </p>
        </section>

        {/* Panel 2: Buttons */}
        <section className="p-4 bg-black/30 rounded-2xl shadow-lg flex flex-col items-center justify-center">
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
        </section>
      </main>

      <NotificationManager />
      <HiddenTimer
        duration={hiddenDuration}
        isRunning={isRunning}
        onTimerEnd={handleTimerEnd}
      />
    </div>
  )
}
