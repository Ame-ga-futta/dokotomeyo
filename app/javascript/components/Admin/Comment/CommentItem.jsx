import React, { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
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
        <p>{parkingData.name}</p>
        <p>{userData}</p>
        <p>{commentData.comment}</p>
      </SCommentItem_contents>
      <SUserItem_edit>
        <p>編集</p>
      </SUserItem_edit>
      <SUserItem_edit>
        <p>削除</p>
      </SUserItem_edit>
    </SCommentItem_container>
  );
};

const SCommentItem_container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

export default CommentItem;
