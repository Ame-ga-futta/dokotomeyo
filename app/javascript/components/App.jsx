import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useFlash from '../hooks/useFlash';
import SessionContext from "./providers/SessionProvider";
import FlashMessageContext from "./providers/FlashMessageProvider";
import Flash from "./Top/Flash";
import Header from "./Header/Header";
import Top from "./Top/Top";
import Mypage from "./Mypage/Mypage";
import Post from "./Post/Post";
import Login from "./Session/Login";
import GuestLogin from "./Session/GuestLogin";
import Signup from "./Session/Signup";
import PostInquiry from "./PostInquiry/Inquiry";
import DeleteUser from "./Session/DeleteUser";
import Issue from "./Session/Issue";
import EditParking from "./Edit/EditParking";
import Admin from "./Admin/Admin";

const App = (props) => {
  const { flashMessage, bookFlashMessage } = useFlash();
  const [userName, setUserName] = useState(props.username);

  return (
    <BrowserRouter>
      <SessionContext.Provider value={{userName, setUserName}}>
        <FlashMessageContext.Provider value={bookFlashMessage}>
          {flashMessage && <Flash message={flashMessage}/>}
          <Header />
          <Routes>
            <Route path="/dokotomeyo" element={<Top />} />
            <Route path="/dokotomeyo/detail/:id" element={<Top />} />
            <Route path="/dokotomeyo/mypage" element={<Mypage />} />
            <Route path="/dokotomeyo/post" element={<Post />} />
            <Route path="/dokotomeyo/login" element={<Login />} />
            <Route path="/dokotomeyo/guest_login" element={<GuestLogin />} />
            <Route path="/dokotomeyo/signup" element={<Signup />} />
            <Route path="/dokotomeyo/post_inquiry" element={<PostInquiry />} />
            <Route path="/dokotomeyo/delete" element={<DeleteUser />} />
            <Route path="/dokotomeyo/issue" element={<Issue />} />
            <Route path="/dokotomeyo/parking/:id" element={<EditParking />} />
            <Route path="/dokotomeyo/admin" element={<Admin />} />
          </Routes>
        </FlashMessageContext.Provider>
      </SessionContext.Provider>
    </BrowserRouter>
  );
};

export default App;
