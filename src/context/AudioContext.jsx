import { createContext, useContext, useReducer, useRef, useCallback } from 'react';

// Initial state
const initialState = {
  playlist: [],
  currentTrackIndex: 0,
  isPlaying: false,
  volume: 0.7,
  currentTime: 0,
  duration: 0,
  isLoading: false,
};

// Action types
const ACTIONS = {
  SET_PLAYLIST: 'SET_PLAYLIST',
  ADD_TRACKS: 'ADD_TRACKS',
  REMOVE_TRACK: 'REMOVE_TRACK',
  SET_CURRENT_TRACK: 'SET_CURRENT_TRACK',
  SET_PLAYING: 'SET_PLAYING',
  SET_VOLUME: 'SET_VOLUME',
  SET_CURRENT_TIME: 'SET_CURRENT_TIME',
  SET_DURATION: 'SET_DURATION',
  SET_LOADING: 'SET_LOADING',
  NEXT_TRACK: 'NEXT_TRACK',
  PREV_TRACK: 'PREV_TRACK',
};

// Reducer
function audioReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_PLAYLIST:
      return { ...state, playlist: action.payload, currentTrackIndex: 0 };

    case ACTIONS.ADD_TRACKS:
      return { ...state, playlist: [...state.playlist, ...action.payload] };

    case ACTIONS.REMOVE_TRACK:
      const newPlaylist = state.playlist.filter((_, i) => i !== action.payload);
      let newIndex = state.currentTrackIndex;
      if (action.payload < state.currentTrackIndex) {
        newIndex = Math.max(0, state.currentTrackIndex - 1);
      } else if (action.payload === state.currentTrackIndex && newIndex >= newPlaylist.length) {
        newIndex = Math.max(0, newPlaylist.length - 1);
      }
      return { ...state, playlist: newPlaylist, currentTrackIndex: newIndex };

    case ACTIONS.SET_CURRENT_TRACK:
      return { ...state, currentTrackIndex: action.payload, currentTime: 0 };

    case ACTIONS.SET_PLAYING:
      return { ...state, isPlaying: action.payload };

    case ACTIONS.SET_VOLUME:
      return { ...state, volume: action.payload };

    case ACTIONS.SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload };

    case ACTIONS.SET_DURATION:
      return { ...state, duration: action.payload };

    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };

    case ACTIONS.NEXT_TRACK:
      if (state.playlist.length === 0) return state;
      const nextIndex = (state.currentTrackIndex + 1) % state.playlist.length;
      return { ...state, currentTrackIndex: nextIndex, currentTime: 0 };

    case ACTIONS.PREV_TRACK:
      if (state.playlist.length === 0) return state;
      const prevIndex = state.currentTrackIndex === 0
        ? state.playlist.length - 1
        : state.currentTrackIndex - 1;
      return { ...state, currentTrackIndex: prevIndex, currentTime: 0 };

    default:
      return state;
  }
}

// Create context
const AudioContext = createContext(null);

// Provider component
export function AudioProvider({ children }) {
  const [state, dispatch] = useReducer(audioReducer, initialState);
  const audioRef = useRef(null);

  // Action creators
  const setPlaylist = useCallback((tracks) => {
    dispatch({ type: ACTIONS.SET_PLAYLIST, payload: tracks });
  }, []);

  const addTracks = useCallback((tracks) => {
    dispatch({ type: ACTIONS.ADD_TRACKS, payload: tracks });
  }, []);

  const removeTrack = useCallback((index) => {
    dispatch({ type: ACTIONS.REMOVE_TRACK, payload: index });
  }, []);

  const setCurrentTrack = useCallback((index) => {
    dispatch({ type: ACTIONS.SET_CURRENT_TRACK, payload: index });
  }, []);

  const setPlaying = useCallback((isPlaying) => {
    dispatch({ type: ACTIONS.SET_PLAYING, payload: isPlaying });
  }, []);

  const setVolume = useCallback((volume) => {
    dispatch({ type: ACTIONS.SET_VOLUME, payload: volume });
  }, []);

  const setCurrentTime = useCallback((time) => {
    dispatch({ type: ACTIONS.SET_CURRENT_TIME, payload: time });
  }, []);

  const setDuration = useCallback((duration) => {
    dispatch({ type: ACTIONS.SET_DURATION, payload: duration });
  }, []);

  const setLoading = useCallback((isLoading) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: isLoading });
  }, []);

  const nextTrack = useCallback(() => {
    dispatch({ type: ACTIONS.NEXT_TRACK });
  }, []);

  const prevTrack = useCallback(() => {
    dispatch({ type: ACTIONS.PREV_TRACK });
  }, []);

  // Current track helper
  const currentTrack = state.playlist[state.currentTrackIndex] || null;

  const value = {
    // State
    ...state,
    currentTrack,
    audioRef,

    // Actions
    setPlaylist,
    addTracks,
    removeTrack,
    setCurrentTrack,
    setPlaying,
    setVolume,
    setCurrentTime,
    setDuration,
    setLoading,
    nextTrack,
    prevTrack,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

// Custom hook
export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}

export default AudioContext;
