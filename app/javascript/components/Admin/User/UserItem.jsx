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
        <p>{userData.name}</p>
        <p>{userData.email}</p>
      </SUserItem_contents>
      <SUserItem_edit>
        <p>編集</p>
      </SUserItem_edit>
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

export default UserItem;
