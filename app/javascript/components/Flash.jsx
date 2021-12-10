import React from "react";
import styled, { keyframes } from 'styled-components';

const Flash = (props) => {
  const { message } = props;

  return (
    <SFlash>{message}</SFlash>
  );
};

const Move = keyframes`
  0% {
    transform: translate(-50%, -100%);
  }
  30% {
    transform: translate(-50%, 200%);
  }
  45% {
    transform: translate(-50%, 200%);
  }
  100% {
    transform: translate(-50%, -100%);
  }
`;

const SFlash = styled.p`
  position: absolute;
  z-index : 99994;
  left: 50%;
  transform: translate(-50%, -100%);
  background-color: rgba(75, 189, 255, 0.9);
  color: white;
  box-shadow: 13px 13px 44px -27px #777777;
  border-radius: 15px;
  padding: 20px;
  animation: ${Move} 3s;
`;

export default Flash;
