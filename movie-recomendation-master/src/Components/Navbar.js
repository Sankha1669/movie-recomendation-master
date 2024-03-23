import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const apiKey = process.env.REACT_APP_OMDB_API_KEY;

export default function Navbar({ setSearchValues, searchChange }) {
  // const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  // const searchChange = async (name) => {
  //   // if (!name.length) {
  //   //   return fetchMovies();
  //   // }
  //   const res = await axios.get(
  //     `https://www.omdbapi.com/?apikey=${apiKey}&s=${name}`
  //   );
  //   console.log("searchres\n", res.data);
  //   const data = res.data.Search.map((elem) => {
  //     return {
  //       title: elem.Title,
  //       movie: elem,
  //     };
  //   });
  //   setMovies([...data]);
  // };

  return (
    <nav className=" max-w-screen-3xl bg-gray-700 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-4xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink
          href="https://flowbite.com/"
          className="flex flex-row items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-3xl text-white font-semibold whitespace-nowrap dark:text-white">
            MovieMoz
          </span>
        </NavLink>
        <div className="flex md:order-2">
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pb-1 pointer-events-none">
              <svg
                className="w-4 h-4  text-md text-gray-300 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only ">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block search p-2 ps-10 text-sm text-gray-900 border border-gray-500 rounded-lg bg-gray-800 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 hover:border-blue-500"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  // setSearchValues(searchValue);
                  searchChange(searchValue);
                }
              }}
            />
          </div>
          <button
            data-collapse-toggle="navbar-search"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-search"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-search"
        >
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
          <ul className="flex flex-col p-4 md:p-0 mt-4 text-2xl font-medium border border-gray-100 rounded-lg bg-gray-700 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-700 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to="/"
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/discover"
                className="block py-2 px-3 text-white rounded  md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Discover
              </NavLink>
            </li>
            {/* <li>
              <button
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                className="flex items-center justify-between w-full py-2 px-3 text-white text-gray-900 rounded  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                Genre{" "}
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdownNavbar"
                className="z-10 hidden font-normal divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  className="py-2 text-sm bg-gray-600 px-2 rounded-t text-white dark:text-gray-400"
                  aria-labelledby="dropdownLargeButton"
                >
                  <li>
                    <NavLink
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 rounded hover:text-gray-900 hover:bg- dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 hover:text-gray-900 rounded dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Settings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 hover:text-gray-900 rounded dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Earnings
                    </NavLink>
                  </li>
                </ul>
                <div className=" bg-gray-600 rounded-b py-1">
                  <NavLink
                    href="#"
                    className="block px-4 py-2 text-sm text-white bg-gray-600 rounded hover:text-gray-900 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </NavLink>
                </div>
              </div>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}
