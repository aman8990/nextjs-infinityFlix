import { FaArrowRotateLeft, FaArrowRotateRight } from 'react-icons/fa6';
import {
  FaRegPlayCircle,
  FaRegPauseCircle,
  FaVolumeUp,
  FaVolumeDown,
} from 'react-icons/fa';
import { useCallback, useEffect, useState } from 'react';
import Spinner from '@/app/_components/Spinner';

function PlaybackControls({
  showControls,
  videoRef,
  setShowAudioMenu,
  setShowResolutionMenu,
  setShowControls,
  setLastTimeMove,
  isLoading,
  isPlaying,
  setIsPlaying,
}) {
  const [volumeIcon, setVolumeIcon] = useState(null);

  const togglePlayPause = useCallback(() => {
    setShowAudioMenu(false);
    setShowResolutionMenu(false);

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [setShowAudioMenu, setShowResolutionMenu, videoRef]);

  const seekBackward = useCallback(() => {
    setShowAudioMenu(false);
    setShowResolutionMenu(false);

    videoRef.current.currentTime -= 10;
  }, [setShowAudioMenu, setShowResolutionMenu, videoRef]);

  const seekForward = useCallback(() => {
    setShowAudioMenu(false);
    setShowResolutionMenu(false);

    videoRef.current.currentTime += 10;
  }, [setShowAudioMenu, setShowResolutionMenu, videoRef]);

  const increaseVolume = useCallback(() => {
    setShowAudioMenu(false);
    setShowResolutionMenu(false);

    if (videoRef.current.volume < 1) {
      videoRef.current.volume = Math.min(videoRef.current.volume + 0.1, 1);
    }
  }, [setShowAudioMenu, setShowResolutionMenu, videoRef]);

  const decreaseVolume = useCallback(() => {
    setShowAudioMenu(false);
    setShowResolutionMenu(false);

    if (videoRef.current.volume > 0) {
      videoRef.current.volume = Math.max(videoRef.current.volume - 0.1, 0);
    }
  }, [setShowAudioMenu, setShowResolutionMenu, videoRef]);

  const showVolumeIcon = (icon) => {
    setVolumeIcon(icon);
    setTimeout(() => setVolumeIcon(null), 1500);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlayPause();
          break;

        case 'ArrowLeft':
          e.preventDefault();
          seekBackward();
          break;

        case 'ArrowRight':
          e.preventDefault();
          seekForward();
          break;

        case 'ArrowUp':
          e.preventDefault();
          increaseVolume();
          showVolumeIcon('up');
          break;

        case 'ArrowDown':
          e.preventDefault();
          decreaseVolume();
          showVolumeIcon('down');
          break;

        default:
          break;
      }

      setShowControls(true);
      setLastTimeMove(Date.now());
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    togglePlayPause,
    setShowControls,
    setLastTimeMove,
    seekBackward,
    seekForward,
    decreaseVolume,
    increaseVolume,
  ]);

  if (!showControls) return null;
  if (isLoading)
    return (
      <div className="absolute flex justify-center items-center inset-0 w-full">
        <Spinner size={80} />
      </div>
    );

  return (
    <div className="absolute flex justify-center items-center inset-0 w-full">
      <div className="flex justify-center items-center space-x-6 sm:space-x-20 h-min">
        <button
          onClick={seekBackward}
          className={`control-button ${isLoading ? 'hidden' : 'flex'}`}
        >
          <FaArrowRotateLeft size={40} color="white" />
        </button>

        <button onClick={togglePlayPause} className="control-button">
          {isPlaying ? (
            <FaRegPauseCircle size={40} color="white" />
          ) : (
            <FaRegPlayCircle size={40} color="white" />
          )}
        </button>

        <button
          onClick={seekForward}
          className={`control-button ${isLoading ? 'hidden' : 'flex'}`}
        >
          <FaArrowRotateRight size={40} color="white" />
        </button>
      </div>

      {volumeIcon && (
        <div className="absolute top-20 right-10 animate-fadeOut">
          {volumeIcon === 'up' ? (
            <FaVolumeUp size={50} color="white" />
          ) : (
            <FaVolumeDown size={50} color="white" />
          )}
        </div>
      )}
    </div>
  );
}

export default PlaybackControls;
