import React, { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FlashMessageContext from "../../providers/FlashMessageProvider";

const FavoriteItem = (props) => {
  const {
    favoriteData
  } = props;

  const navigate = useNavigate();
  const bookFlashMessage = useContext(FlashMessageContext);

  const [parkingData, setParkingData] = useState({});
  const [userData, setUserData] = useState("");
  const [openEdit, setOpenEdit] = useState(false);

  const DeleteItem = () => {

  }

  const SendDetail = () => {
    navigate(`/dokotomeyo/detail/${favoriteData.parking_id}`)
  }

  useEffect(() => {
    axios.get('/dokotomeyo/details', { params: { parkingID: favoriteData.parking_id } })
    .then((response) => {
      setParkingData(response.data.parking);
    })
    .catch(() => {
      bookFlashMessage("通信に失敗しました");
      navigate("/dokotomeyo");
    })

    axios.get('/dokotomeyo/username', { params: { userID: favoriteData.user_id } })
    .then((response) => {
      setUserData(response.data.name)
    })
    .catch(() => {
      bookFlashMessage("通信に失敗しました");
      navigate("/dokotomeyo");
    })
  }, [favoriteData])

  return (
    <>
      <SFavoriteItem_list>
        <SFavoriteItem_contents onClick={SendDetail}>
          <SFavoriteItem_name>{parkingData.name}</SFavoriteItem_name>
          <SFavoriteItem_name>{userData}</SFavoriteItem_name>
        </SFavoriteItem_contents>
        <SFavoriteItem_edit>
          <SFavoriteItem_edit_text onClick={() => setOpenEdit(!openEdit)}>{openEdit ? "閉じる" : "削除"}</SFavoriteItem_edit_text>
        </SFavoriteItem_edit>
      </SFavoriteItem_list>
      {openEdit &&
        <SFavoriteItem_Delete>
          <SFavoriteItem_Delete_text>本当に削除しますか？</SFavoriteItem_Delete_text>
          <SFavoriteItem_Delete_button onClick={DeleteItem}>削除</SFavoriteItem_Delete_button>
        </SFavoriteItem_Delete>
      }
    </>
  );
};

const SFavoriteItem_list = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SFavoriteItem_contents = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  &:hover {
    background-color: rgb(205, 205, 205);
  }
`;

const SFavoriteItem_edit = styled.div`
  display: flex;
  flex-direction: row;
  width: 10%;
  font-size: 14px;
  color: gray;
  cursor: pointer;
`;

const SFavoriteItem_edit_text = styled.p`
  margin: auto;
`;

const SFavoriteItem_name = styled.p`
  font-size: 18px;
  margin-bottom: 2px 20px 2px 0;
`;

const SFavoriteItem_Delete = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0;
`;

const SFavoriteItem_Delete_text = styled.p`
  width: 90%;
  color: red;
  text-align: end;
`;

const SFavoriteItem_Delete_button = styled.p`
  width: 10%;
  font-size: 14px;
  color: gray;
  cursor: pointer;
  text-align: center;
`;

export default FavoriteItem;
