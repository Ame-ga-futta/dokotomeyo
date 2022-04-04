import React, { useContext, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import FlashMessageContext from "../../providers/FlashMessageProvider";

const ReturnForm = (props) => {
  const {
    parkingID,
    rerendering,
    setRerendering
  } = props;

  const [postComment, setPostComments] = useState("")
  const [errors, setErrors] = useState([]);
  const bookFlashMessage = useContext(FlashMessageContext);

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
          bookFlashMessage(response.data.message);
          setRerendering(!rerendering)
          break;
        case 400:
          setErrors(response.data.message);
          break;
      }
    })
    .catch(() => {
      bookFlashMessage("通信に失敗しました");
    })
    event.preventDefault();
  }

  return (
    <form onSubmit={PostNewComment}>
      <SReturnForm_container>
        <SReturnForm_header>
          <SReturnForm_title>コメントを投稿</SReturnForm_title>
          <SReturnForm_limit>
            残り <SReturnForm_count length={postComment.length}>{140 - postComment.length}</SReturnForm_count>文字
          </SReturnForm_limit>
        </SReturnForm_header>
        <SReturnForm_error>
          {errors && errors.map((error, i) => {
            return (
              <li key={i}><SError>{error}</SError></li>
            )
          })}
        </SReturnForm_error>
        <SReturnForm_forms>
          <SText_field
            type="text"
            value={postComment}
            onChange={event => setPostComments(event.target.value)}
          />
          <SText_submit>投稿</SText_submit>
        </SReturnForm_forms>
      </SReturnForm_container>
    </form>
  );
};

const SReturnForm_container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const SReturnForm_header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
`;

const SReturnForm_title = styled.p`
  margin-right: 15px;
`;

const SReturnForm_limit = styled.p`
  font-size: 14px;
  color: gray;
`;

const SReturnForm_count = styled.span`
  color: ${ props => props.length > 140 ? "red" : "gray"};
`;

const SReturnForm_error = styled.ul`
  color: red;
`;

const SError = styled.p`
  padding: 4px 0;
`;

const SReturnForm_forms = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  margin: 4px 0 8px 0;
`;

const SText_field = styled.textarea`
  resize: none;
  width: 75%;
  height: calc( 1.2em * 3 );
  line-height: 1.2;
  border: solid 1px gray;
  border-radius: 4px;
  padding: 4px;
`;

const SText_submit = styled.button`
  width: 20%;
  height: 33%;
  background-color: rgb(75, 189, 255);
  color: white;
  border-radius: 4px;
  padding: 4px;
  margin-left: 5%;
  text-align: center;
`;

export default ReturnForm;
