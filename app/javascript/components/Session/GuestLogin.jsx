import React, { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FlashMessageContext from "../providers/FlashMessageProvider";
import SessionContext from "../providers/SessionProvider";

const GuestLogin = () => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const bookFlashMessage = useContext(FlashMessageContext);
  const {userName, setUserName} = useContext(SessionContext);

  const handleSubmit = () => {
    axios.post('/dokotomeyo/guest_login')
    .then((response) => {
      switch (response.data.status){
        case 200:
          setUserName(response.data.name);
          bookFlashMessage(response.data.message);
          navigate("/dokotomeyo");
          break;
        case 400:
          setErrors(response.data.message);
          break;
        case 401:
          navigate("/dokotomeyo");
          bookFlashMessage(response.data.message);
          break;
      }
    })
    .catch(() => {
      setErrors(["通信に失敗しました"]);
    })
  }

  useEffect(() => {
    if (userName) {
      bookFlashMessage("すでにログインしています");
      navigate("/dokotomeyo");
    }
  }, []);

  return (
    <SForm_wrapper>
      <SForm_title_container>
        <SForm_title>ゲストログイン</SForm_title>
        <SError_container>
          {errors && <SError>{errors}</SError>}
        </SError_container>
      </SForm_title_container>
      <SForm_container>
        <li><p>ゲストでログインした場合、お気に入りやコメントは一定時間で削除されます。</p></li>
        <SText_submit onClick={handleSubmit}>ログイン</SText_submit>
      </SForm_container>
    </SForm_wrapper>
  );
};

const SForm_wrapper = styled.div`
  background-color: rgb(255, 255, 255);
`;

const SForm_title_container = styled.div`
  text-align: center;
  padding: 30px;
`;

const SForm_title = styled.h1`
  font-size: 25px;
  padding: 5px;
`;

const SError_container = styled.ul`
  font-size: 20px;
  color: red;
`;

const SError = styled.p`
  padding: 4px;
`;

const SText_submit = styled.button`
  width: 20%;
  background-color: rgb(75, 189, 255);
  color: white;
  border-radius: 4px;
  margin: 10px;
  margin-left: auto;
  padding: 11px 20px;
  text-align: center;
`;

const SForm_container = styled.ul`
  background-color: rgb(235, 235, 235);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  width: 55%;
  margin: 0 auto;
  padding: 30px;
  li {
    margin: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default GuestLogin;
