import { Link } from "react-router-dom";
import noMovies from "../assets/NoPoster.png";
import movieRating from "../assets/Rating.svg";

const MovieCard = ({
  movie: {
    id,
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
  },
}) => {
  return (
    <div className="movie-card">
      <Link to={`/details/${id}`}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : { noMovies }
          }
          alt={title}
        />
        <div className="mt-3">
          <h3>{title}</h3>
          <div className="content">
            <div className="rating">
              <img src={movieRating} alt="Star icon" />
              <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
            </div>
            <span>•</span>
            <p className="lang">{original_language}</p>
            <span>•</span>
            <p className="year">{release_date.split("-")[0]}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
