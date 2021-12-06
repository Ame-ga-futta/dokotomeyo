import React from "react";
import styled from 'styled-components';

const About = (props) => {
  const { openAbout, setOpenAbout } = props;

  const close = () => {
    setOpenAbout(false)
  };

  return (
    <>
      <SAbout openAbout={openAbout}>
        <SAbout_box>
          <SAbout_close onClick={close}>
            <SAbout_bar></SAbout_bar>
            <SAbout_bar></SAbout_bar>
          </SAbout_close>
          <SAbout_title>dokotomeyoとは</SAbout_title>
          <SAbout_text>
            dokotomeyoは、無料で使用できる駐車場の情報を共有・検索できるサービスです。<br />あなたの『どこ停めよう』の参考になれば幸いです。
          </SAbout_text>
          <SAbout_notice>
            ※掲載内容が間違っている場合があります。必ず現地で確認するようお願いします。<br />
            ※駐車場は常識的な範囲内でご使用ください。
          </SAbout_notice>
        </SAbout_box>
      </SAbout>
    </>
  );
};

const SAbout = styled.div`
  position: fixed;
  z-index : 4;
  top  : 0;
  left : 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(24, 24, 24, 0.7);
  transition : 0.3s ease-in-out;
  transform: translateY(${ props => props.openAbout ? "0%" : "100%" });
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SAbout_box = styled.div`
  width: 70%;
  height: 40%;
  padding: 20px 40px;
  background-color: rgb(156, 156, 156);
  border-radius: 20px;
  text-align: center;
`;

const SAbout_close = styled.div`
  display : block;
  position: relative;
  left: 95%;
  width : 42px;
  height: 42px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.6s;
  &:hover {
    background-color: rgb(189, 189, 189);
  }
`;

const SAbout_bar = styled.span`
  display: block;
  position: absolute;
  width: 30px;
  height: 2px;
  left: 6px;
  top: 20px;
  background :#fff;
  &:nth-child(1) {
    transform: rotate(45deg);
  }
  &:nth-child(2) {
    transform: rotate(-45deg);
  }
`;

const SAbout_title = styled.p`
  font-size: 30px;
  padding: 10px;
  margin-top: 10px 0;
`;

const SAbout_text = styled.p`
  font-size: 18px;
  padding: 7px;
`;

const SAbout_notice = styled.p`
  font-size: 14px;
  padding: 40px 7px 7px 7px;
  text-align: left;
`;

export default About;
