import React, { useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    axios.post('/dokotomeyo/login', { user: { email: email, password: password } })
    .then((response) => {
      switch (response.data.status){
        case 200:
          console.log(response.data.message);
          navigate("/dokotomeyo");
          break;
        case 400:
          setError(response.data.message);
          break;
      }
    })
    .catch(() => {
      console.log("通信に失敗しました");
    })
    event.preventDefault();
  }

  return (
    <Sform_wrapper>
      <Sform_title>ログイン</Sform_title>
      <SError error={error}>{error}</SError>
      <form onSubmit={handleSubmit}>
        <Sform_container>
          <li>
            <Stext_label>メールアドレス</Stext_label>
            <Stext_field
              type="email"
              name="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </li>
          <li>
            <Stext_label>パスワード</Stext_label>
            <Stext_field
              type="password"
              name="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </li>
          <Stext_submit>ログイン</Stext_submit>
        </Sform_container>
      </form>
    </Sform_wrapper>
  );
};

const Sform_wrapper = styled.div`
  background-color: rgb(255, 255, 255);
`;

const Sform_title = styled.h1`
  text-align: center;
  font-size: 25px;
  padding: 30px;
`;

const SError = styled.p`
  text-align: center;
  font-size: 20px;
  padding: 15px;
  color: red;
  ${props => props.error
    ? "display: block;"
    : "display: none;"
  }
`;

const Sform_container = styled.ul`
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

const Stext_label = styled.label`
  width: 30%;
  border-radius: 3px;
`;

const Stext_field = styled.input`
  width: 60%;
  border: solid 1px gray;
  border-radius: 5px;
  padding: 10px;
`;

const Stext_submit = styled.button`
  width: 20%;
  background-color: rgba(75, 189, 255, 0.911);
  color: white;
  border-radius: 4px;
  margin: 10px;
  margin-left: auto;
  padding: 11px 20px;
  text-align: center;
`;

export default Login;