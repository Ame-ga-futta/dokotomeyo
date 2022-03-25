import React from "react";
import styled from 'styled-components';

const ReturnMessage = () => {
  return (
    <SReturnMessage_container>
      <p>ログインするとコメントを投稿できます。</p>
    </SReturnMessage_container>
  );
};

const SReturnMessage_container = styled.div`
  margin: 8px 0;
`;

export default ReturnMessage;
