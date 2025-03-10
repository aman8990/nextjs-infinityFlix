import MoviesList from './MoviesList';

function Marvel({ movies }) {
  return (
    <div>
      <MoviesList title="Marvel" movies={movies} href="marvel" />
    </div>
  );
}

export default Marvel;
