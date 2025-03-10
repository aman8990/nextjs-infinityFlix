import MoviesList from './MoviesList';

function Hollywood({ movies }) {
  return (
    <div>
      <MoviesList title="Hollywood" movies={movies} href="hollywood" />
    </div>
  );
}

export default Hollywood;
