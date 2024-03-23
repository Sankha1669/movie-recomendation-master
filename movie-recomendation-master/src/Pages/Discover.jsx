import React, { useEffect, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import Modal from "react-modal";
import axios from "axios";
import "animate.css/animate.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import FooterComp from "../Components/Footer";

const apiKey = process.env.REACT_APP_OMDB_API_KEY;

Modal.setAppElement("#root");

const Discover = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
  });

  const [animationStarted, setAnimationStarted] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const searchChange = async (name, fetchMovies) => {
    if (!name.length) {
      return fetchMovies();
    }
    const res = await axios.get(
      `https://www.omdbapi.com/?apikey=${apiKey}&s=${name}`
    );
    console.log("searchres\n", res.data);
    const data = res.data.Search.map((elem) => {
      return {
        title: elem.Title,
        movie: elem,
      };
    });
    setMovies([...data]);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const generateMovieTitles = () => {
          const baseTitles = [
            "Inception",
            "The Shawshank Redemption",
            "The Dark Knight",
            "Ted",
            "Logan",
            "Crazy, Stupid, Love",
            "The Matrix",
            "The Godfather",
            "Schindler's List",
            "Titanic",
            "Avatar",
            "Jurassic Park",
            "The Lord of the Rings",
            "The Avengers",
            "The Silence of the Lambs",
            "The Departed",
            "Gladiator",
            "The Social Network",
            "The Grand Budapest Hotel",
            "Interstellar",
            "La La Land",
            "The Revenant",
            "Mad Max: Fury Road",
            "The Shape of Water",
            "Get Out",
            "Moonlight",
            "Birdman",
            "Whiplash",
            "Inglourious Basterds",
            "The Hangover",
          ];

          const filteredTitles = baseTitles.filter((title) =>
            title.toLowerCase().includes(searchValue.toLowerCase())
          );

          const additionalTitles = Array.from(
            { length: 30 - filteredTitles.length },
            (_, index) => `Movie ${index + 1}`
          );

          return filteredTitles.concat(additionalTitles);
        };

        const movieTitles = generateMovieTitles();
        console.log(movieTitles);
        // const movieTitles = ["Spiderman", "Avtar"];
        const requests = movieTitles.map((title) =>
          axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&t=${title}`)
        );

        const responses = await Promise.all(requests);
        const fetchedMovies = responses.map((response, index) => ({
          title: movieTitles[index],
          movie: response.data,
        }));
        console.log("home\n", fetchedMovies);
        setMovies(fetchedMovies || []);
        console.log(fetchedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    if (inView) {
      setAnimationStarted(true);
      fetchMovies();
    } else {
      setAnimationStarted(false);
    }
  }, [inView, searchValue]);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // useEffect(() => {
  //   const handleKeyPress = (event) => {
  //     if (event.key === "Enter") {
  //       // Trigger the movie fetch when Enter is pressed
  //       fetchMovies();
  //     }
  //   };

  //   document.addEventListener("keydown", handleKeyPress);

  //   return () => {
  //     document.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, [searchValue, fetchMovies]);

  const handleSearch = (moviename, fetchMovies) => {
    // Trigger the movie fetch when Enter is pressed
    fetchMovies();
    navigate(`/discover?search=${encodeURIComponent(moviename)}`);
  };

  return (
    <>
      <Navbar
        setSearchValues={setSearchValue}
        searchValue={searchValue}
        searchChange={searchChange}
      />
      <div className="pb-20 heading">
        <h2
          className={`text-white most-picks ${
            animationStarted ? "animate__animated animate__fadeInUp" : ""
          } `}
        >
          All Movies
        </h2>
        <div
          ref={ref}
          className={`pb-10 movie-card-section1 m-0 ${
            animationStarted ? "animate__animated animate__fadeIn" : ""
          } grid grid-cols-6 gap-x-8 `}
          style={{ gridTemplateRows: "repeat(5, 1fr)" }}
        >
          {movies.map(({ title, movie }) => (
            <div
              key={movie.imdbID}
              className={`rounded movie-card1 m-0 ${
                animationStarted ? "animate__animated animate__fadeIn" : ""
              } transition-transform duration-300 ease-in-out`}
              onClick={() => openModal({ title, movie })}
            >
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={`Movie ${title}`}
                className="rounded movie-poster"
              />
              <div className="movie-info pt-3">
                <h2
                  className="text-white flex justify-center movie-title whitespace-normal overflow-hidden overflow-ellipsis"
                  style={{
                    maxWidth: "200px", // Set a maximum width if needed
                  }}
                >
                  {title}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedMovie && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Movie Modal"
            className="w-96 h-96 flex flex-col gap-5 items-center justify-center"
          >
            <h2>{selectedMovie.movie.Title}</h2>
            <p>{selectedMovie.movie.Plot}</p>
            <p>IMDb Rating: {selectedMovie.movie.imdbRating}</p>
            <div>
              <button>Netflix</button>
              <button>Prime Video</button>
            </div>
            <button onClick={closeModal}>Close</button>
          </Modal>
        )}
      </div>
      <FooterComp />
    </>
  );
};

export default Discover;
