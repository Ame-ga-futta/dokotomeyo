import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';

const Favorite = () => {
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    axios.get('/dokotomeyo/favorite_from_user')
    .then((response) => {
      setFavorites(response.data.favorites)
      console.log(favorites)
    })
    .catch(() => {
      console.log("通信に失敗しました")
    })
  }, [])

  return (
    <SFavorite_container>
      <p>お気に入り</p>
    </SFavorite_container>
  );
};

const SFavorite_container = styled.div`
  margin: 10px 15px;
`;

export default Favorite;
