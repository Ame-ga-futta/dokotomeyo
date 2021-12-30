import React from "react";
import styled from 'styled-components';
import TopSearchForm from "./TopSearchForm";
import TopSearchResults from "./TopSearchResults";

const TopLeft = (props) => {
  const {
    narrowDown,
    setNarrowDown,
    mapCenter,
    setMapCenter,
    bookFlashMessage
  } = props;

  return (
    <STop_left>
      <TopSearchForm narrowDown={narrowDown} setNarrowDown={setNarrowDown} mapCenter={mapCenter} setMapCenter={setMapCenter} bookFlashMessage={bookFlashMessage} />
      <TopSearchResults />
    </STop_left>
  );
};

const STop_left = styled.div`
  width: 40%;
  background-color: #eeeeee;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default TopLeft;
