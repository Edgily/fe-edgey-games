import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";

import { Header } from "./components/Header";
import { Nav } from "./components/Nav";
import { NotFound } from "./components/NotFound";
import { Reviews } from "./components/Reviews";
import { SignIn } from "./components/SignIn";
import { SingleReview } from "./components/SingleReview";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<Reviews />} />
          <Route path="/:review_id" element={<SingleReview />} />
          <Route path="/signin" element={<SignIn />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
