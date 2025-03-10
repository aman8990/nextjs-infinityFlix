import { FaVolumeUp, FaVolumeMute, FaExpand, FaCompress } from 'react-icons/fa';
import { MdAudiotrack } from 'react-icons/md';
import { FaSliders } from 'react-icons/fa6';
import AudioTrack from './AudioTrack';
import VideoRes from './VideoRes';
import { useCallback, useEffect, useState } from 'react';

function MediaSettings({
  showControls,
  audioTracks,
  videoLevels,
  videoRef,
  containerRef,
  setSelectedAudio,
  selectedAudio,
  currentResolution,
  setCurrentResolution,
  showAudioMenu,
  setShowAudioMenu,
  showResolutionMenu,
  setShowResolutionMenu,
  setIsLoading,
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;

    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
      setShowAudioMenu(false);
      setShowResolutionMenu(false);
      screen.orientation?.unlock?.();
    } else {
      container.requestFullscreen();
      setIsFullscreen(true);
      setShowAudioMenu(false);
      setShowResolutionMenu(false);
      if (window.innerWidth <= 1024) {
        screen.orientation?.lock?.('landscape').catch(console.log);
      }
    }
  }, [containerRef, setShowAudioMenu, setShowResolutionMenu]);

  useEffect(() => {
    let startY = 0;

    const handleTouchStart = (e) => {
      if (window.innerWidth >= 1024 || !document.fullscreenElement) return;
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (window.innerWidth >= 1024 || !document.fullscreenElement) return;

      let endY = e.touches[0].clientY;
      let swipeDistance = endY - startY;

      if (swipeDistance > 100) {
        toggleFullscreen();
      }
    };

    const handleKeyDown = (e) => {
      if (e.code === 'KeyF') {
        toggleFullscreen();
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleFullscreen]);

  const toggleMute = () => {
    const video = videoRef.current;

    video.muted = !video.muted;
    setIsMuted(video.muted);
    setShowAudioMenu(false);
    setShowResolutionMenu(false);
  };

  const handleAudioClick = (e) => {
    e.stopPropagation();
    setShowResolutionMenu(false);
    setShowAudioMenu((prev) => !prev);
  };

  const handleVideoClick = (e) => {
    e.stopPropagation();
    setShowAudioMenu(false);
    setShowResolutionMenu((prev) => !prev);
  };

  if (!showControls) return null;

  return (
    <div className="absolute z-40 flex right-2 sm:right-10 top-6 sm:top-5 justify-end space-x-4 sm:space-x-10">
      <div className="cursor-pointer control-button" onClick={toggleMute}>
        <button>
          {isMuted ? (
            <FaVolumeMute
              color="white"
              className="text-[1.4rem] sm:text-[1.75rem]"
            />
          ) : (
            <FaVolumeUp
              color="white"
              className="text-[1.4rem] sm:text-[1.75rem]"
            />
          )}
        </button>
      </div>

      <div className="relative control-button">
        <button onClick={handleAudioClick}>
          <MdAudiotrack
            color="white"
            className="text-[1.4rem] sm:text-[1.75rem]"
          />
        </button>
        {showAudioMenu && (
          <div className="absolute left-[-1rem] bg-opacity-80 bg-black text-white w-max p-2 h-max rounded-md shadow-md space-y-2">
            {audioTracks?.map((track) => (
              <AudioTrack
                key={track.id}
                track={track}
                videoRef={videoRef}
                setSelectedAudio={setSelectedAudio}
                setShowAudioMenu={setShowAudioMenu}
                selectedAudio={selectedAudio}
                setIsLoading={setIsLoading}
              />
            ))}
          </div>
        )}
      </div>

      <div className="relative control-button">
        <button onClick={handleVideoClick}>
          <FaSliders
            color="white"
            className="text-[1.4rem] sm:text-[1.75rem]"
          />
        </button>
        {showResolutionMenu && (
          <div className="absolute left-[-1.7rem] bg-opacity-80 bg-black text-white w-max p-4 h-max rounded-md shadow-md space-y-2">
            {videoLevels?.map((res) => (
              <VideoRes
                key={res.id}
                res={res}
                videoRef={videoRef}
                currentResolution={currentResolution}
                setCurrentResolution={setCurrentResolution}
                setShowResolutionMenu={setShowResolutionMenu}
                setIsLoading={setIsLoading}
              />
            ))}
          </div>
        )}
      </div>

      <div className="cursor-pointer control-button" onClick={toggleFullscreen}>
        <button>
          {isFullscreen ? (
            <FaCompress
              color="white"
              className="text-[1.4rem] sm:text-[1.75rem]"
            />
          ) : (
            <FaExpand
              color="white"
              className="text-[1.4rem] sm:text-[1.75rem]"
            />
          )}
        </button>
      </div>
    </div>
  );
}

export default MediaSettings;
