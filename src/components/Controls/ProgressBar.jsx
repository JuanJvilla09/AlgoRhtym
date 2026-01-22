import { useRef, useCallback } from 'react';
import { useAudio } from '../../context/AudioContext';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import './Controls.scss';

function formatTime(seconds) {
  if (!seconds || !isFinite(seconds)) return '0:00';

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function ProgressBar() {
  const { currentTime, duration, currentTrack } = useAudio();
  const { seekPercent } = useAudioPlayer();
  const progressRef = useRef(null);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleClick = useCallback((e) => {
    if (!progressRef.current || !duration) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, clickX / rect.width));
    seekPercent(percent);
  }, [duration, seekPercent]);

  const handleKeyDown = useCallback((e) => {
    if (!duration) return;

    const step = 0.05; // 5% step
    let newPercent = currentTime / duration;

    if (e.key === 'ArrowRight') {
      newPercent = Math.min(1, newPercent + step);
      seekPercent(newPercent);
    } else if (e.key === 'ArrowLeft') {
      newPercent = Math.max(0, newPercent - step);
      seekPercent(newPercent);
    }
  }, [currentTime, duration, seekPercent]);

  return (
    <div className="progress-bar">
      <span className="progress-bar__time">{formatTime(currentTime)}</span>

      <div
        ref={progressRef}
        className="progress-bar__track"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="slider"
        aria-label="Seek"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={currentTrack ? 0 : -1}
      >
        <div
          className="progress-bar__fill"
          style={{ width: `${progress}%` }}
        />
        <div
          className="progress-bar__handle"
          style={{ left: `${progress}%` }}
        />
      </div>

      <span className="progress-bar__time">{formatTime(duration)}</span>
    </div>
  );
}

export default ProgressBar;
