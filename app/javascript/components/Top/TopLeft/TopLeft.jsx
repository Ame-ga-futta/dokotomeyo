import React from "react";
import styled from 'styled-components';
import TopSearchForm from "./TopSearchForm";
import TopSearchResults from "../TopSearchResults";

const TopLeft = (props) => {
  const {
    narrowDown,
    setNarrowDown,
    mapCenter,
    setMapCenter,
    bookFlashMessage,
    parkings,
    setParkings,
    setHighlight,
    detail,
    setDetail
  } = props;

  return (
    <STop_left>
      <TopSearchForm narrowDown={narrowDown} setNarrowDown={setNarrowDown} setMapCenter={setMapCenter} bookFlashMessage={bookFlashMessage} setParkings={setParkings} setDetail={setDetail} />
      <TopSearchResults mapCenter={mapCenter} parkings={parkings} setHighlight={setHighlight} detail={detail} setDetail={setDetail} />
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
