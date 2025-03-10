function VideoTitle({ showControls, title }) {
  if (!showControls) return null;

  const changededTitle = title.length > 10 ? title.slice(0, 10) + '...' : title;
  return (
    <div className="absolute top-4 left-4 text-white text-lg font-semibold bg-opacity-60 bg-black rounded px-2 py-1">
      {changededTitle}
    </div>
  );
}

export default VideoTitle;
