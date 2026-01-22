import { useAudio } from '../../context/AudioContext';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import './Controls.scss';

function SkipButtons() {
  const { playlist, prevTrack, nextTrack, setCurrentTrack, currentTrackIndex } = useAudio();
  const { play } = useAudioPlayer();

  const canSkip = playlist.length > 1;

  const handlePrev = () => {
    prevTrack();
  };

  const handleNext = () => {
    nextTrack();
  };

  return (
    <div className="skip-buttons">
      <button
        className="control-btn control-btn--skip"
        onClick={handlePrev}
        disabled={!canSkip}
        aria-label="Previous track"
        title="Previous"
      >
        <svg className="control-btn__icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
        </svg>
      </button>

      <button
        className="control-btn control-btn--skip"
        onClick={handleNext}
        disabled={!canSkip}
        aria-label="Next track"
        title="Next"
      >
        <svg className="control-btn__icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 18l8.5-6L6 6v12zm2 0V6l6.5 6L8 18zm8 0h2V6h-2v12z" />
        </svg>
      </button>
    </div>
  );
}

export default SkipButtons;
