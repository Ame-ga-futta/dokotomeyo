import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { BsHeartFill, BsHeart } from 'react-icons/bs';

const FavoriteIcon = (props) => {
  const {
    parkingID
  } = props;

  const [favoriteToggle, setFavoriteToggle] = useState(false);

  useEffect(() => {
    axios.get('/dokotomeyo/favorite_match', { params: { parkingID: parkingID } })
    .then((response) => {
      setFavoriteToggle(response.data.favorite)
    })
    .catch(() => {

    })
  }, [parkingID])

  const PostFavorite = () => {
    axios.post('/dokotomeyo/post_favorite', { parkingID: parkingID })
    .then((response) => {
      setFavoriteToggle(response.data.favorite)
    })
    .catch(() => {

    })
  }

  return (
    <STop_ParkingDetail_icon>
      {favoriteToggle
        ? <BsHeartFill onClick={() => {PostFavorite()}} size={25} color={'#ff3355'} />
        : <BsHeart onClick={() => {PostFavorite()}} size={25} color={'#696969'} />
      }
    </STop_ParkingDetail_icon>
  );
};

const STop_ParkingDetail_icon = styled.div`
  margin-right: 10px;
  &:hover {
    cursor: pointer
  }
`;

export default FavoriteIcon;
