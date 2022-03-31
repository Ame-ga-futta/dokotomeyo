import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useFlash from '../hooks/useFlash';
import FlashMessage from "./providers/FlashMessageProvider";
import Flash from "./Top/Flash";
import Header from "./Header/Header";
import Top from "./Top/Top";
import Mypage from "./Mypage/Mypage";
import Post from "./Post/Post";
import Login from "./Session/Login";
import Signup from "./Session/Signup";
import DeleteUser from "./Session/DeleteUser";
import EditParking from "./Edit/EditParking";

const App = (props) => {
  const { flashMessage, bookFlashMessage } = useFlash();
  const [userName, setUserName] = useState(props.username);

  return (
    <BrowserRouter>
      <FlashMessage.Provider value={bookFlashMessage}>
        {flashMessage && <Flash message={flashMessage}/>}
        <Header userName={userName} setUserName={setUserName} />
        <Routes>
          <Route path="/dokotomeyo" element={<Top userName={userName} />} />
          <Route path="/dokotomeyo/detail/:id" element={<Top userName={userName} />} />
          <Route path="/dokotomeyo/mypage" element={<Mypage userName={userName} />} />
          <Route path="/dokotomeyo/post" element={<Post />} />
          <Route path="/dokotomeyo/login" element={<Login userName={userName} setUserName={setUserName} />} />
          <Route path="/dokotomeyo/signup" element={<Signup userName={userName} setUserName={setUserName} />} />
          <Route path="/dokotomeyo/delete" element={<DeleteUser userName={userName} setUserName={setUserName} />} />
          <Route path="/dokotomeyo/parking/:id" element={<EditParking />} />
        </Routes>
      </FlashMessage.Provider>
    </BrowserRouter>
  );
};

export default App;
