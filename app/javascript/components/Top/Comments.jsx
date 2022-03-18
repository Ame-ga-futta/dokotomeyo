import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';

const Comments = (props) => {
  const {
    ID
  } = props;

  const [comments, setComments] = useState({});

  useEffect(() => {
    axios.post('/dokotomeyo/comment_from_parking', { parkingID: ID })
    .then((response) => {
      setComments(response.data.comments)
      console.log(comments)
    })
    .catch(() => {
      console.log("通信に失敗しました")
    })
  }, [])

  return (
    <SComments_container>
      <SComments_title>コメント {Object.keys(comments).length}件</SComments_title>
    </SComments_container>
  );
};

const SComments_container = styled.div`
  padding: 5px 20px;
`;

const SComments_title = styled.p`
  padding: 5px 0;
  border-bottom: solid 2px gray;
`;

export default Comments;
