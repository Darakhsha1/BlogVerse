import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
import logo from "../assets/logo.png";

function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);

  const categories = [
    ["ART", "art"],
    ["SCIENCE", "science"],
    ["TECHNOLOGY", "technology"],
    ["CINEMA", "cinema"],
    ["DESIGN", "design"],
    ["FOOD", "food"],
  ];

  return (
    <div className="nnavbar">
      <div className="ccontainer">

        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Lama Blog" />
          </Link>
        </div>

        <div className="links">

          <div className="categories">
            {categories.map(([name, value]) => (
              <Link
                key={value}
                className="navCategory"
                to={`/?cat=${value}`}
              >
                {name}
              </Link>
            ))}
          </div>

          {currentUser ? (
            <>
              <div className="userPill">
                <div className="avatar">
                  {currentUser.username?.charAt(0).toUpperCase()}
                </div>

                <span>{currentUser.username}</span>
                <span className="arrow">⌄</span>
              </div>

              <button className="logoutBtn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link className="loginBtn" to="/login">
              Login
            </Link>
          )}

          <Link className="writeBtn" to="/write">
            Write
          </Link>

        </div>
      </div>
    </div>
  );
}

export default Navbar;