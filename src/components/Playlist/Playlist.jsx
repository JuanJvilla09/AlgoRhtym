import { useAudio } from '../../context/AudioContext';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import './Playlist.scss';

function Playlist() {
  const { playlist, currentTrackIndex, setCurrentTrack, removeTrack, isPlaying } = useAudio();
  const { play } = useAudioPlayer();

  const handleTrackClick = (index) => {
    if (index === currentTrackIndex) return;
    setCurrentTrack(index);
  };

  const handleRemove = (e, index) => {
    e.stopPropagation();
    removeTrack(index);
  };

  if (playlist.length === 0) {
    return (
      <div className="playlist playlist--empty">
        <div className="playlist__header">
          <h2>Playlist</h2>
        </div>
        <div className="playlist__empty-state">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z" />
          </svg>
          <p>Your playlist is empty</p>
          <span>Add some tracks to get started</span>
        </div>
      </div>
    );
  }

  return (
    <div className="playlist">
      <div className="playlist__header">
        <h2>Playlist</h2>
        <span className="playlist__count">{playlist.length} track{playlist.length !== 1 ? 's' : ''}</span>
      </div>

      <ul className="playlist__list">
        {playlist.map((track, index) => (
          <li
            key={track.id}
            className={`playlist__item ${index === currentTrackIndex ? 'playlist__item--active' : ''}`}
            onClick={() => handleTrackClick(index)}
          >
            <span className="playlist__item-number">
              {index === currentTrackIndex && isPlaying ? (
                <span className="playlist__item-playing">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              ) : (
                index + 1
              )}
            </span>

            <span className="playlist__item-name" title={track.name}>
              {track.name}
            </span>

            <button
              className="playlist__item-remove"
              onClick={(e) => handleRemove(e, index)}
              aria-label={`Remove ${track.name}`}
              title="Remove"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Playlist;
