import React from "react";
import styled from 'styled-components';

const Comments = (props) => {
  const {
    ID
  } = props;

  return (
    <SComments_container>
      <SComments_title>コメント {}件</SComments_title>
    </SComments_container>
  );
};

const SComments_container = styled.div`
  padding: 5px 20px;
`;

const SComments_title = styled.p`
  padding: 5px 0;
  border-bottom: solid 2px gray;
`;

export default Comments;
