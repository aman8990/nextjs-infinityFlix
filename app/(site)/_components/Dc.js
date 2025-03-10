import MoviesList from './MoviesList';

function Dc({ movies }) {
  return (
    <div>
      <MoviesList title="DC" movies={movies} href="dc" />
    </div>
  );
}

export default Dc;
