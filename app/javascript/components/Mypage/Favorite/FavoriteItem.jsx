import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';

const FavoriteItem = (props) => {
  const {
    favoriteData
  } = props;

  const [parkingData, setParkingData] = useState({});

  useEffect(() => {
    axios.get('/dokotomeyo/details', { params: { parkingID: favoriteData.parking_id } })
    .then((response) => {
      setParkingData(response.data.parking);
    })
    .catch(() => {
      console.log("通信に失敗");
    })
  }, [favoriteData])

  return (
    <SFavoriteItem_container>
      <SFavoriteItem_contents>
        <SCommentItem_name>{parkingData.name}</SCommentItem_name>
        <SCommentItem_address>{parkingData.address}</SCommentItem_address>
      </SFavoriteItem_contents>
      <SFavoriteItem_edit>
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
`;

const SCommentItem_name = styled.p`
  font-size: 18px;
  margin-bottom: 4px;
`;

const SCommentItem_address = styled.p`
  font-size: 14px;
`;

export default FavoriteItem;
