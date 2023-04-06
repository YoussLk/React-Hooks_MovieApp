import { getDefaultNormalizer } from "@testing-library/react";
import react, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import MovieCard from "./MovieCard";
let API_key = "&api_key=db95773a7fb212ba790d71f6adac0e7e";
let base_url = "https://api.themoviedb.org/3";
let url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
let arr = ["Popular", "Theatre", "Kids", "Drama", "Comedie"];
const Main = () => {
  const [movieData, setData] = useState([]);
  const [url_set, setUrl] = useState(url);
  const [search, setSearch] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formUrl, setFormUrl] = useState("");
  const [rating, setRating] = useState("");

  console.log(movieData);
  useEffect(() => {
    fetch(url_set)
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
      });
  }, [url_set]);

  const getData = (movieType) => {
    if (movieType == "Popular") {
      url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
    }
    if (movieType == "Theatre") {
      url =
        base_url +
        "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22" +
        API_key;
    }
    if (movieType == "Kids") {
      url =
        base_url +
        "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc" +
        API_key;
    }
    if (movieType == "Drama") {
      url =
        base_url +
        "/discover/movie?with_genres=18&primary_release_year=2014" +
        API_key;
    }
    if (movieType === "Comedie") {
      url =
        base_url +
        "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc" +
        API_key;
    }
    setUrl(url);
  };
  const searchMovie = (evt) => {
    if (evt.key === "Enter") {
      url =
        base_url +
        "/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query=" +
        search;
      setUrl(url);
      setSearch(" ");
    }
  };
  const handleForm = (e) => {
    e.preventDefault();

    const addMovieData = {
      original_title: title,
      overview: description,
      postrLink: formUrl,
      vote_average: rating,
    };
    setData([addMovieData, ...movieData]);

    console.log(title, rating, description, formUrl);
  };

  return (
    <>
      <div className="header">
        <nav>
          <ul>
            {arr.map((value, pos) => {
              return (
                <li>
                  <a
                    href="#"
                    key={pos}
                    name={value}
                    onClick={(e) => {
                      getData(e.target.name);
                    }}
                  >
                    {value}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <form>
          <div className="search-btn">
            <input
              type="text"
              placeholder="Enter Movie Name"
              className="inputText"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
              onKeyPress={searchMovie}
            ></input>
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
      </div>
      <div className="container">
        {movieData.length === 0 ? (
          <p className="notfound">Not Found</p>
        ) : (
          movieData.map((res, pos) => {
            return <MovieCard info={res} key={pos} />;
          })
        )}
      </div>
      <div class="container">
        <form id="add-movie-form" onSubmit={handleForm}>
          <h2 id="titlAdd">Add Movie</h2>
          <div class="form-group">
            <label for="title">Title:</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              id="title"
              name="title"
              required
            />
          </div>
          <div class="form-group">
            <label for="description">Description:</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              id="description"
              name="description"
              required
            ></textarea>
          </div>
          <div class="form-group">
            <label for="poster-url">Poster URL:</label>
            <input
              onChange={(e) => setFormUrl(e.target.value)}
              value={formUrl}
              type="text"
              id="poster-url"
              name="poster-url"
              required
            />
          </div>
          <div class="form-group">
            <label for="rating">Rating:</label>
            <select
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              id="rating"
              name="rating"
              required
            >
              <option value="">Select rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <button id="btnAdd" type="submit">Add Movie</button>
        </form>
      </div>
    </>
  );
};
export default Main;
