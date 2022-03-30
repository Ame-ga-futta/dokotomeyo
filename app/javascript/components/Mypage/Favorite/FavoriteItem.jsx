import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FavoriteItem = (props) => {
  const {
    favoriteData,
    rerendering,
    setRerendering,
    bookFlashMessage
  } = props;

  const navigate = useNavigate();

  const [parkingData, setParkingData] = useState({});

  const sendDetail = () => {
    navigate(`/dokotomeyo/detail/${parkingData.id}`)
  };

  const deleteFavorite = () => {
    axios.delete('/dokotomeyo/delete_favorite', {
      params: { favoriteID: favoriteData.id }
    })
    .then(() => {
      bookFlashMessage("削除しました");
      setRerendering(!rerendering);
    })
    .catch(() => {
      bookFlashMessage("削除に失敗しました");
    })
  };

  useEffect(() => {
    axios.get('/dokotomeyo/details', { params: { parkingID: favoriteData.parking_id } })
    .then((response) => {
      setParkingData(response.data.parking);
    })
    .catch(() => {
      bookFlashMessage("通信に失敗しました");
      navigate("/dokotomeyo");
    })
  }, [favoriteData])

  return (
    <SFavoriteItem_container>
      <SFavoriteItem_contents onClick={sendDetail}>
        <SCommentItem_name>{parkingData.name}</SCommentItem_name>
        <SCommentItem_address>{parkingData.address}</SCommentItem_address>
      </SFavoriteItem_contents>
      <SFavoriteItem_edit onClick={deleteFavorite}>
        <p>削除</p>
      </SFavoriteItem_edit>
    </SFavoriteItem_container>
  );
};

const SFavoriteItem_container = styled.div`
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

const SCommentItem_name = styled.p`
  font-size: 18px;
  margin-bottom: 4px;
`;

const SCommentItem_address = styled.p`
  font-size: 14px;
`;

export default FavoriteItem;
