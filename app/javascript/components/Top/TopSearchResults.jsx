import React from "react";
import styled from 'styled-components';
import TopSearchResult from "./TopSearchResult";

const TopSearchResults = (props) => {
  const {
    mapCenter,
    parkings,
    setHighlight,
    detail,
    setDetail
  } = props

  return (
    <STop_SearchResultsWrapper>
      <STop_SearchResults_title>検索結果</STop_SearchResults_title>
      <STop_SearchResults_results>
        {parkings[0] && parkings[0].map((parking, i) => {
          return (
            <li key={i}>
              <TopSearchResult parking={parking} i={i} mapCenter={mapCenter} setHighlight={setHighlight} detail={detail} setDetail={setDetail} />
            </li>
          )
        })}
      </STop_SearchResults_results>
    </STop_SearchResultsWrapper>
  );
};

const STop_SearchResultsWrapper = styled.div`
  width: 90%;
  max-height: 60%;
  background-color: rgb(255, 255, 255);
  padding: 15px;
  margin-top: 20px;
  border-radius: 5px;
`;

const STop_SearchResults_results = styled.ul`
  max-height: 90%;
  overflow-y: scroll;
`;

const STop_SearchResults_title = styled.p`
  padding: 3px 0;
  border-bottom: solid 1px gray;
`;

export default TopSearchResults;
