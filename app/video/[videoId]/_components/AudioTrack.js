function AudioTrack({
  track,
  videoRef,
  setSelectedAudio,
  setShowAudioMenu,
  selectedAudio,
  setIsLoading,
}) {
  const changeAudioTrack = (trackId) => {
    const hls = videoRef.current.hls;
    const video = videoRef.current;
    if (hls) {
      video.pause();
      setIsLoading(true);
      // const currentLevel = hls.currentLevel;
      hls.audioTrack = trackId;
      setSelectedAudio(trackId);
      setShowAudioMenu(false);
      video.play().catch((err) => console.error('Video play error:', err));

      // hls.currentLevel = currentLevel;
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={() => changeAudioTrack(track.id)}
      className={`cursor-pointer ${
        selectedAudio === track.id ? 'text-accent-50' : 'text-white'
      }`}
    >
      {track.name}
    </div>
  );
}

export default AudioTrack;
