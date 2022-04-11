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
      <SFavoriteItem_contents>
        <p>{parkingData.name}</p>
        <p>{userData}</p>
      </SFavoriteItem_contents>
      <SUserItem_edit>
        <p>編集</p>
      </SUserItem_edit>
      <SUserItem_edit>
        <p>削除</p>
      </SUserItem_edit>
    </SFavoriteItem_container>
  );
};

const SFavoriteItem_container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SFavoriteItem_contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const SFavoriteItem_edit = styled.div`
  display: flex;
  flex-direction: row;
  width: 5%;
  font-size: 14px;
  color: gray;
  cursor: pointer;
`;

export default FavoriteItem;
