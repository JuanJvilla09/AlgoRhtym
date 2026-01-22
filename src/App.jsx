import { useEffect } from 'react';
import { AudioProvider, useAudio } from './context/AudioContext';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import Turntable from './components/Turntable';
import { PlayButton, StopButton, SkipButtons, ProgressBar, VolumeSlider } from './components/Controls';
import FileUploader from './components/FileUploader';
import TrackInfo from './components/TrackInfo';
import Playlist from './components/Playlist';

function Controls() {
  return (
    <div className="controls">
      <div className="controls__buttons">
        <SkipButtons />
        <PlayButton />
        <StopButton />
      </div>
      <ProgressBar />
      <div className="controls__bottom">
        <VolumeSlider />
      </div>
    </div>
  );
}

function Player() {
  // Initialize audio player hook
  useAudioPlayer();

  return (
    <div className="player-section">
      <Turntable />
      <TrackInfo />
      <Controls />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="sidebar-section">
      <FileUploader />
      <Playlist />
    </div>
  );
}

function AppContent() {
  const { playlist, setCurrentTrack, currentTrackIndex } = useAudio();

  // Auto-select first track when playlist becomes non-empty
  useEffect(() => {
    if (playlist.length > 0 && currentTrackIndex === 0 && !playlist[0]) {
      setCurrentTrack(0);
    }
  }, [playlist, currentTrackIndex, setCurrentTrack]);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">
          Algo<span>Rhythm</span>
        </h1>
        <p className="app-subtitle">Music Player</p>
      </header>

      <main className="main-content">
        <Player />
        <Sidebar />
      </main>
    </div>
  );
}

function App() {
  return (
    <AudioProvider>
      <AppContent />
    </AudioProvider>
  );
}

export default App;
