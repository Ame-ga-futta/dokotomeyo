import React, { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FlashMessageContext from "../providers/FlashMessageProvider";
import SessionContext from "../providers/SessionProvider";

const DeleteUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const bookFlashMessage = useContext(FlashMessageContext);
  const {userName, setUserName} = useContext(SessionContext);

  const handleSubmit = () => {
    axios.delete('/dokotomeyo/delete')
    .then((response) => {
      setUserName();
      bookFlashMessage(response.data.message);
      navigate("/dokotomeyo");
    })
    .catch(() => {
      bookFlashMessage("通信に失敗しました");
      navigate("/dokotomeyo");
    })
  }

  useEffect(() => {
    if (userName) {
      axios.get('/dokotomeyo/profile')
      .then((response) => {
        switch (response.data.status) {
          case 200:
            setName(response.data.name)
            setEmail(response.data.email)
            break;
          case 400:
            bookFlashMessage("ユーザー情報が取得できません");
            navigate("/dokotomeyo");
            break;
        }
      })
      .catch(() => {
        bookFlashMessage("ユーザー情報が取得できません");
        navigate("/dokotomeyo");
      })
    } else {
      bookFlashMessage("ログインしていません");
      navigate("/dokotomeyo");
    }
  }, [])

  return (
    <SForm_wrapper>
      <SForm_title_container>
        <SForm_title>アカウント削除</SForm_title>
      </SForm_title_container>
      <SDelete_container>
        <SDelete_userdata>
          <p>このアカウントを削除します</p>
          <ul>
            <SDelete_userdata_item>
              <SDelete_label>ユーザーネーム</SDelete_label>
              <SDelete_text>{name}</SDelete_text>
            </SDelete_userdata_item>
            <SDelete_userdata_item>
              <SDelete_label>メールアドレス</SDelete_label>
              <SDelete_text>{email}</SDelete_text>
            </SDelete_userdata_item>
          </ul>
        </SDelete_userdata>
        <SDelete_caution>
          <p>アカウントを削除すると下記の情報が削除されます</p>
          <ul>
            <SDelete_caution_item>ユーザーの情報</SDelete_caution_item>
            <SDelete_caution_item>お気に入りの情報</SDelete_caution_item>
            <SDelete_caution_item>投稿したコメント</SDelete_caution_item>
          </ul>
        </SDelete_caution>
        <SText_submit onClick={() => {handleSubmit()}}>退会</SText_submit>
      </SDelete_container>
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

const SDelete_container = styled.div`
  background-color: rgb(235, 235, 235);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  width: 55%;
  margin: 0 auto;
  padding: 30px;
`;

const SDelete_userdata = styled.div`

`;

const SDelete_userdata_item = styled.li`
  display: flex;
  flex-direction: row;
  margin: 8px;
  font-size: 14px;
`;

const SDelete_label = styled.p`
  width: 30%;
`;

const SDelete_text = styled.p`
  width: 60%;
`;

const SDelete_caution = styled.div`
  margin-top: 14px;
`;

const SDelete_caution_item = styled.li`
  margin: 8px;
  font-size: 14px;
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

export default DeleteUser;
