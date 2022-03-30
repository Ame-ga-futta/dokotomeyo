import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';

const ReturnPasswordForm = (props) => {
  const {
    open
  } = props;

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState("");

  const PostNewPassword = (event) => {
    axios.post('/dokotomeyo/update_password', {
      user: {
        currentPassword: currentPassword,
        password: password,
        password_confirmation: passwordConfirmation
      }
    })
    .then((response) => {
      switch (response.data.status) {
        case 200:
          window.location.reload();
          break;
        case 400:
          setErrors(response.data.message);
          break;
      }
    })
    .catch(() => {
      setErrors("通信に失敗しました")
    })
    event.preventDefault();
  }

  useEffect(() => {
    setPassword("")
    setCurrentPassword("")
    setPasswordConfirmation("")
  }, [open])

  return (
    <SProfile_text_item open={open}>
      <form onSubmit={PostNewPassword}>
        <SProfile_forms>
          {errors && <SError>{errors}</SError>}
          <SText_label>現在のパスワード</SText_label>
          <SText_field
            type="password"
            value={currentPassword}
            onChange={event => setCurrentPassword(event.target.value)}
          />
          <SText_label>新しいパスワード</SText_label>
          <SText_field
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <SText_label>新しいパスワード ※再確認</SText_label>
          <SText_field
            type="password"
            value={passwordConfirmation}
            onChange={event => setPasswordConfirmation(event.target.value)}
          />
          <SText_submit>編集</SText_submit>
        </SProfile_forms>
      </form>
    </SProfile_text_item>
  );
};

const SProfile_text_item = styled.li`
  display: ${ props => props.open ? "block" : "none"};
  margin: 14px 0;
`;

const SProfile_forms = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  margin-left: 15%;
`;

const SText_label = styled.label`
  border-radius: 3px;
  font-size: 14px;
  color: gray;
  margin: 6px 1px 3px 1px;
`;

const SText_field = styled.input`
  border: solid 1px gray;
  border-radius: 5px;
  padding: 5px;
`;

const SText_submit = styled.button`
  width: 20%;
  background-color: rgb(75, 189, 255);
  color: white;
  border-radius: 4px;
  margin: 10px 0 10px auto;
  padding: 5px;
  text-align: center;
`;

const SError = styled.p`
  padding: 4px 0;
  color: red;
`;

export default ReturnPasswordForm;
