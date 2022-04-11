import React, { useState } from "react";
import styled from 'styled-components';
import CommentSelector from "./CommentSelector";
import CommentItem from "./CommentItem";

const Comment = () => {
  const [comments, setComments] = useState({});

  return (
    <SComment_container>
      <p>Comment</p>
      <CommentSelector setComments={setComments} />
      {comments && Object.keys(comments).map((data, i) => {
        const commentData = comments[data]
        return <CommentItem key={i} commentData={commentData} />
      })}
    </SComment_container>
  );
};

const SComment_container = styled.div`
  height: 100%;
`;

export default Comment;
