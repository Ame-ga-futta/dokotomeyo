import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import CommentItem from "./CommentItem";

const Comment = () => {
  const [comments, setComments] = useState({});

  useEffect(() => {
    axios.get('/dokotomeyo/comment_from_user')
    .then((response) => {
      setComments(response.data.comments)
    })
    .catch(() => {
      console.log("通信に失敗しました")
    })
  }, [])

  return (
    <SComment_container>
      <SComment_title>投稿コメント</SComment_title>
      <SComment_table>
        {Object.keys(comments).map((data, i) => {
          const commentData = comments[data]
          return (
            <SComment_item key={i}>
              <CommentItem commentData={commentData} />
            </SComment_item>
          )
        })}
      </SComment_table>
    </SComment_container>
  );
};

const SComment_container = styled.div`

`;

const SComment_title = styled.h1`
  padding: 15px 20px 10px 20px;
  font-weight: bold;
  background-color: #eeeeee;
`;

const SComment_table = styled.ul`
  padding: 0 20px;
`;

const SComment_item = styled.li`
  padding: 3px 0;
  margin: 11px 0;
  border-bottom: solid 1px gray;
`;

export default Comment;
