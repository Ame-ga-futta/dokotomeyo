import React, { useContext, useEffect } from "react";
import styled from 'styled-components';
import axios from 'axios';
import FlashMessageContext from "../../providers/FlashMessageProvider";

const Comment = () => {
  const bookFlashMessage = useContext(FlashMessageContext);

  useEffect(() => {
    axios.get('/dokotomeyo/admin_comment')
    .then((response) => {
      console.log(response.data.status)
    })
    .catch(() => {
      bookFlashMessage("データの取得に失敗しました");
    })
  }, []);

  return (
    <SComment_container>
      <p>Comment</p>
    </SComment_container>
  );
};

const SComment_container = styled.div`
  height: 100%;
`;

export default Comment;
