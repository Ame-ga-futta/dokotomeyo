import React, { useState } from "react";
import styled from 'styled-components';
import CommentSelector from "./CommentSelector";
import CommentItem from "./CommentItem";

const Comment = () => {
  const [comments, setComments] = useState({});

  return (
    <SComment_container>
      <SComment_title>Comment</SComment_title>
      <CommentSelector setComments={setComments} />
      <SComment_table>
        {comments && Object.keys(comments).map((data, i) => {
          const commentData = comments[data]
          return <SComment_item key={i}><CommentItem commentData={commentData} /></SComment_item>
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
  height: calc(100% - 100px);
  padding: 0 20px;
  overflow-y: scroll;
`;

const SComment_item = styled.li`
  padding: 3px 0;
  margin: 11px 0;
  border-bottom: solid 1px gray;
`;

export default Comment;
