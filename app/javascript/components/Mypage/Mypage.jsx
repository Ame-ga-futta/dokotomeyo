import React, { useEffect } from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Mypage = (props) => {
  const { userName, bookFlashMessage } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userName) {
      bookFlashMessage("ログインしていません");
      navigate("/dokotomeyo");
    }
  }, []);

  return (
    <Saaa>Mypage on react</Saaa>
  );
};

const Saaa = styled.p`
  color: red;
`;

export default Mypage;
