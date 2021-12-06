import React from "react";
import styled from 'styled-components';

const Post = () => {
  return (
    <SPost_container>
      <SPost_container_left>
        <p>入力フォーム</p>
      </SPost_container_left>
      <SPost_container_right>
        <p>地図</p>
      </SPost_container_right>
    </SPost_container>
  );
};

const SPost_container = styled.div`
  display: flex;
  height: calc(100vh - 80px );
`;

const SPost_container_left = styled.div`
  width: 60%;
  background-color: #eeeeee;
`;

const SPost_container_right = styled.div`
  width: 40%;
  background-color: rgb(255, 250, 228);
`;

export default Post;
