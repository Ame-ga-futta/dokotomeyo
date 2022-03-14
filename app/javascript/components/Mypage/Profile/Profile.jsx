import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import ReturnNameForm from "./ReturnNameForm";
import ReturnEmailForm from "./ReturnEmailForm";
import ReturnPasswordForm from "./ReturnPasswordForm";

const Profile = () => {
  const [openEdit, setOpenEdit] = useState(false)
  const [selectEdit, setSelectEdit] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const OpenForm = (tab) => {
    if (openEdit) {
      if (tab == selectEdit) {
        setOpenEdit(false);
        setSelectEdit("");
      } else {
        setOpenEdit(true);
        setSelectEdit(tab);
      }
    } else {
      setOpenEdit(true);
      setSelectEdit(tab);
    }
  }

  useEffect(() => {
    axios.get('/dokotomeyo/profile')
    .then((response) => {
      setName(response.data.name)
      setEmail(response.data.email)
    })
    .catch(() => {
      console.log("通信に失敗しました")
    })
  }, [])

  return (
    <SProfile_container>
      <SProfile_title>ユーザー情報</SProfile_title>
      <SProfile_table>
        <SProfile_text_item>
          <SProfile_label>ユーザーネーム</SProfile_label>
          <SProfile_text>{name}</SProfile_text>
          <SProfile_edit onClick={() => OpenForm("name")}>{selectEdit == "name" ? "閉じる" : "編集"}</SProfile_edit>
        </SProfile_text_item>
        <ReturnNameForm open={selectEdit == "name"} />
        <SProfile_text_item>
          <SProfile_label>メールアドレス</SProfile_label>
          <SProfile_text>{email}</SProfile_text>
          <SProfile_edit onClick={() => OpenForm("email")}>{selectEdit == "email" ? "閉じる" : "編集"}</SProfile_edit>
        </SProfile_text_item>
        <ReturnEmailForm open={selectEdit == "email"} />
        <SProfile_text_item>
          <SProfile_label>パスワード</SProfile_label>
          <SProfile_text>********</SProfile_text>
          <SProfile_edit onClick={() => OpenForm("password")}>{selectEdit == "password" ? "閉じる" : "編集"}</SProfile_edit>
        </SProfile_text_item>
        <ReturnPasswordForm open={selectEdit == "password"} />
      </SProfile_table>
    </SProfile_container>
  );
};

const SProfile_container = styled.div`

`;

const SProfile_title = styled.h1`
  padding: 15px 20px 10px 20px;
  font-weight: bold;
  background-color: #eeeeee;
`;

const SProfile_table = styled.ul`
  padding: 15px 20px 10px 20px;
`;

const SProfile_text_item = styled.li`
  display: flex;
  flex-direction: row;
  margin: 14px 0;
`;

const SProfile_label = styled.p`
  width: 15%;
`;

const SProfile_text = styled.p`
  width: 35%;
`;

const SProfile_edit = styled.p`
  width: 5%;
  font-size: 14px;
  color: gray;
  border-bottom: solid 1px gray;
  padding: 1px 3px;
  text-align: center;
`;

export default Profile;
