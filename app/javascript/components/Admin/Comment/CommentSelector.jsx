import React, { useContext, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import FlashMessageContext from "../../providers/FlashMessageProvider";

const CommentSelector = (props) => {
  const {
    setComments,
    setMessage
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
        return "parking_idから検索"
      case 3:
        return "user_idから検索"
      case 4:
        return "フリーワード検索"
    }
  };

  const PostInput = (event) => {
    axios.get('/dokotomeyo/admin_comment', {
      params: {
        select: select,
        input: input
      }
    })
    .then((response) => {
      switch (response.data.status) {
        case 200:
          setComments(response.data.comments);
          setMessage(false);
          break;
        case 400:
          setComments({});
          setMessage(true);
          break;
      }
    })
    .catch(() => {
      bookFlashMessage("データの取得に失敗しました");
    })
    event.preventDefault();
  };

  return (
    <SCommentSelector_container>
      <SComment_selector>
        <SComment_selector_header onClick={() => setOpen(!open)}>
          <p>{returnText()}</p>
          <SComment_selector_pull open={open}></SComment_selector_pull>
        </SComment_selector_header>
        <SComment_selector_table open={open}>
          <SComment_selector_list><p onClick={() => selectHandle(1)}>IDから検索</p></SComment_selector_list>
          <SComment_selector_list><p onClick={() => selectHandle(2)}>parking_idから検索</p></SComment_selector_list>
          <SComment_selector_list><p onClick={() => selectHandle(3)}>user_idから検索</p></SComment_selector_list>
          <SComment_selector_list><p onClick={() => selectHandle(4)}>フリーワード検索</p></SComment_selector_list>
        </SComment_selector_table>
      </SComment_selector>
      <SComment_dummy></SComment_dummy>
      <SComment_input>
        <form onSubmit={PostInput}>
          <SText_field
            type="text"
            value={input}
            onChange={event => setInput(event.target.value)}
          />
          <SText_submit>検索</SText_submit>
        </form>
      </SComment_input>
    </SCommentSelector_container>
  );
};

const SCommentSelector_container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 4px 8px;
  position: relative;
`;

const SComment_selector = styled.div`
  position: absolute;
  z-index : 99992;
  display: flex;
  flex-direction: column;
  padding: 6px 8px;
  border: solid 1px gray;
  border-radius: 5px;
  width: 30%;
  background-color: white;
`;

const SComment_dummy = styled.div`
  width: 30%;
`;

const SComment_input = styled.div`
  width: 70%;
  margin: 0 4px;
`;

const SComment_selector_header = styled.div`
  padding: 2px 8px 2px 2px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: rgb(205, 205, 205);
  }
`;

const SComment_selector_pull = styled.p`
  width: 10px;
  height: 10px;
  border-top: solid 3px gray;
  border-left: solid 3px gray;
  transform: ${ props => props.open? "rotate(45deg)" : "rotate(225deg)" };
  margin-${ props => props.open? "top" : "bottom" }: 5px;
`;

const SComment_selector_table = styled.ul`
  display: ${ props => props.open ? "block" : "none"};
  margin-top: 6px;
`;

const SComment_selector_list = styled.li`
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

export default CommentSelector;
