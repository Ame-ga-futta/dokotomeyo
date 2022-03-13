import React, { useEffect } from "react";
import styled from 'styled-components';
import axios from 'axios';

const Favorite = () => {


  useEffect(() => {
    axios.get('/dokotomeyo/favorite')
    .then((response) => {
      console.log(response.data.message)
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
