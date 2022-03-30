import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import CommentItem from "./CommentItem";

const Comment = (props) => {
  const {
    bookFlashMessage
  } = props;

  const [comments, setComments] = useState({});
  const [rerendering, setRerendering] = useState(false);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    axios.get('/dokotomeyo/comment_from_user')
    .then((response) => {
      setComments(response.data.comments)
    })
    .catch(() => {
      setErrors("コメントの取得に失敗しました")
    })
  }, [rerendering])

  return (
    <SComment_container>
      <SComment_title>投稿コメント</SComment_title>
      <SComment_table>
        {errors && <SError>{errors}</SError>}
        {Object.keys(comments).map((data, i) => {
          const commentData = comments[data]
          return (
            <SComment_item key={i}>
              <CommentItem commentData={commentData} rerendering={rerendering} setRerendering={setRerendering} bookFlashMessage={bookFlashMessage} />
            </SComment_item>
          )
        })}
      </SComment_table>
    </SComment_container>
  );
};

const SComment_container = styled.div`
  height: 100%;
`;

const SComment_title = styled.h1`
  height: 50px;
  padding: 15px 20px;
  font-weight: bold;
  background-color: #eeeeee;
`;

const SComment_table = styled.ul`
  height: calc(100% - 50px);
  padding: 0 20px;
  overflow-y: scroll;
`;

const SComment_item = styled.li`
  padding: 3px 0;
  margin: 11px 0;
  border-bottom: solid 1px gray;
`;

const SError = styled.p`
  padding: 6px 4px;
  color: gray;
`;

export default Comment;
