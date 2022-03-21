import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment'

const CommentItem = (props) => {
  const {
    commentData
  } = props;

  const [contributor, setContributor] = useState("")

  useEffect(() => {
    axios.get('/dokotomeyo/username', { params: { userID: commentData.user_id } })
    .then((response) => {
      switch (response.data.status) {
        case 200:
          setContributor(response.data.name);
          break;
        case 400:
          console.log(response.data.message);
          break;
      }
    })
    .catch(() => {
      console.log("通信に失敗しました")
    })
  }, [])

  return (
    <SCommentItem_container>
      <SCommentItem_comment>{commentData.comment}</SCommentItem_comment>
      <SCommentItem_detail>
        <p>{moment(commentData.updated_at).format('YYYY-MM-DD HH:mm')}</p>
        <SCommentItem_contributor>{contributor}</SCommentItem_contributor>
      </SCommentItem_detail>
    </SCommentItem_container>
  );
};

const SCommentItem_container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3px 0;
  padding-bottom: 2px;
  border-bottom: solid 1px gray;
`;

const SCommentItem_comment = styled.p`
  font-size: 16px;
  margin-bottom: 3px;
`;

const SCommentItem_detail = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
`;

const SCommentItem_contributor = styled.p`
  margin-left: 12px;
`;

export default CommentItem;
