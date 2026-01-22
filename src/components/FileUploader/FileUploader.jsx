import { useRef } from 'react';
import { useFileUpload } from '../../hooks/useFileUpload';
import './FileUploader.scss';

function FileUploader() {
  const inputRef = useRef(null);
  const {
    isDragging,
    error,
    handleFileInput,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    clearError,
    acceptedFormats,
  } = useFileUpload();

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="file-uploader">
      <div
        className={`drop-zone ${isDragging ? 'drop-zone--active' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      >
        <div className="drop-zone__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 17H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4" />
            <polyline points="12 12 12 21" />
            <polyline points="8 16 12 12 16 16" />
          </svg>
        </div>
        <p className="drop-zone__text">
          {isDragging ? 'Drop your music here!' : 'Drop audio files or click to browse'}
        </p>
        <p className="drop-zone__formats">MP3, WAV, OGG, FLAC, M4A</p>

        <input
          ref={inputRef}
          type="file"
          accept={acceptedFormats}
          multiple
          onChange={handleFileInput}
          className="drop-zone__input"
        />
      </div>

      {error && (
        <div className="file-uploader__error" role="alert">
          <span>{error}</span>
          <button onClick={clearError} className="file-uploader__error-close" aria-label="Dismiss">
            &times;
          </button>
        </div>
      )}
    </div>
  );
}

export default FileUploader;
