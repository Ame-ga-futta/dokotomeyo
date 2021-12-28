import React from "react";
import styled from 'styled-components';

const TopSearchResults = () => {


  return (
    <STop_SearchResultsWrapper>
      <p>検索結果</p>
    </STop_SearchResultsWrapper>
  );
};

const STop_SearchResultsWrapper = styled.div`
  width: 90%;
  background-color: rgb(255, 255, 255);
  padding: 15px;
  margin-top: 20px;
  border-radius: 5px;
`;

export default TopSearchResults;
