import { useEffect, useCallback, useRef } from 'react';
import { useAudio } from '../context/AudioContext';

export function useAudioPlayer() {
  const {
    audioRef,
    currentTrack,
    isPlaying,
    volume,
    setPlaying,
    setCurrentTime,
    setDuration,
    setLoading,
    nextTrack,
  } = useAudio();

  const isInitializedRef = useRef(false);

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'metadata';
    }

    const audio = audioRef.current;

    // Event handlers
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setLoading(false);
    };

    const handleEnded = () => {
      nextTrack();
    };

    const handlePlay = () => {
      setPlaying(true);
    };

    const handlePause = () => {
      setPlaying(false);
    };

    const handleWaiting = () => {
      setLoading(true);
    };

    const handleCanPlay = () => {
      setLoading(false);
    };

    const handleError = (e) => {
      console.error('Audio error:', e);
      setLoading(false);
      setPlaying(false);
    };

    // Attach event listeners
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    isInitializedRef.current = true;

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, [audioRef, setCurrentTime, setDuration, setLoading, setPlaying, nextTrack]);

  // Load track when currentTrack changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    setLoading(true);
    audio.src = currentTrack.url;
    audio.load();

    // Auto-play if was playing
    if (isPlaying) {
      audio.play().catch(console.error);
    }
  }, [currentTrack, audioRef, setLoading]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef]);

  // Play/Pause control
  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    audio.play().catch(console.error);
  }, [audioRef, currentTrack]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
  }, [audioRef]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);
    setPlaying(false);
  }, [audioRef, setCurrentTime, setPlaying]);

  // Seek to specific time
  const seek = useCallback((time) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = time;
    setCurrentTime(time);
  }, [audioRef, setCurrentTime]);

  // Seek by percentage (0-1)
  const seekPercent = useCallback((percent) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    const time = percent * audio.duration;
    seek(time);
  }, [seek]);

  return {
    play,
    pause,
    togglePlay,
    stop,
    seek,
    seekPercent,
  };
}

export default useAudioPlayer;
