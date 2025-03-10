import MoviesList from './MoviesList';

function Bollywood({ movies }) {
  return (
    <div>
      <MoviesList title="Bollywood" movies={movies} href="bollywood" />
    </div>
  );
}

export default Bollywood;
