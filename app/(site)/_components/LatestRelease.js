import MoviesList from './MoviesList';

function LatestRelease({ movies }) {
  return (
    <div>
      <MoviesList
        title="Latest Releases"
        movies={movies}
        href="latestReleases"
      />
    </div>
  );
}

export default LatestRelease;
