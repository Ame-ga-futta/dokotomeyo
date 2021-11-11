import React from "react";
import styled from 'styled-components';
import Menu from "./Menu"

const Header = () => {
  return (
    <>
      <SHeaders>
        <SHeader>
          <SHeader_left>
            <SHeader_title>dokotomeyo</SHeader_title>
          </SHeader_left>
          <Menu />
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
  background-color: rgb(63, 63, 63);
  color: #ffffff;
  padding: 10px 60px;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SHeader_left = styled.div`
  display: flex;
  align-items: center;
`;

const SHeader_title = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 40px;
  padding: 10px;
`;

const SHeader_right = styled.div`

`;

const SHeader_background = styled.div`
  height: 80px;
`;

export default Header;
