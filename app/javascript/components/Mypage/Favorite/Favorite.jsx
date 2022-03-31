import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import FavoriteItem from "./FavoriteItem";

const Favorite = () => {
  const [favorites, setFavorites] = useState({});
  const [rerendering, setRerendering] = useState(false);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    axios.get('/dokotomeyo/favorite_from_user')
    .then((response) => {
      setFavorites(response.data.favorites)
    })
    .catch(() => {
      setErrors("お気に入りの取得に失敗しました")
    })
  }, [rerendering])

  return (
    <SFavorite_container>
      <SFavorite_title>お気に入り</SFavorite_title>
      <SFavorite_table>
        {errors && <SError>{errors}</SError>}
        {Object.keys(favorites).map((data, i) => {
          const favoriteData = favorites[data]
          return (
            <SFavorite_item key={i}>
              <FavoriteItem favoriteData={favoriteData} rerendering={rerendering} setRerendering={setRerendering} />
            </SFavorite_item>
          )
        })}
      </SFavorite_table>
    </SFavorite_container>
  );
};

const SFavorite_container = styled.div`
  height: 100%;
`;

const SFavorite_title = styled.h1`
  height: 50px;
  padding: 15px 20px;
  font-weight: bold;
  background-color: #eeeeee;
`;

const SFavorite_table = styled.ul`
  height: calc(100% - 50px);
  padding: 0 20px;
  overflow-y: scroll;
`;

const SFavorite_item = styled.li`
  padding: 3px 0;
  margin: 11px 0;
  border-bottom: solid 1px gray;
`;

const SError = styled.p`
  padding: 6px 4px;
  color: gray;
`;

export default Favorite;
