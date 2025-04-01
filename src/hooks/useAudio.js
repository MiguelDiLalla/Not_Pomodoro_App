import { useEffect, useRef } from 'react';

/**
 * Custom hook for handling audio playback
 * @param {string} src - Path to the audio file
 * @param {Object} options - Audio options
 * @returns {Object} - Audio controls
 */
const useAudio = (src, options = {}) => {
  const audioRef = useRef(null);
  
  useEffect(() => {
    // Create audio element on mount
    audioRef.current = new Audio(src);
    
    // Apply options
    if (options.volume) {
      audioRef.current.volume = options.volume;
    }
    
    if (options.preload) {
      audioRef.current.preload = options.preload;
    }
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [src, options.volume, options.preload]);
  
  // Play the sound with a slight volume ramp for smoother playback
  const play = () => {
    if (!audioRef.current) return;
    
    // Reset audio to start
    audioRef.current.currentTime = 0;
    
    // Play the audio
    const playPromise = audioRef.current.play();
    
    // Handle play() promise (required for some browsers)
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn('Audio playback was prevented:', error);
      });
    }
  };
  
  return { play };
};

export default useAudio;