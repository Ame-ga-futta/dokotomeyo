import React, { useState } from "react";
import styled from 'styled-components';
import CommentSelector from "./CommentSelector";

const Comment = () => {
  const [comments, setComments] = useState({});

  return (
    <SComment_container>
      <p>Comment</p>
      <CommentSelector setComments={setComments} />
    </SComment_container>
  );
};

const SComment_container = styled.div`
  height: 100%;
`;

export default Comment;
