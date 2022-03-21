import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';

const ReturnNameForm = (props) => {
  const {
    open
  } = props;

  const [newName, setNewName] = useState("");

  const PostNewName = (event) => {
    console.log(newName)
    event.preventDefault();
  };

  useEffect(() => {
    setNewName("");
  }, [open])

  return (
    <SProfile_text_item open={open}>
      <form onSubmit={PostNewName}>
        <SProfile_forms>
          <SText_label>新しいユーザーネーム</SText_label>
          <SText_field
            type="text"
            value={newName}
            onChange={event => setNewName(event.target.value)}
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

export default ReturnNameForm;