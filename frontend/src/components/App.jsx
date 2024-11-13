import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import MyCalendar from "./Calendar";
import "../style/global.scss";
import AddEvents from "./AddEvents";
import UpdateEvent from "./UpdateEvent";

function App() {
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link className="navbar-brand ms-2" to="/">
            <h3>Zenstreet.ai Calendar</h3>
          </Link>
          {/* Button styled Add Event button */}
          <span className="navbar-brand mb-0 h2">
            <Link to={"/events/add"}>
              <button
                className="btn"
                style={{
                  fontWeight:"bolder",
                  backgroundColor: "#add8e6", // Light blue background
                  color: "black",               // White text color
                  padding: "10px 20px",         // Add padding to make it look like a button
                  borderRadius: "20px",          // Rounded corners
                  border: "none",               // Remove border
                  fontSize: "16px",             // Adjust font size if needed
                  textDecoration: "none",  
                       // Remove underline
                }}
              >
                Add Event
              </button>
            </Link>
          </span>
          {/* Search field */}
          <form className="d-flex ms-auto">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Events"
              aria-label="Search"
            />
          </form>
        </div>
      </nav>
      <Routes>
        <Route path="/" exact element={<MyCalendar />} />
        <Route path="/events/add" element={<AddEvents />} />
        <Route path="/event/:id/update" element={<UpdateEvent />} />
      </Routes>
    </>
  );
}

export default App;
