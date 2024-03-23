import React from "react";
import Slider from "../Components/Slider";
import Navbar from "../Components/Navbar";
import MovieCard from "../Components/Moviecard";
import Feedback from "../Components/Feedback";
import ScrollButton from "../Components/ScrollButton";
import FooterComp from "../Components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Slider />
      <MovieCard />
      <Feedback />
      <ScrollButton />
      <hr className=" border-gray-200 sm:mx-auto dark:border-gray-700 " />
      <FooterComp />
    </>
  );
};

export default Home;
