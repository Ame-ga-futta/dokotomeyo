import React, { useState } from "react";
import styled from 'styled-components';
import axios from 'axios';

const Issue = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {

    event.preventDefault();
  }

  return (
    <SForm_wrapper>
      <SForm_title_container>
        <SForm_title>パスワードを忘れた場合</SForm_title>
        <SError_container>
          {errors && <SError>{errors}</SError>}
        </SError_container>
      </SForm_title_container>
      <form onSubmit={handleSubmit}>
        <SForm_container>
          <SForm_container_header>登録したメールアドレスにパスワードを送信します</SForm_container_header>
          <li>
            <SText_label>メールアドレス</SText_label>
            <SText_field
              type="email"
              name="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </li>
          <SText_submit>送信</SText_submit>
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

const SForm_container_header = styled.p`
  margin: 10px;
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

export default Issue;
