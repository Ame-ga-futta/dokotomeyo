import React, { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import FlashMessageContext from "../../providers/FlashMessageProvider";

const CommentItem = (props) => {
  const {
    commentData
  } = props;

  const navigate = useNavigate();
  const bookFlashMessage = useContext(FlashMessageContext);

  const [parkingData, setParkingData] = useState({});
  const [userData, setUserData] = useState("");

  useEffect(() => {
    axios.get('/dokotomeyo/details', { params: { parkingID: commentData.parking_id } })
    .then((response) => {
      setParkingData(response.data.parking);
    })
    .catch(() => {
      bookFlashMessage("通信に失敗しました");
      navigate("/dokotomeyo");
    })

    axios.get('/dokotomeyo/username', { params: { userID: commentData.user_id } })
    .then((response) => {
      setUserData(response.data.name)
    })
    .catch(() => {
      bookFlashMessage("通信に失敗しました");
      navigate("/dokotomeyo");
    })
  }, [commentData])

  return (
    <SCommentItem_container>
      <SCommentItem_contents>
        <SCommentItem_name>{parkingData.name}</SCommentItem_name>
        <SCommentItem_name>{userData}</SCommentItem_name>
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
  align-items: center;
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
  cursor: pointer;
`;

const SCommentItem_name = styled.p`
  margin-bottom: 6px;
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
