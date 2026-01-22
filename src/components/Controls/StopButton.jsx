import { useAudio } from '../../context/AudioContext';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import './Controls.scss';

function StopButton() {
  const { currentTrack } = useAudio();
  const { stop } = useAudioPlayer();

  return (
    <button
      className="control-btn control-btn--stop"
      onClick={stop}
      disabled={!currentTrack}
      aria-label="Stop"
      title="Stop"
    >
      <svg className="control-btn__icon" viewBox="0 0 24 24" fill="currentColor">
        <rect x="6" y="6" width="12" height="12" rx="1" />
      </svg>
    </button>
  );
}

export default StopButton;
