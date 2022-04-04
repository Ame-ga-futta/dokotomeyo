import React, { useState } from "react";
import styled from 'styled-components';

const Admin = () => {
  const [changeTab, setChangeTab] = useState("User")

  const displayTab = () => {
    switch (changeTab){
      case "User":
        return <p>User</p>
      case "Parking":
        return <p>Parking</p>
      case "Requirement_free":
        return <p>Requirement_free</p>
      case "Requirement_buy":
        return <p>Requirement_buy</p>
      case "Requirement_facility":
        return <p>Requirement_facility</p>
      case "Requirement_time":
        return <p>Requirement_time</p>
      case "Comment":
        return <p>Comment</p>
      case "Favorite":
        return <p>Favorite</p>
    }
  }

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
