import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useFlash from '../hooks/useFlash';
import Header from "./Header";
import SearchContainer from "./SearchContainer";
import Mypage from "./Mypage";
import Post from "./Post";
import Login from "./Login";
import Signup from "./Signup";

const App = (props) => {
  const { flashMessage, setAndReturn } = useFlash();
  const [userName, setUserName] = useState(props.username);

  return (
    <BrowserRouter>
      <Header userName={userName} setUserName={setUserName} setAndReturn={setAndReturn}/>
      <Routes>
        <Route path="/dokotomeyo" element={<SearchContainer flashMessage={flashMessage} />} />
        <Route path="/dokotomeyo/mypage" element={<Mypage userName={userName} setAndReturn={setAndReturn} />} />
        <Route path="/dokotomeyo/post" element={<Post />} />
        <Route path="/dokotomeyo/login" element={<Login userName={userName} setUserName={setUserName} setAndReturn={setAndReturn} />} />
        <Route path="/dokotomeyo/signup" element={<Signup userName={userName} setUserName={setUserName} setAndReturn={setAndReturn} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
