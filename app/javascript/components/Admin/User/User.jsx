import React, { useContext, useEffect } from "react";
import styled from 'styled-components';
import axios from 'axios';
import FlashMessageContext from "../../providers/FlashMessageProvider";

const User = () => {
  const bookFlashMessage = useContext(FlashMessageContext);

  useEffect(() => {
    axios.get('/dokotomeyo/admin_user')
    .then((response) => {
      console.log(response.data.status)
    })
    .catch(() => {
      bookFlashMessage("データの取得に失敗しました");
    })
  }, []);

  return (
    <SUser_container>
      <p>User</p>
    </SUser_container>
  );
};

const SUser_container = styled.div`
  height: 100%;
`;

export default User;
