import { useAudio } from '../../context/AudioContext';
import './VinylDisc.scss';

function VinylDisc() {
  const { isPlaying, currentTrack } = useAudio();

  return (
    <div className={`vinyl-disc ${isPlaying ? 'vinyl-disc--spinning' : ''}`}>
      {/* Outer edge / rim */}
      <div className="vinyl-disc__rim" />

      {/* Grooves - concentric circles */}
      <div className="vinyl-disc__grooves" />

      {/* Center label */}
      <div className="vinyl-disc__label">
        <div className="vinyl-disc__label-inner">
          <div className="vinyl-disc__label-text">
            {currentTrack ? (
              <>
                <span className="vinyl-disc__label-title">
                  {currentTrack.name.length > 20
                    ? currentTrack.name.substring(0, 20) + '...'
                    : currentTrack.name}
                </span>
                <span className="vinyl-disc__label-brand">ALGORHYTHM</span>
              </>
            ) : (
              <>
                <span className="vinyl-disc__label-title">No Track</span>
                <span className="vinyl-disc__label-brand">ALGORHYTHM</span>
              </>
            )}
          </div>
          {/* Center hole */}
          <div className="vinyl-disc__spindle" />
        </div>
      </div>

      {/* Shine effect */}
      <div className="vinyl-disc__shine" />
    </div>
  );
}

export default VinylDisc;
