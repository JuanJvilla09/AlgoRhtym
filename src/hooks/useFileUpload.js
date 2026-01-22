import { useCallback, useState } from 'react';
import { useAudio } from '../context/AudioContext';

const ACCEPTED_TYPES = [
  'audio/mpeg',      // MP3
  'audio/wav',       // WAV
  'audio/ogg',       // OGG
  'audio/flac',      // FLAC
  'audio/mp4',       // M4A
  'audio/x-m4a',     // M4A alternative
  'audio/aac',       // AAC
  'audio/webm',      // WebM
];

const ACCEPTED_EXTENSIONS = ['.mp3', '.wav', '.ogg', '.flac', '.m4a', '.aac', '.webm'];

function getFileExtension(filename) {
  return filename.slice(filename.lastIndexOf('.')).toLowerCase();
}

function isValidAudioFile(file) {
  // Check MIME type
  if (ACCEPTED_TYPES.includes(file.type)) {
    return true;
  }
  // Fallback to extension check
  const ext = getFileExtension(file.name);
  return ACCEPTED_EXTENSIONS.includes(ext);
}

function formatFileName(filename) {
  // Remove extension and clean up filename for display
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  // Replace underscores and hyphens with spaces, clean up multiple spaces
  return nameWithoutExt
    .replace(/[_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function createTrackFromFile(file) {
  return {
    id: `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: formatFileName(file.name),
    filename: file.name,
    url: URL.createObjectURL(file),
    file: file,
    type: file.type,
    size: file.size,
  };
}

export function useFileUpload() {
  const { addTracks, playlist } = useAudio();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);

  const processFiles = useCallback((files) => {
    setError(null);

    const validFiles = Array.from(files).filter(isValidAudioFile);

    if (validFiles.length === 0) {
      setError('No valid audio files found. Supported formats: MP3, WAV, OGG, FLAC, M4A, AAC');
      return [];
    }

    if (validFiles.length < files.length) {
      setError(`${files.length - validFiles.length} file(s) were skipped (unsupported format)`);
    }

    const tracks = validFiles.map(createTrackFromFile);
    addTracks(tracks);

    return tracks;
  }, [addTracks]);

  const handleFileInput = useCallback((e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
    // Reset input so same file can be selected again
    e.target.value = '';
  }, [processFiles]);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set to false if leaving the actual drop zone
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
  }, [processFiles]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Cleanup URLs when component unmounts
  const cleanupUrls = useCallback(() => {
    playlist.forEach((track) => {
      if (track.url && track.url.startsWith('blob:')) {
        URL.revokeObjectURL(track.url);
      }
    });
  }, [playlist]);

  return {
    isDragging,
    error,
    handleFileInput,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    clearError,
    cleanupUrls,
    acceptedFormats: ACCEPTED_EXTENSIONS.join(','),
  };
}

export default useFileUpload;
