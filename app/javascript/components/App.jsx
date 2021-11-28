import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useFlash from '../hooks/useFlash';
import Header from "./Header";
import SearchContainer from "./SearchContainer";
import Post from "./Post";
import Login from "./Login";
import Signup from "./Signup";

const App = () => {
  const { flashMessage, setAndReturn } = useFlash();

  return (
    <BrowserRouter>
      <Header setAndReturn={setAndReturn}/>
      <Routes>
        <Route path="/dokotomeyo" element={<SearchContainer flashMessage={flashMessage} />} />
        <Route path="/dokotomeyo/post" element={<Post />} />
        <Route path="/dokotomeyo/login" element={<Login setAndReturn={setAndReturn} />} />
        <Route path="/dokotomeyo/signup" element={<Signup setAndReturn={setAndReturn} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
