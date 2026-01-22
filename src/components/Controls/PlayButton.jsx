import { useAudio } from '../../context/AudioContext';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import './Controls.scss';

function PlayButton() {
  const { isPlaying, currentTrack, isLoading } = useAudio();
  const { togglePlay } = useAudioPlayer();

  const disabled = !currentTrack || isLoading;

  return (
    <button
      className={`control-btn control-btn--play ${isPlaying ? 'control-btn--active' : ''}`}
      onClick={togglePlay}
      disabled={disabled}
      aria-label={isPlaying ? 'Pause' : 'Play'}
      title={isPlaying ? 'Pause' : 'Play'}
    >
      {isLoading ? (
        <svg className="control-btn__icon control-btn__icon--loading" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" strokeDasharray="31.4" strokeDashoffset="10" />
        </svg>
      ) : isPlaying ? (
        <svg className="control-btn__icon" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
      ) : (
        <svg className="control-btn__icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
}

export default PlayButton;
