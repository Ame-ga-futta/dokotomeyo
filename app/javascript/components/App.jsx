import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./Header";
import SearchContainer from "./SearchContainer";
import Post from "./Post";
import Login from "./Login";
import Signup from "./Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/dokotomeyo" element={<SearchContainer />} />
        <Route path="/dokotomeyo/post" element={<Post />} />
        <Route path="/dokotomeyo/login" element={<Login />} />
        <Route path="/dokotomeyo/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
