import React, { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FlashMessageContext from "../providers/FlashMessageProvider";
import User from "./User/User";
import Parking from "./Parking/Parking";
import RequirementFree from "./Requirement_free/RequirementFree";
import RequirementBuy from "./Requirement_buy/RequirementBuy";
import RequirementFacility from "./Requirement_facility/RequirementFacility";
import RequirementTime from "./Requirement_time/RequirementTime";
import Comment from "./Comment/Comment";
import Favorite from "./Favorite/Favorite";

const Admin = () => {
  const [changeTab, setChangeTab] = useState("User");
  const navigate = useNavigate();
  const bookFlashMessage = useContext(FlashMessageContext);

  const displayTab = () => {
    switch (changeTab){
      case "User":
        return <User />
      case "Parking":
        return <Parking />
      case "Requirement_free":
        return <RequirementFree />
      case "Requirement_buy":
        return <RequirementBuy />
      case "Requirement_facility":
        return <RequirementFacility />
      case "Requirement_time":
        return <RequirementTime />
      case "Comment":
        return <Comment />
      case "Favorite":
        return <Favorite />
    }
  }

  useEffect(() => {
    axios.get('/dokotomeyo/authenticate')
    .then((response) => {
      switch (response.data.status){
        case 200:
          break;
        case 401:
          bookFlashMessage(response.data.message);
          navigate("/dokotomeyo");
          break;
      }
    })
    .catch(() => {
      bookFlashMessage("ユーザー認証に失敗しました");
      navigate("/dokotomeyo");
    })
  }, [])

  return (
    <SAdmin_wrapper>
      <SAdmin_sidebar>
        <SAdmin_sidebar_title>Model</SAdmin_sidebar_title>
        <SAdmin_sidebar_tab onClick={() => setChangeTab("User")}>User</SAdmin_sidebar_tab>
        <SAdmin_sidebar_tab onClick={() => setChangeTab("Parking")}>Parking</SAdmin_sidebar_tab>
        <SAdmin_sidebar_tab onClick={() => setChangeTab("Requirement_free")}>Requirement_free</SAdmin_sidebar_tab>
        <SAdmin_sidebar_tab onClick={() => setChangeTab("Requirement_buy")}>Requirement_buy</SAdmin_sidebar_tab>
        <SAdmin_sidebar_tab onClick={() => setChangeTab("Requirement_facility")}>Requirement_facility</SAdmin_sidebar_tab>
        <SAdmin_sidebar_tab onClick={() => setChangeTab("Requirement_time")}>Requirement_time</SAdmin_sidebar_tab>
        <SAdmin_sidebar_tab onClick={() => setChangeTab("Comment")}>Comment</SAdmin_sidebar_tab>
        <SAdmin_sidebar_tab onClick={() => setChangeTab("Favorite")}>Favorite</SAdmin_sidebar_tab>
      </SAdmin_sidebar>
      <SAdmin_container>
        {displayTab()}
      </SAdmin_container>
    </SAdmin_wrapper>
  );
};

const SAdmin_wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 80px );
`;

const SAdmin_sidebar = styled.div`
  width: 20%;
  background-color: #eeeeee;
`;

const SAdmin_sidebar_title = styled.p`
  height: 50px;
  padding: 15px 20px;
  font-weight: bold;
`;

const SAdmin_sidebar_tab = styled.p`
  padding: 10px 24px;
  transition: all 0.4s;
  &:hover {
    background-color: rgb(205, 205, 205);
  }
`;

const SAdmin_container = styled.div`
  width: 80%;
`;

export default Admin;
