import React from "react";
import styled from 'styled-components';
import Flash from './Flash';

const SearchContainer = () => {
  return (
    <>
      <Flash message={"ここにメッセージを渡す"}/>
      <SSearch_container>
        <SSearch_container_left>
          <p>入力フォームと検索結果</p>
        </SSearch_container_left>
        <SSearch_container_right>
          <p>地図</p>
        </SSearch_container_right>
      </SSearch_container>
    </>
  );
};

const SSearch_container = styled.div`
  display: flex;
  height: calc(100vh - 80px );
`;

const SSearch_container_left = styled.div`
  width: 40%;
  background-color: #eeeeee;
`;

const SSearch_container_right = styled.div`
  width: 60%;
  background-color: rgb(255, 250, 228);
`;

export default SearchContainer;
