import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Stations from "./pages/Stations";
import BookStation from "./pages/BookStation";
import AddStation from "./pages/AddStation";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <nav style={{ padding: "1rem", background: "#222", color: "#fff" }}>
        <Link to="/" style={{ marginRight: "1rem", color: "white" }}>
          Stations
        </Link>
        <Link to="/book" style={{ marginRight: "1rem", color: "white" }}>
          Book
        </Link>
        <Link to="/add-station" style={{ marginRight: "1rem", color: "white" }}>
          Admin
        </Link>
        <Link to="/login" style={{ color: "white" }}>
          Login
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Stations />} />
        <Route path="/book" element={<BookStation />} />
        <Route path="/add-station" element={<AddStation />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
