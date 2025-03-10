'use client';

import Hls from 'hls.js';
import { useCallback, useEffect, useRef, useState } from 'react';
import VideoProgressBar from './VideoProgressBar';
import VideoTitle from './VideoTitle';
import PlaybackControls from './PlaybackControls';
import MediaSettings from './MediaSettings';
import axios from 'axios';

function VideoPlayer({ src, title, videoId: movieId, progress, isSeries }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [audioTracks, setAudioTracks] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [videoLevels, setVideoLevels] = useState(null);
  const [currentResolution, setCurrentResolution] = useState(null);
  const [showControls, setShowControls] = useState(false);
  const [lastTimeMove, setLastTimeMove] = useState(null);
  const [showAudioMenu, setShowAudioMenu] = useState(false);
  const [showResolutionMenu, setShowResolutionMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLargeScreen(window.innerWidth > 1024);
    }
  }, []);

  useEffect(() => {
    if (Hls.isSupported()) {
      // const hls = new Hls();
      const hls = new Hls({
        maxBufferLength: 5,
        maxMaxBufferLength: 10,
        liveSyncDurationCount: 2,
      });
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.warn('HLS Network Error, trying to recover...');

              const handleNetworkRestore = () => {
                console.log('Network restored, resuming video playback...');
                hls.startLoad();

                window.removeEventListener('online', handleNetworkRestore);
              };

              window.addEventListener('online', handleNetworkRestore);
              break;

            case Hls.ErrorTypes.MEDIA_ERROR:
              console.warn('HLS Media Error, attempting recovery...');
              hls.recoverMediaError();
              break;

            default:
              console.error('HLS Fatal Error, destroying instance...');
              hls.destroy();
              break;
          }
        }
      });

      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        const tracks = data.audioTracks || [];
        setAudioTracks(tracks);

        if (tracks.length > 0) {
          hls.audioTrack = 0;
          setSelectedAudio(0);
        }

        const levels = data.levels || [];
        const levelsArray = levels.map((label, i) => ({
          id: i,
          label: `${label.height}`,
        }));

        // setVideoLevels([{ id: -1, label: 'Auto' }, ...levelsArray]);
        setVideoLevels(levelsArray);

        if (levels.length > 0) {
          hls.startLevel = 0;
          hls.currentLevel = 0;
          setCurrentResolution(levels[0].height);
        }
      });

      videoRef.current.hls = hls;
      setIsPlaying(true);
      return () => hls.destroy();
    }
  }, [src]);

  useEffect(() => {
    const hideControlsTimeout = setTimeout(() => {
      if (Date.now() - lastTimeMove > 3000 && !isLoading) {
        setShowControls(false);
        setShowAudioMenu(false);
        setShowResolutionMenu(false);
      }
    }, 3000);

    return () => clearTimeout(hideControlsTimeout);
  }, [lastTimeMove, isLoading]);

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    setLastTimeMove(Date.now());
  }, []);

  const handleTap = useCallback(
    (e) => {
      if (isLargeScreen && isLoading) return;

      const target = e.target;
      const isControlButton = target.closest('.control-button');

      if (isControlButton) {
        setShowControls(true);
        setLastTimeMove(Date.now);
      } else {
        setShowControls((prev) => !prev);
        setShowAudioMenu(false);
        setShowResolutionMenu(false);
      }
    },
    [isLargeScreen, setShowControls, isLoading]
  );

  useEffect(() => {
    if (isLargeScreen) return;

    if (showControls && Date.now() - lastTimeMove > 5000) {
      const timeout = setTimeout(() => {
        setShowControls(false);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [showControls, isLargeScreen, lastTimeMove]);

  const saveProgress = useCallback(async () => {
    if (videoRef.current) {
      const progressTime = Math.floor(videoRef.current.currentTime);
      const runtime = Math.floor(videoRef.current.duration);

      if (progressTime / runtime >= 0.98) {
        console.log('Skipping progress update as user watched more than 99%');
        return;
      }

      const payload = {
        progress: progressTime,
        runtime,
        ...(isSeries ? { episodeId: movieId } : { movieId }),
      };

      try {
        await axios.post('/api/continueWatching', payload);
      } catch (error) {
        console.log('Error saving progress:', error);
      }
    }
  }, [movieId, isSeries]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }

    const handleBeforeUnload = (event) => {
      saveProgress();
      event.preventDefault();
      event.returnValue = '';
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        saveProgress();
      }
    };

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    const handleHistoryChange = () => {
      saveProgress();
    };

    history.pushState = function (...args) {
      handleHistoryChange();
      return originalPushState.apply(this, args);
    };

    history.replaceState = function (...args) {
      handleHistoryChange();
      return originalReplaceState.apply(this, args);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, [saveProgress]);

  // useEffect(() => {
  //   const video = videoRef.current;
  //   if (!video) return;

  //   const handleWaiting = () => {
  //     setIsLoading(true);
  //     setShowControls(true);
  //   };
  //   const handlePlaying = () => {
  //     setIsLoading(false);
  //     setShowControls(false);
  //   };

  //   video.addEventListener('waiting', handleWaiting);
  //   video.addEventListener('playing', handlePlaying);

  //   return () => {
  //     video.removeEventListener('waiting', handleWaiting);
  //     video.removeEventListener('playing', handlePlaying);
  //   };
  // }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={isLargeScreen ? handleMouseMove : null}
      onClick={handleTap}
      className="relative w-full h-[30vh] lg:h-[70vh]"
    >
      <video
        ref={videoRef}
        autoPlay={true}
        controls={false}
        onLoadedMetadata={() => {
          setIsLoading(false);
          if (progress) {
            videoRef.current.currentTime = progress;
          }
        }}
        onWaiting={() => {
          setIsLoading(true);
          setShowControls(true);
        }}
        onPlaying={() => {
          setIsLoading(false);
          setShowControls(false);
        }}
        className="w-full h-full object-fill"
      />

      <VideoTitle title={title} showControls={showControls} />
      <MediaSettings
        showControls={showControls}
        audioTracks={audioTracks}
        videoLevels={videoLevels}
        videoRef={videoRef}
        containerRef={containerRef}
        setSelectedAudio={setSelectedAudio}
        selectedAudio={selectedAudio}
        currentResolution={currentResolution}
        setCurrentResolution={setCurrentResolution}
        showAudioMenu={showAudioMenu}
        setShowAudioMenu={setShowAudioMenu}
        showResolutionMenu={showResolutionMenu}
        setShowResolutionMenu={setShowResolutionMenu}
        setIsLoading={setIsLoading}
      />
      <PlaybackControls
        showControls={showControls}
        setShowControls={setShowControls}
        setLastTimeMove={setLastTimeMove}
        videoRef={videoRef}
        setShowAudioMenu={setShowAudioMenu}
        setShowResolutionMenu={setShowResolutionMenu}
        isLoading={isLoading}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <VideoProgressBar
        showControls={showControls}
        videoRef={videoRef}
        setShowAudioMenu={setShowAudioMenu}
        setShowResolutionMenu={setShowResolutionMenu}
      />
    </div>
  );
}

export default VideoPlayer;
