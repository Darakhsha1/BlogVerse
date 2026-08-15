import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
function Router() {
  return (
    <Routes>
      <Route
  path="/" element={
  <>
  
  <Navbar/>
  <Home/>
  <Footer/>
  
  </>}
/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>}/>
        <Route
  path="/post/:id" element={
  <>
  
  <Navbar/>
  <Single/>
  <Footer/>
  
  </>}
/>
        <Route path="/write" element={<>
        <Navbar/>
        <Write/>
        <Footer/>
        </>}/>
    </Routes>
  );
}

export default Router;