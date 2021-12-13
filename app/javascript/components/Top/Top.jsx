import React from "react";
import styled from 'styled-components';
import Flash from './Flash';
import TopLeft from "./TopLeft";
import TopRight from "./TopRight";

const Top = (props) => {
  const { flashMessage } = props;

  return (
    <>
      {flashMessage && <Flash message={flashMessage}/>}
      <SSearch_container>
        <TopLeft />
        <TopRight />
      </SSearch_container>
    </>
  );
};

const SSearch_container = styled.div`
  display: flex;
  height: calc(100vh - 80px );
`;


export default Top;
