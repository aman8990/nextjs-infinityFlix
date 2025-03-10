function MovieTitle({ movie }) {
  return (
    <div>
      <h1 className="text-xl mx-2 md:mx-5 md:text-3xl font-bold mb-2">
        {movie.title}
      </h1>
      <h2 className="mx-3 md:mx-6 text-xs md:text-lg text-gray-200">
        {movie.description}
      </h2>
    </div>
  );
}

export default MovieTitle;
