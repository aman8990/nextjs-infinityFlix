function MovieDetails({ movie }) {
  return (
    <div className="max-w-[60rem] mx-auto border-2 rounded-md mb-32 p-3 md:p-6 md:text-lg space-y-4 break-words">
      <div>
        <span className="text-gray-500">Movie ID : </span>
        {movie.id}
      </div>
      <div>
        <span className="text-gray-500">Title : </span> {movie.title}
      </div>
      <div>
        <span className="text-gray-500">Description : </span>
        {movie.description}
      </div>
      <div>
        <span className="text-gray-500">VideoUrl : </span> {movie.videoUrl}
      </div>
      <div>
        <span className="text-gray-500">ThumbnailUrl : </span>
        {movie.thumbnailUrl}
      </div>
      <div className="flex">
        <span className="text-gray-500">Categories : </span>
        <span className="flex gap-2 ml-2">
          {movie.categories.map((category) => (
            <h1 key={category}>{category}</h1>
          ))}
        </span>
      </div>
    </div>
  );
}

export default MovieDetails;
