import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Router from "./Router.jsx"
import "./style.scss";

function App() {
  return (
    <div className="app">
      <div className="container">
      <Router />
      </div>
    </div>
  );
}

export default App;