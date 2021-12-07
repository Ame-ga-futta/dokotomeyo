import React from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Menu from "./Menu"

const Header = (props) => {
  const { userName, setUserName, bookFlashMessage } = props;

  return (
    <>
      <SHeaders>
        <SHeader>
          <div>
            <SHeader_title><Link to="/dokotomeyo">dokotomeyo</Link></SHeader_title>
          </div>
          <div>
            <SHeader_username>{userName}</SHeader_username>
            <Menu userName={userName} setUserName={setUserName} bookFlashMessage={bookFlashMessage}/>
          </div>
        </SHeader>
      </SHeaders>
      <SHeader_background></SHeader_background>
    </>
  );
};

const SHeaders = styled.header`
  position: fixed;
  width: 100%;
  z-index: 2;
`;

const SHeader = styled.div`
  font-family: 'Montserrat', sans-serif;
  background-color: rgb(63, 63, 63);
  color: #ffffff;
  padding: 10px 60px;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SHeader_title = styled.div`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 40px;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.6s;
  &:hover {
    background-color: rgb(189, 189, 189);
  }
`;

const SHeader_username = styled.p`
  font-size: 16px;
  margin-right: 115px;
`;

const SHeader_background = styled.div`
  height: 80px;
`;

export default Header;
