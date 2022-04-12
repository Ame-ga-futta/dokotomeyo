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
  const [openEdit, setOpenEdit] = useState(false);

  const DeleteItem = () => {
    axios.delete('/dokotomeyo/admin_comment', {
      params: { ID: commentData.id }
    })
    .then(() => {
      window.location.reload();
    })
    .catch(() => {
      bookFlashMessage("削除に失敗しました");
    })
  }

  const SendDetail = () => {
    navigate(`/dokotomeyo/detail/${commentData.parking_id}`)
  }

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
    <>
      <SCommentItem_list>
        <SCommentItem_contents onClick={SendDetail}>
          <SCommentItem_name>{parkingData.name}</SCommentItem_name>
          <SCommentItem_name>{userData}</SCommentItem_name>
          <SCommentItem_comment>{commentData.comment}</SCommentItem_comment>
          <SCommentItem_updated_at>{moment(commentData.updated_at).format('YYYY-MM-DD HH:mm')}</SCommentItem_updated_at>
        </SCommentItem_contents>
        <SCommentItem_edit>
          <SCommentItem_edit_text onClick={() => setOpenEdit(!openEdit)}>{openEdit ? "閉じる" : "削除"}</SCommentItem_edit_text>
        </SCommentItem_edit>
      </SCommentItem_list>
      {openEdit &&
        <SCommentItem_Delete>
          <SCommentItem_Delete_text>本当に削除しますか？</SCommentItem_Delete_text>
          <SCommentItem_Delete_button onClick={DeleteItem}>削除</SCommentItem_Delete_button>
        </SCommentItem_Delete>
      }
    </>
  );
};

const SCommentItem_list = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SCommentItem_contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  &:hover {
    background-color: rgb(205, 205, 205);
  }
`;

const SCommentItem_edit = styled.div`
  display: flex;
  flex-direction: row;
  width: 10%;
  font-size: 14px;
  color: gray;
  cursor: pointer;
`;

const SCommentItem_edit_text = styled.p`
  margin: auto;
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

const SCommentItem_Delete = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0;
`;

const SCommentItem_Delete_text = styled.p`
  width: 90%;
  color: red;
  text-align: end;
`;

const SCommentItem_Delete_button = styled.p`
  width: 10%;
  font-size: 14px;
  color: gray;
  cursor: pointer;
  text-align: center;
`;

export default CommentItem;
