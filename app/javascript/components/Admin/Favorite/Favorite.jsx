import React, {useState } from "react";
import styled from 'styled-components';
import FavoriteSelector from "./FavoriteSelector";

const Favorite = () => {
  const [favorites, setFavorites] = useState({});

  return (
    <SFavorite_container>
      <p>Favorite</p>
      <FavoriteSelector setFavorites={setFavorites} />
    </SFavorite_container>
  );
};

const SFavorite_container = styled.div`
  height: 100%;
`;

export default Favorite;
