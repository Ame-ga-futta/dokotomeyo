import React, {useState } from "react";
import styled from 'styled-components';
import FavoriteSelector from "./FavoriteSelector";
import FavoriteItem from "./FavoriteItem";

const Favorite = () => {
  const [favorites, setFavorites] = useState({});

  return (
    <SFavorite_container>
      <p>Favorite</p>
      <FavoriteSelector setFavorites={setFavorites} />
      {favorites && Object.keys(favorites).map((data, i) => {
        const favoriteData = favorites[data]
        return <FavoriteItem key={i} favoriteData={favoriteData} />
      })}
    </SFavorite_container>
  );
};

const SFavorite_container = styled.div`
  height: 100%;
`;

export default Favorite;
