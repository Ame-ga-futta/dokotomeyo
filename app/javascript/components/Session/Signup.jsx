import React, { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FlashMessage from "../providers/FlashMessageProvider";
import SessionContext from "../providers/SessionProvider";

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const bookFlashMessage = useContext(FlashMessage);
  const {userName, setUserName} = useContext(SessionContext);

  const handleSubmit = (event) => {
    axios.post('/dokotomeyo/signup', { user: { name: name, email: email, password: password, password_confirmation: passwordConfirmation } })
    .then((response) => {
      switch (response.data.status){
        case 200:
          setUserName(response.data.name);
          bookFlashMessage(response.data.message);
          navigate("/dokotomeyo");
          break;
        case 400:
          setErrors(response.data.message);
          setEmail("");
          setPassword("");
          setPasswordConfirmation("");
          break;
        case 401:
          bookFlashMessage(response.data.message);
          navigate("/dokotomeyo");
          break;
      }
    })
    .catch(() => {
      setErrors(["通信に失敗しました"]);
    })
    event.preventDefault();
  };

  useEffect(() => {
    if (userName) {
      bookFlashMessage("すでにログインしています");
      navigate("/dokotomeyo");
    }
  }, []);

  return (
    <SForm_wrapper>
      <SForm_title_container>
        <SForm_title>新規登録</SForm_title>
        <SError_container>
          {errors && errors.map((error, i) => {
            return (
              <li key={i}><SError>{error}</SError></li>
            );
          })}
        </SError_container>
      </SForm_title_container>
      <form onSubmit={handleSubmit}>
        <SForm_container>
          <li>
            <SText_label>ユーザーネーム</SText_label>
            <SText_field
              type="text"
              name="name"
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </li>
          <li>
            <SText_label>メールアドレス</SText_label>
            <SText_field
              type="email"
              name="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </li>
          <li>
            <SText_label>パスワード</SText_label>
            <SText_field
              type="password"
              name="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </li>
          <li>
            <SText_label>パスワード ※再確認</SText_label>
            <SText_field
              type="password"
              name="password_confirmation"
              value={passwordConfirmation}
              onChange={event => setPasswordConfirmation(event.target.value)}
            />
          </li>
          <SText_submit>登録</SText_submit>
        </SForm_container>
      </form>
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

const SText_label = styled.label`
  width: 30%;
  border-radius: 3px;
`;

const SText_field = styled.input`
  width: 60%;
  border: solid 1px gray;
  border-radius: 5px;
  padding: 10px;
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

export default Signup;
