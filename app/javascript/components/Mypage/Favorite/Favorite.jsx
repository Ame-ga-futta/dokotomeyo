import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import FavoriteItem from "./FavoriteItem";

const Favorite = () => {
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    axios.get('/dokotomeyo/favorite_from_user')
    .then((response) => {
      setFavorites(response.data.favorites)
    })
    .catch(() => {
      console.log("通信に失敗しました")
    })
  }, [])

  return (
    <SFavorite_container>
      <SFavorite_title>お気に入り</SFavorite_title>
      <SFavorite_table>
        {Object.keys(favorites).map((data, i) => {
          const favoriteData = favorites[data]
          return (
            <SFavorite_item key={i}>
              <FavoriteItem favoriteData={favoriteData} />
            </SFavorite_item>
          )
        })}
      </SFavorite_table>
    </SFavorite_container>
  );
};

const SFavorite_container = styled.div`

`;

const SFavorite_title = styled.h1`
  padding: 15px 20px 10px 20px;
  font-weight: bold;
  background-color: #eeeeee;
`;

const SFavorite_table = styled.ul`
  padding: 0 20px;
`;

const SFavorite_item = styled.li`
  padding: 3px 0;
  margin: 11px 0;
  border-bottom: solid 1px gray;
`;

export default Favorite;
