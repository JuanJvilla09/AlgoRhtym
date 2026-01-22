import { useAudio } from '../../context/AudioContext';
import './TrackInfo.scss';

function formatTime(seconds) {
  if (!seconds || !isFinite(seconds)) return '--:--';

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function TrackInfo() {
  const { currentTrack, currentTime, duration, isPlaying, playlist, currentTrackIndex } = useAudio();

  if (!currentTrack) {
    return (
      <div className="track-info track-info--empty">
        <div className="track-info__placeholder">
          <span className="track-info__placeholder-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z" />
            </svg>
          </span>
          <p>No track loaded</p>
          <span>Drop some music to get started</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`track-info ${isPlaying ? 'track-info--playing' : ''}`}>
      <div className="track-info__vinyl-icon">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" opacity="0.2" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>

      <div className="track-info__details">
        <h3 className="track-info__name" title={currentTrack.name}>
          {currentTrack.name}
        </h3>
        <div className="track-info__meta">
          <span className="track-info__duration">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          {playlist.length > 1 && (
            <span className="track-info__position">
              Track {currentTrackIndex + 1} of {playlist.length}
            </span>
          )}
        </div>
      </div>

      {isPlaying && (
        <div className="track-info__visualizer">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </div>
  );
}

export default TrackInfo;
