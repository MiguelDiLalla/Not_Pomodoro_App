/**
 * Timer utility functions for FlowLoops
 */

/**
 * Generate a random time between 2-21 minutes in milliseconds
 * @returns {number} Random time in milliseconds
 */
export const generateRandomTime = () => {
  // Min: 2 minutes (120,000ms), Max: 21 minutes (1,260,000ms)
  const minTimeMs = 120000; 
  const maxTimeMs = 1260000;
  
  // Generate random value
  return Math.floor(Math.random() * (maxTimeMs - minTimeMs + 1)) + minTimeMs;
};

/**
 * Format milliseconds into a readable time string (MM:SS)
 * @param {number} ms Milliseconds to format
 * @returns {string} Formatted time string
 */
export const formatTime = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Format milliseconds into a human-readable duration
 * @param {number} ms Milliseconds to format
 * @returns {string} Formatted duration (e.g., "5m 30s")
 */
export const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  
  if (minutes === 0) {
    return `${seconds}s`;
  }
  
  return `${minutes}m ${seconds}s`;
};

/**
 * Calculate total time from an array of time values
 * @param {number[]} times Array of time values in milliseconds
 * @returns {number} Sum of all times
 */
export const calculateTotalTime = (times) => {
  return times.reduce((total, time) => total + time, 0);
};