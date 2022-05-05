import React, { useContext, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import FlashMessageContext from "../providers/FlashMessageProvider";

const PostInquiry = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const bookFlashMessage = useContext(FlashMessageContext);

  const handleSubmit = (event) => {
    axios.post('/dokotomeyo/inquiry',{ post_inquiry: { address: address, message: message, name: name } })
    .then((response) => {
      switch (response.data.status){
        case 200:
          bookFlashMessage(response.data.message);
          navigate("/dokotomeyo");
          break;
        case 400:
          setErrors(response.data.message);
          break;
      }
    })
    .catch(() => {
      setErrors(["通信に失敗しました"]);
    })
    event.preventDefault();
  }

  return (
    <SInquiry_wrapper>
      <SInquiry_title_container>
        <SForm_title>お問い合わせ</SForm_title>
        <SError_container>
          {errors && errors.map((error, i) => {
            return (
              <li key={i}><SError>{error}</SError></li>
            );
          })}
        </SError_container>
      </SInquiry_title_container>
      <form onSubmit={handleSubmit}>
        <SForm_container>
          <li>
            <SText_label>お問い合わせ名</SText_label>
            <SText_field
              type="text"
              name="name"
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </li>
          <li>
            <SText_label>返信用メールアドレス</SText_label>
            <SText_field
              type="email"
              name="address"
              value={address}
              onChange={event => setAddress(event.target.value)}
            />
          </li>
          <li>
            <SText_label>お問い合わせ内容</SText_label>
            <SText_area
              type="text"
              name="message"
              value={message}
              onChange={event => setMessage(event.target.value)}
            />
          </li>
          <SText_submit>登録</SText_submit>
        </SForm_container>
      </form>
    </SInquiry_wrapper>
  );
};

const SInquiry_wrapper = styled.div`
  background-color: rgb(255, 255, 255);
`;

const SInquiry_title_container = styled.div`
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

const SText_area = styled.textarea`
  width: 60%;
  height: calc( 1.2em * 10 );
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

export default PostInquiry;
