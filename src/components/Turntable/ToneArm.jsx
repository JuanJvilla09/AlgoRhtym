import { motion } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';
import './ToneArm.scss';

function ToneArm() {
  const { isPlaying, currentTrack } = useAudio();

  // Arm should only move to playing position if there's a track and it's playing
  const shouldPlay = isPlaying && currentTrack;

  return (
    <motion.div
      className="tone-arm"
      initial={{ rotate: -30 }}
      animate={{ rotate: shouldPlay ? 0 : -30 }}
      transition={{
        type: 'spring',
        stiffness: 60,
        damping: 12,
        mass: 1,
      }}
    >
      {/* Arm base / pivot */}
      <div className="tone-arm__base">
        <div className="tone-arm__base-cap" />
      </div>

      {/* Main arm body */}
      <div className="tone-arm__body">
        {/* Counterweight */}
        <div className="tone-arm__counterweight" />

        {/* Horizontal bar */}
        <div className="tone-arm__horizontal" />

        {/* Vertical tube (headshell holder) */}
        <div className="tone-arm__vertical">
          {/* Headshell */}
          <div className="tone-arm__headshell">
            {/* Cartridge */}
            <div className="tone-arm__cartridge" />
            {/* Stylus */}
            <div className={`tone-arm__stylus ${shouldPlay ? 'tone-arm__stylus--vibrating' : ''}`} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ToneArm;
