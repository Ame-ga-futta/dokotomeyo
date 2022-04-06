import React, { useContext, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import FlashMessageContext from "../../providers/FlashMessageProvider";

const UserSelector = (props) => {
  const {
    setUsers
  } = props;

  const [select, setSelect] = useState(1);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const bookFlashMessage = useContext(FlashMessageContext);

  const selectHandle = (key) => {
    setOpen(false);
    setSelect(key);
  }

  const returnText = () => {
    switch (select){
      case 1:
        return "IDから検索"
      case 2:
        return "nameから検索"
      case 3:
        return "emailから検索"
      case 4:
        return "フリーワード検索"
    }
  };

  const PostInput = (event) => {
    axios.get('/dokotomeyo/admin_user')
    .then((response) => {
      setUsers(response.data.status)
    })
    .catch(() => {
      bookFlashMessage("データの取得に失敗しました");
    })
    event.preventDefault();
  };

  return (
    <SUserSelector_container>
      <SUser_selector>
        <SUser_selector_header onClick={() => setOpen(!open)}>
          <p>{returnText()}</p>
          <SUser_selector_pull open={open}></SUser_selector_pull>
        </SUser_selector_header>
        <SUser_selector_table open={open}>
          <SUser_selector_list><p onClick={() => selectHandle(1)}>IDから検索</p></SUser_selector_list>
          <SUser_selector_list><p onClick={() => selectHandle(2)}>nameから検索</p></SUser_selector_list>
          <SUser_selector_list><p onClick={() => selectHandle(3)}>emailから検索</p></SUser_selector_list>
          <SUser_selector_list><p onClick={() => selectHandle(4)}>フリーワード検索</p></SUser_selector_list>
        </SUser_selector_table>
      </SUser_selector>
      <SUser_input>
        <form onSubmit={PostInput}>
          <SText_field
            type="text"
            value={input}
            onChange={event => setInput(event.target.value)}
          />
          <SText_submit>検索</SText_submit>
        </form>
      </SUser_input>
    </SUserSelector_container>
  );
};

const SUserSelector_container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 4px 8px;
`;

const SUser_selector = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 8px;
  border: solid 1px gray;
  border-radius: 5px;
  width: 30%;
`;

const SUser_input = styled.div`
  width: 70%;
  margin: 0 4px;
`;

const SUser_selector_header = styled.div`
  padding: 2px 8px 2px 2px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: rgb(205, 205, 205);
  }
`;

const SUser_selector_pull = styled.p`
  width: 10px;
  height: 10px;
  border-top: solid 3px gray;
  border-left: solid 3px gray;
  transform: ${ props => props.open? "rotate(45deg)" : "rotate(225deg)" };
  margin-${ props => props.open? "top" : "bottom" }: 5px;
`;

const SUser_selector_table = styled.ul`
  display: ${ props => props.open ? "block" : "none"};
  margin-top: 6px;
`;

const SUser_selector_list = styled.li`
  padding: 2px;
  &:hover {
    background-color: rgb(205, 205, 205);
  }
`;

const SText_field = styled.input`
  resize: none;
  width: 75%;
  border: solid 1px gray;
  border-radius: 4px;
  padding: 8px 10px;
  margin: 0 3px;
`;

const SText_submit = styled.button`
  width: 20%;
  background-color: rgb(75, 189, 255);
  color: white;
  border-radius: 4px;
  padding: 8px 10px;
  margin: 0 3px;
  text-align: center;
`;

export default UserSelector;
