import ContinueWatchingList from './ContinueWatchingList';

function ContinueWatching({ movies }) {
  return (
    <div>
      <ContinueWatchingList
        title="Continue Watching..."
        movies={movies}
        href="continueWatching"
      />
    </div>
  );
}

export default ContinueWatching;
