import "./App.css";
import Home from "./Pages/Home";
import Discover from "./Pages/Discover";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
