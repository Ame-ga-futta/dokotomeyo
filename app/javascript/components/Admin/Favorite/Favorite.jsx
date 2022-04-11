import React, {useState } from "react";
import styled from 'styled-components';
import FavoriteSelector from "./FavoriteSelector";
import FavoriteItem from "./FavoriteItem";

const Favorite = () => {
  const [favorites, setFavorites] = useState({});

  return (
    <SFavorite_container>
      <SFavorite_title>Favorite</SFavorite_title>
      <FavoriteSelector setFavorites={setFavorites} />
      <SFavorite_table>
        {favorites && Object.keys(favorites).map((data, i) => {
          const favoriteData = favorites[data]
          return <SFavorite_item key={i}><FavoriteItem favoriteData={favoriteData} /></SFavorite_item>
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
  height: calc(100% - 100px);
  padding: 0 20px;
  overflow-y: scroll;
`;

const SFavorite_item = styled.li`
  padding: 3px 0;
  margin: 11px 0;
  border-bottom: solid 1px gray;
`;

export default Favorite;
