function VideoRes({
  res,
  videoRef,
  currentResolution,
  setCurrentResolution,
  setShowResolutionMenu,
  setIsLoading,
}) {
  const handleResChange = (newRes) => {
    const hls = videoRef.current.hls;
    const video = videoRef.current;
    if (hls) {
      setIsLoading(true);
      video.pause();
      // hls.currentLevel = newRes.id;
      // hls.nextLevel = newRes.id;
      hls.loadLevel = newRes.id;

      setCurrentResolution(+newRes.label);
      setShowResolutionMenu(false);

      video.play().catch((err) => console.error('Video play error:', err));
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={() => handleResChange(res)}
      className={`cursor-pointer ${
        currentResolution === +res.label ? 'text-accent-50' : 'text-white'
      }`}
    >
      {res.label}p
    </div>
  );
}

export default VideoRes;
