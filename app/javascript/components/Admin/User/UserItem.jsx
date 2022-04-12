import React, { useContext, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FlashMessageContext from "../../providers/FlashMessageProvider";

const UserItem = (props) => {
  const {
    userData
  } = props;

  const navigate = useNavigate();
  const bookFlashMessage = useContext(FlashMessageContext);

  const [openEdit, setOpenEdit] = useState(false);

  const DeleteItem = () => {

  }

  return (
    <>
      <SUserItem_list>
        <SUserItem_contents>
          <SUserItem_name>{userData.name}</SUserItem_name>
          <SUserItem_email>{userData.email}</SUserItem_email>
        </SUserItem_contents>
        <SUserItem_edit>
          <SUserItem_edit_text onClick={() => setOpenEdit(!openEdit)}>{openEdit ? "閉じる" : "削除"}</SUserItem_edit_text>
        </SUserItem_edit>
      </SUserItem_list>
      {openEdit &&
        <SUserItem_Delete>
          <SUserItem_Delete_text>本当に削除しますか？</SUserItem_Delete_text>
          <SUserItem_Delete_button onClick={DeleteItem}>削除</SUserItem_Delete_button>
        </SUserItem_Delete>
      }
    </>
  );
};

const SUserItem_list = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SUserItem_contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  &:hover {
    background-color: rgb(205, 205, 205);
  }
`;

const SUserItem_edit = styled.div`
  display: flex;
  flex-direction: row;
  width: 10%;
  font-size: 14px;
  color: gray;
  cursor: pointer;
`;

const SUserItem_edit_text = styled.p`
  margin: auto;
`;

const SUserItem_name = styled.p`
  font-size: 18px;
  margin-bottom: 4px;
`;

const SUserItem_email = styled.p`
  font-size: 14px;
`;

const SUserItem_Delete = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0;
`;

const SUserItem_Delete_text = styled.p`
  width: 90%;
  color: red;
  text-align: end;
`;

const SUserItem_Delete_button = styled.p`
  width: 10%;
  font-size: 14px;
  color: gray;
  cursor: pointer;
  text-align: center;
`;

export default UserItem;
