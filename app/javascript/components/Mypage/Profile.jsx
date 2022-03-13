import React, { useEffect } from "react";
import styled from 'styled-components';
import axios from 'axios';

const Profile = () => {


  useEffect(() => {
    axios.get('/dokotomeyo/profile')
    .then((response) => {
      console.log(response.data.message)
    })
    .catch(() => {
      console.log("通信に失敗しました")
    })
  }, [])

  return (
    <SProfile_container>
      <p>ユーザー情報</p>
    </SProfile_container>
  );
};

const SProfile_container = styled.div`
  margin: 10px 15px;
`;

export default Profile;
