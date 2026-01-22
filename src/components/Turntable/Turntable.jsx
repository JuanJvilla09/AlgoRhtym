import VinylDisc from './VinylDisc';
import ToneArm from './ToneArm';
import { useAudio } from '../../context/AudioContext';
import './Turntable.scss';

function Turntable() {
  const { isPlaying } = useAudio();

  return (
    <div className={`turntable ${isPlaying ? 'turntable--playing' : ''}`}>
      {/* Wood grain texture overlay */}
      <div className="turntable__texture" />

      {/* Platter (metal disc under vinyl) */}
      <div className="turntable__platter">
        <VinylDisc />
      </div>

      {/* Tone arm assembly */}
      <ToneArm />

      {/* Power indicator LED */}
      <div className={`turntable__led ${isPlaying ? 'turntable__led--on' : ''}`} />

      {/* Brand label */}
      <div className="turntable__brand">
        <span>ALGORHYTHM</span>
      </div>

      {/* Corner screws for realism */}
      <div className="turntable__screw turntable__screw--tl" />
      <div className="turntable__screw turntable__screw--tr" />
      <div className="turntable__screw turntable__screw--bl" />
      <div className="turntable__screw turntable__screw--br" />
    </div>
  );
}

export default Turntable;
