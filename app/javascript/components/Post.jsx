import React from "react";
import styled from 'styled-components';
import PostLeft from "./PostLeft";
import PostRight from "./PostRight";

const Post = () => {
  return (
    <SPost_container>
      <PostLeft />
      <PostRight />
    </SPost_container>
  );
};

const SPost_container = styled.div`
  display: flex;
  height: calc(100vh - 80px );
`;

export default Post;
