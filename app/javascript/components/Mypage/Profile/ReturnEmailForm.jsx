import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';

const ReturnEmailForm = (props) => {
  const {
    open
  } = props;

  const [newEmail, setNewEmail] = useState("");

  const PostNewEmail = (event) => {
    axios.post('/dokotomeyo/update_email', {
      user: {
        email: newEmail
      }
    })
    .then((response) => {
      switch (response.data.status) {
        case 200:
          window.location.reload();
          break;
        case 400:
          console.log(response.data.message);
          break;
      }
    })
    .catch(() => {
      console.log("通信に失敗しました")
    })
    event.preventDefault();
  };

  useEffect(() => {
    setNewEmail("");
  }, [open])

  return (
    <SProfile_text_item open={open}>
      <form onSubmit={PostNewEmail}>
        <SProfile_forms>
          <SText_label>新しいメールアドレス</SText_label>
          <SText_field
            type="email"
            value={newEmail}
            onChange={event => setNewEmail(event.target.value)}
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

export default ReturnEmailForm;
