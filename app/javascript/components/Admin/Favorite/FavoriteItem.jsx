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
    <SFavoriteItem_container>
      <SFavoriteItem_contents onClick={SendDetail}>
        <SFavoriteItem_name>{parkingData.name}</SFavoriteItem_name>
        <SFavoriteItem_name>{userData}</SFavoriteItem_name>
      </SFavoriteItem_contents>
      <SFavoriteItem_edit>
        <SFavoriteItem_edit_text>削除</SFavoriteItem_edit_text>
      </SFavoriteItem_edit>
    </SFavoriteItem_container>
  );
};

const SFavoriteItem_container = styled.div`
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

export default FavoriteItem;
