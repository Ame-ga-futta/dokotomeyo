import React, { useContext } from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import FlashMessageContext from "../../providers/FlashMessageProvider";

const UserItem = (props) => {
  const {
    userData
  } = props;

  const navigate = useNavigate();
  const bookFlashMessage = useContext(FlashMessageContext);

  return (
    <SUserItem_container>
      <SUserItem_contents>
        <SUserItem_name>{userData.name}</SUserItem_name>
        <SUserItem_email>{userData.email}</SUserItem_email>
      </SUserItem_contents>
      <SUserItem_edit>
        <p>削除</p>
      </SUserItem_edit>
    </SUserItem_container>
  );
};

const SUserItem_container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SUserItem_contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const SUserItem_edit = styled.div`
  display: flex;
  flex-direction: row;
  width: 5%;
  font-size: 14px;
  color: gray;
  cursor: pointer;
`;

const SUserItem_name = styled.p`
  font-size: 18px;
  margin-bottom: 4px;
`;

const SUserItem_email = styled.p`
  font-size: 14px;
`;

export default UserItem;
