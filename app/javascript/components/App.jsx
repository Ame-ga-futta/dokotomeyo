import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import useFlash from '../hooks/useFlash';
import Header from "./Header";
import SearchContainer from "./SearchContainer";
import Mypage from "./Mypage";
import Post from "./Post";
import Login from "./Login";
import Signup from "./Signup";

const App = () => {
  const { flashMessage, setAndReturn } = useFlash();
  const [userName, setUserName] = useState();

  const checkUserStatus = () => {
    axios.get('/dokotomeyo/checkUserStatus')
    .then((response) => {
      setUserName(response.data.name);
    })
    .catch(() => {
      console.log("通信に失敗しました");
    })
  };

  useEffect(checkUserStatus, []);

  return (
    <BrowserRouter>
      <Header userName={userName} setUserName={setUserName} setAndReturn={setAndReturn}/>
      <Routes>
        <Route path="/dokotomeyo" element={<SearchContainer flashMessage={flashMessage} />} />
        <Route path="/dokotomeyo/mypage" element={<Mypage />} />
        <Route path="/dokotomeyo/post" element={<Post />} />
        <Route path="/dokotomeyo/login" element={<Login setUserName={setUserName} setAndReturn={setAndReturn} />} />
        <Route path="/dokotomeyo/signup" element={<Signup setUserName={setUserName} setAndReturn={setAndReturn} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
