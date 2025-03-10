import { useCallback, useEffect, useRef, useState } from 'react';

function VideoProgressBar({
  showControls,
  videoRef,
  setShowAudioMenu,
  setShowResolutionMenu,
}) {
  const progressBarRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(0);

  const updateProgress = useCallback(() => {
    const video = videoRef.current;

    if (video) {
      setVideoDuration(video.duration);
      setCurrentDuration(video.currentTime);

      const percentage = (video.currentTime / video.duration) * 100;
      setProgress(percentage);
    }
  }, [videoRef]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', updateProgress);
    }

    return () => {
      if (video) {
        video.removeEventListener('timeupdate', updateProgress);
      }
    };
  }, [videoRef, updateProgress]);

  const seekVideo = (event) => {
    setShowAudioMenu(false);
    setShowResolutionMenu(false);

    const video = videoRef.current;
    const progressBar = progressBarRef.current;

    if (!video || !progressBar) return;

    const clickX = event.clientX - progressBar.offsetLeft;
    const newTime = (clickX / progressBar.offsetWidth) * video.duration;

    video.currentTime = newTime;
  };

  const formatTime = (duration) => {
    const hours = Math.floor(duration / 3600);
    let minutes = Math.floor((duration % 3600) / 60);
    let seconds = Math.floor(duration % 60);

    minutes = minutes < 10 ? `0${minutes}` : minutes;

    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return hours > 0
      ? `${hours}:${minutes}:${seconds}`
      : `${minutes}:${seconds}`;
  };

  if (!showControls) return null;

  return (
    <div
      ref={progressBarRef}
      onClick={seekVideo}
      className="absolute rounded-xl mx-5 max-w-[calc(100%-2.5rem)] bottom-7 left-0 w-full bg-white cursor-pointer h-2 control-button"
    >
      <div
        className="bg-accent-50 h-full rounded-xl"
        style={{ width: `${progress}%` }}
      />
      <div className="flex justify-between text-white">
        <div>{currentDuration === 0 ? '' : formatTime(currentDuration)}</div>
        <div>{videoDuration === 0 ? '' : formatTime(videoDuration)}</div>
      </div>
    </div>
  );
}

export default VideoProgressBar;
