import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import noMovie from "../assets/NoPoster.png";
import rating from "../assets/rating.svg";
import Spinner from "./Spinner";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const DetailsFilm = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  const formatDate = new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/movie/${id}?language=en-US`,
        API_OPTIONS
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }

      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error(`Error Fetching Movie Details: ${error}`);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <Spinner />;
  }

  const {
    title,
    budget,
    genres,
    original_language,
    production_companies,
    release_date,
    revenue,
    spoken_languages,
    status,
    tagline,
    vote_average,
    popularity,
    backdrop_path,
    overview,
    origin_country,
  } = movie;
  const date = new Date(release_date);

  return (
    <main>
      <div className="pattern" />

      <div className="text-white wrapper">
        {/* title */}
        <div className="flex items-center justify-between">
          <div>
            <h2>{title}</h2>
          </div>
          {/* Rating */}
          <div className="rating p-2 bg-dark-100 rounded-md flex items-center gap-1">
            <img src={rating} alt="rating" />
            <h3>
              {vote_average.toFixed(1)}{" "}
              <span className="text-gray-100 mr-2">/ 10</span>(
              {popularity.toFixed(0)}K)
            </h3>
          </div>
        </div>
        {/* Release Date */}
        <div className="mt-1 mb-3 flex gap-2">
          <p>{release_date.split("-")[0]}</p>
          <span>•</span>
          <p>{original_language.toUpperCase()}</p>
        </div>
        {/* image */}
        <div className="max-full">
          <img
            src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
            alt={title}
            className="mx-auto rounded-lg shadow-white"
          />
        </div>
        {/* overview */}
        <div>
          <div className="flex-col space-y-5 mt-5">
            <div className="flex max-w-xl">
              <div className="w-[200px]">
                <h3 className="text-gray-100 font-bold">Genres</h3>
              </div>
              <div className="max-w-md flex space-x-2">
                {genres.map((genre) => {
                  return (
                    <span
                      key={genre.id}
                      className="bg-gray-800 px-2 rounded-lg"
                    >
                      {genre.name}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="flex max-w-xl">
              <div className="min-w-[200px]">
                <h3 className="text-gray-100 font-bold">Overview</h3>
              </div>
              <div className="max-w-md flex space-x-2">
                <p>{overview}</p>
              </div>
            </div>
            <div className="flex max-w-xl">
              <div className="min-w-[200px]">
                <h3 className="text-gray-100 font-bold">Release Date</h3>
              </div>
              <div className="max-w-md flex space-x-2">
                <p className="text-violet">{formatDate.format(date)}</p>
              </div>
            </div>
            <div className="flex max-w-xl">
              <div className="min-w-[200px]">
                <h3 className="text-gray-100 font-bold">Countries</h3>
              </div>
              <div className="max-w-md flex space-x-2">
                <p className="text-violet">{regionNames ? regionNames.of(origin_country) : "N/A"}</p>
              </div>
            </div>
            <div className="flex max-w-xl">
              <div className="min-w-[200px]">
                <h3 className="text-gray-100 font-bold">Status</h3>
              </div>
              <div className="max-w-md flex space-x-2">
                <p className="text-violet">{status}</p>
              </div>
            </div>
            <div className="flex max-w-xl">
              <div className="min-w-[200px]">
                <h3 className="text-gray-100 font-bold">Language</h3>
              </div>
              <div className="max-w-md flex space-x-2">
                {spoken_languages.map((lang, index) => {
                  return (
                    <p key={index} className="text-violet">
                      {lang.english_name}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="flex max-w-xl">
              <div className="min-w-[200px]">
                <h3 className="text-gray-100 font-bold">Budget</h3>
              </div>
              <div className="max-w-md flex space-x-2">
                <p className="text-violet">{budget.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  })}</p>
              </div>
            </div>
            <div className="flex max-w-xl">
              <div className="min-w-[200px]">
                <h3 className="text-gray-100 font-bold">Revenue</h3>
              </div>
              <div className="max-w-md flex space-x-2">
                <p className="text-violet">
                  {revenue.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  })}
                </p>
              </div>
            </div>
            <div className="flex max-w-xl">
              <div className="min-w-[200px]">
                <h3 className="text-gray-100 font-bold">Tagline</h3>
              </div>
              <div className="max-w-md flex space-x-2">
                <p className="text-violet">
                  {tagline ? tagline : "No Tagline Available"}
                </p>
              </div>
            </div>
            <div className="flex max-w-xl">
              <div className="min-w-[200px]">
                <h3 className="text-gray-100 font-bold">Production Companies</h3>
              </div>
              <div className="max-w-md flex space-x-2">
                {production_companies.map((company, index) => {
                  return (
                    <p key={index} className="bg-gray-800 px-2 rounded-lg">{company.name}</p>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailsFilm;
