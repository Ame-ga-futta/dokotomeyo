import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import ReturnForm from "./Returnform";
import ReturnMessage from "./ReturnMessage";
import CommentItem from "./CommentItem";

const Comments = (props) => {
  const {
    userName,
    parkingID
  } = props;

  const [comments, setComments] = useState({});
  const [rerendering, setRerendering] = useState(false);

  useEffect(() => {
    axios.get('/dokotomeyo/comment_from_parking', { params: { parkingID: parkingID } })
    .then((response) => {
      setComments(response.data.comments)
      switch (response.data.status) {
        case 200:
          setComments(response.data.comments);
          break;
        case 400:
          console.log(response.data.message);
          break;
      }
    })
    .catch(() => {
      console.log("通信に失敗しました")
    })
  }, [parkingID, rerendering])

  return (
    <SComments_container>
      <SComments_title>コメント {Object.keys(comments).length}件</SComments_title>
      <SComment_list>
        {Object.keys(comments).length === 0 ? <p>コメントはありません。</p> : Object.keys(comments).map((data, i) => {
          const commentData = comments[data]
          return (
            <li key={i}>
              <CommentItem commentData={commentData} />
            </li>
          )
        })}
      </SComment_list>
      {userName ? <ReturnForm parkingID={parkingID} rerendering={rerendering} setRerendering={setRerendering} /> : <ReturnMessage />}
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

const SComment_list = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

export default Comments;
