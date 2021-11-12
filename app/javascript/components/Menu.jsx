import React, { useState } from "react";
import styled from 'styled-components';
import About from "./About"

const Menu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const hamburger = () => {
    setOpenMenu(!openMenu);
  };

  const [openAbout, setOpenAbout] = useState(false);
  const about = () => {
    setOpenMenu(false);
    setOpenAbout(true);
  };

  return (
    <>
      <SHamburger onClick={hamburger}>
        <SHamburger_span openMenu={openMenu}></SHamburger_span>
        <SHamburger_span openMenu={openMenu}></SHamburger_span>
        <SHamburger_span openMenu={openMenu}></SHamburger_span>
      </SHamburger>
      <SGlobalMenuSp openMenu={openMenu}>
        <ul>
          <li><a href="/dokotomeyo/login">ログイン</a></li>
          <li><a href="/dokotomeyo/sign_up">新規登録</a></li>
          <li><a href="/dokotomeyo/post">駐車場情報投稿</a></li>
          <li><p onClick={about}>dokotomeyoとは</p></li>
        </ul>
      </SGlobalMenuSp>
      <About openAbout={openAbout} setOpenAbout={setOpenAbout} />
    </>
  );
};

const SHamburger = styled.div`
  display : block;
  position: fixed;
  z-index : 3;
  right : 73px;
  top   : 19px;
  width : 42px;
  height: 42px;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  transition: all 0.6s;
  &:hover {
    background-color: rgb(189, 189, 189);
  }
`;

const SHamburger_span = styled.span`
  display : block;
  position: absolute;
  width   : 30px;
  height  : 2px ;
  left    : 6px;
  background :#fff;
  transition : 0.3s ease-in-out;
  &:nth-child(1) {
    ${ props => props.openMenu
      ? "top: 20px; transform: rotate(-45deg);"
      : "top: 10px;" }
  }
  &:nth-child(2) {
    ${ props => props.openMenu
      ? "top: 20px; transform: rotate(45deg);"
      : "top: 20px;" }
  }
  &:nth-child(3) {
    ${ props => props.openMenu
      ? "top: 20px; transform: rotate(45deg);"
      : "top: 30px;" }
  }
`;

const SGlobalMenuSp = styled.nav`
  position: fixed;
  z-index : 2;
  top  : 0;
  left : 0;
  color: #fff;
  background: rgba(24, 24, 24, 0.7);
  text-align: center;
  width: 100%;
  height: 100%;
  transition: all 0.6s;
  transform: translateY(${ props => props.openMenu ? "0%" : "-100%" });
  ul {
    margin: 0 auto;
    margin-top: 80px;
    padding: 0;
    width: 100%;
  }
  ul li {
    list-style-type: none;
    padding: 0;
    width: 100%;
  }
  ul li:last-child {
    padding-bottom: 0;
  }
  ul li:hover{
    background: rgb(165, 165, 165);
    transition: all 0.6s;
  }
  ul li a {
    display: block;
    color: #fff;
    padding: 1em 0;
    text-decoration :none;
  }
  ul li p {
    display: block;
    color: #fff;
    padding: 1em 0;
    text-decoration :none;
  }
`;

export default Menu;
