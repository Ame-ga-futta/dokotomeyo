import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Profile from "./Profile";
import Favorite from "./Favorite";
import Comment from "./Comment"

const Mypage = (props) => {
  const { userName, bookFlashMessage } = props;
  const navigate = useNavigate();

  const [changeTab, setChangeTab] = useState("profile");

  const displayTab = () => {
    switch (changeTab){
      case "profile":
        return <Profile />
      case "favorite":
        return <Favorite />
      case "comment":
        return <Comment />
    }
  }

  useEffect(() => {
    if (!userName) {
      bookFlashMessage("ログインしていません");
      navigate("/dokotomeyo");
    }
  }, []);

  return (
    <SMypage_wrapper>
      <SMypage_sidebar>
        <SMypage_sidebar_title>{userName}</SMypage_sidebar_title>
        <SMypage_sidebar_tab onClick={() => setChangeTab("profile")}>ユーザー情報</SMypage_sidebar_tab>
        <SMypage_sidebar_tab onClick={() => setChangeTab("favorite")}>お気に入り</SMypage_sidebar_tab>
        <SMypage_sidebar_tab onClick={() => setChangeTab("comment")}>投稿コメント</SMypage_sidebar_tab>
      </SMypage_sidebar>
      <SMypage_container>
        {displayTab()}
      </SMypage_container>
    </SMypage_wrapper>
  );
};

const SMypage_wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 80px );
`;

const SMypage_sidebar = styled.div`
  width: 20%;
  background-color: #eeeeee;
`;

const SMypage_sidebar_title = styled.p`
  padding: 15px 20px 10px 20px;
  font-weight: bold;
`;

const SMypage_sidebar_tab = styled.p`
  padding: 10px 24px;
  transition: all 0.4s;
  &:hover {
    background-color: rgb(205, 205, 205);
  }
`;

const SMypage_container = styled.div`
  width: 80%;
`;

export default Mypage;
