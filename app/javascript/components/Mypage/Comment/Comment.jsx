import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';

const Comment = () => {
  const [comments, setComment] = useState({});

  useEffect(() => {
    axios.get('/dokotomeyo/comment')
    .then((response) => {
      setComment(response.data.comments)
      console.log(comments)
    })
    .catch(() => {
      console.log("通信に失敗しました")
    })
  }, [])

  return (
    <SComment_container>
      <p>投稿コメント</p>
    </SComment_container>
  );
};

const SComment_container = styled.div`
  margin: 10px 15px;
`;

export default Comment;
