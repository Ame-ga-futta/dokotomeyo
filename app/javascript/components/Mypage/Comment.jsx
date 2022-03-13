import React, { useEffect } from "react";
import styled from 'styled-components';
import axios from 'axios';

const Comment = () => {


  useEffect(() => {
    axios.get('/dokotomeyo/comment')
    .then((response) => {
      console.log(response.data.message)
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
