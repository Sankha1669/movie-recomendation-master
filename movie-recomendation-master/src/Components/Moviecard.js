import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Modal from "react-modal";
import axios from "axios";
import "animate.css/animate.css";

Modal.setAppElement("#root");

const MovieCard = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
  });

  const [animationStarted, setAnimationStarted] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (inView) {
      setAnimationStarted(true);

      const sampleMovieTitles = [
        "Inception",
        "The Shawshank Redemption",
        "The Dark Knight",
        "Pulp Fiction",
        "Fight Club",
        "Forrest Gump",
        "The Matrix",
        "The Godfather",
        "Schindler's List",
        "Titanic",
        "Avatar",
        "Jurassic Park",
      ];

      const fetchMovies = async () => {
        try {
          const requests = sampleMovieTitles.map((title) =>
            axios.get(`https://www.omdbapi.com/?apikey=637a7468&t=${title}`)
          );

          const responses = await Promise.all(requests);
          const fetchedMovies = responses.map((response, index) => ({
            title: sampleMovieTitles[index],
            movie: response.data,
          }));
          setMovies(fetchedMovies || []);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      };

      fetchMovies();
    } else {
      setAnimationStarted(false);
    }
  }, [inView]);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="">
      <h2
        className={`text-white most-picks ${
          animationStarted ? "animate__animated animate__fadeInUp" : ""
        }`}
      >
        Most Picks
      </h2>
      <div
        ref={ref}
        className={`pb-10 movie-card-section ${
          animationStarted ? "animate__animated animate__fadeIn" : ""
        } grid grid-cols-2 gap-x-8 gap-y-8`}
      >
        <MovieRow
          animationType="from-sides"
          animationStarted={animationStarted}
          titlePrefix="Action Movie"
          openModal={openModal}
          movies={movies.slice(0, 6)} // First 6 movies for the first row
        />
        <MovieRow
          animationType="from-corners"
          animationStarted={animationStarted}
          titlePrefix="Comedy Movie"
          openModal={openModal}
          movies={movies.slice(6, 12)} // Next 6 movies for the second row
        />
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
            {/* Add more buttons for other OTT platforms */}
          </div>
          <button onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
};

const MovieRow = ({
  animationType,
  animationStarted,
  titlePrefix,
  openModal,
  movies,
}) => {
  const animationClass =
    animationType === "from-sides"
      ? "animate__animated animate__fadeInLeft"
      : "animate__animated animate__fadeInRight";

  return (
    <div
      className={`movie-row ${animationType} ${
        animationStarted ? "animate__animated animate__fadeIn" : ""
      }`}
    >
      {movies.map(({ title, movie }) => (
        <div
          key={movie.imdbID}
          className={`rounded movie-card ${
            animationStarted ? "animate__animated animate__fadeIn" : ""
          } ${animationStarted ? animationClass : ""}`}
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
            <h2 className="text-white flex justify-center movie-title">
              {title}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieCard;
