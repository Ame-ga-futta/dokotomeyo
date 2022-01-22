import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useFlash from '../hooks/useFlash';
import Header from "./Header/Header";
import Top from "./Top/Top";
import Mypage from "./Mypage/Mypage";
import Post from "./Post/Post";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";

const App = (props) => {
  const { flashMessage, bookFlashMessage } = useFlash();
  const [userName, setUserName] = useState(props.username);

  return (
    <BrowserRouter>
      <Header userName={userName} setUserName={setUserName} bookFlashMessage={bookFlashMessage}/>
      <Routes>
        <Route path="/dokotomeyo" element={<Top flashMessage={flashMessage} bookFlashMessage={bookFlashMessage} />} />
        <Route path="/dokotomeyo/mypage" element={<Mypage userName={userName} bookFlashMessage={bookFlashMessage} />} />
        <Route path="/dokotomeyo/post" element={<Post bookFlashMessage={bookFlashMessage} />} />
        <Route path="/dokotomeyo/login" element={<Login userName={userName} setUserName={setUserName} bookFlashMessage={bookFlashMessage} />} />
        <Route path="/dokotomeyo/signup" element={<Signup userName={userName} setUserName={setUserName} bookFlashMessage={bookFlashMessage} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
