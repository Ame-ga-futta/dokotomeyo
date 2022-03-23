import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment'

const CommentItem = (props) => {
  const {
    commentData
  } = props;

  const [parkingData, setParkingData] = useState({});

  useEffect(() => {
    axios.get('/dokotomeyo/details', { params: { parkingID: commentData.parking_id } })
    .then((response) => {
      setParkingData(response.data.parking);
    })
    .catch(() => {
      console.log("通信に失敗");
    })
  }, [commentData])

  return (
    <SCommentItem_container>
      <SCommentItem_contents>
        <SCommentItem_name>{parkingData.name}</SCommentItem_name>
        <SCommentItem_comment>{commentData.comment}</SCommentItem_comment>
        <SCommentItem_updated_at>{moment(commentData.updated_at).format('YYYY-MM-DD HH:mm')}</SCommentItem_updated_at>
      </SCommentItem_contents>
      <SCommentItem_edit>
        <p>削除</p>
      </SCommentItem_edit>
    </SCommentItem_container>
  );
};

const SCommentItem_container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  padding: 3px 5px;
  transition: all 0.4s;
  &:hover {
    background-color: rgb(205, 205, 205);
  }
`;

const SCommentItem_contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const SCommentItem_edit = styled.div`
  display: flex;
  flex-direction: row;
  width: 5%;
  font-size: 14px;
  color: gray;
`;

const SCommentItem_name = styled.p`
  margin-bottom: 10px;
  font-size: 14px;
`;

const SCommentItem_comment = styled.p`
  margin-bottom: 6px;
  font-size: 18px;
`;

const SCommentItem_updated_at = styled.p`
  font-size: 14px;
`;

export default CommentItem;
