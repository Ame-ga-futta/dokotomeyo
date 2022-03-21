import React, { useState } from "react";
import styled from 'styled-components';
import axios from 'axios';

const ReturnForm = (props) => {
  const {
    parkingID
  } = props;

  const [postComment, setPostComments] = useState("")

  const PostNewComment = (event) => {
    axios.post('/dokotomeyo/post_comment', {
      post_comment: {
        parking_id: parkingID,
        comment: postComment
      }
    })
    .then((response) => {
      switch (response.data.status) {
        case 200:
          console.log(response.data.message);
          break;
        case 400:
          console.log(response.data.message);
          break;
      }
    })
    .catch(() => {
      console.log("通信に失敗");
    })
    event.preventDefault();
  }

  return (
    <form onSubmit={PostNewComment}>
      <SReturnForm_container>
        <SText_field
          type="text"
          value={postComment}
          placeholder="コメントを投稿"
          onChange={event => setPostComments(event.target.value)}
        />
        <SText_submit>投稿</SText_submit>
      </SReturnForm_container>
    </form>
  );
};

const SReturnForm_container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 8px 0;
`;

const SText_field = styled.input`
  width: 75%;
  border: solid 1px gray;
  border-radius: 4px;
  padding: 4px;
`;

const SText_submit = styled.button`
  width: 20%;
  background-color: rgb(75, 189, 255);
  color: white;
  border-radius: 4px;
  padding: 4px;
  margin-left: 5%;
  text-align: center;
`;

export default ReturnForm;
