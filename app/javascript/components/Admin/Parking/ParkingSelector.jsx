import React, { useContext, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import FlashMessageContext from "../../providers/FlashMessageProvider";

const ParkingSelector = (props) => {
  const {
    setParkings
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
        return "addressから検索"
      case 4:
        return "フリーワード検索"
    }
  };

  const PostInput = (event) => {
    axios.get('/dokotomeyo/admin_parking', {
      params: {
        select: select,
        input: input
      }
    })
    .then((response) => {
      setParkings(response.data.status)
    })
    .catch(() => {
      bookFlashMessage("データの取得に失敗しました");
    })
    event.preventDefault();
  };

  return (
    <SParkingSelector_container>
      <SParking_selector>
        <SParking_selector_header onClick={() => setOpen(!open)}>
          <p>{returnText()}</p>
          <SParking_selector_pull open={open}></SParking_selector_pull>
        </SParking_selector_header>
        <SParking_selector_table open={open}>
          <SParking_selector_list><p onClick={() => selectHandle(1)}>IDから検索</p></SParking_selector_list>
          <SParking_selector_list><p onClick={() => selectHandle(2)}>nameから検索</p></SParking_selector_list>
          <SParking_selector_list><p onClick={() => selectHandle(3)}>addressから検索</p></SParking_selector_list>
          <SParking_selector_list><p onClick={() => selectHandle(4)}>フリーワード検索</p></SParking_selector_list>
        </SParking_selector_table>
      </SParking_selector>
      <SParking_input>
        <form onSubmit={PostInput}>
          <SText_field
            type="text"
            value={input}
            onChange={event => setInput(event.target.value)}
          />
          <SText_submit>検索</SText_submit>
        </form>
      </SParking_input>
    </SParkingSelector_container>
  );
};

const SParkingSelector_container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 4px 8px;
`;

const SParking_selector = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 8px;
  border: solid 1px gray;
  border-radius: 5px;
  width: 30%;
`;

const SParking_input = styled.div`
  width: 70%;
  margin: 0 4px;
`;

const SParking_selector_header = styled.div`
  padding: 2px 8px 2px 2px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: rgb(205, 205, 205);
  }
`;

const SParking_selector_pull = styled.p`
  width: 10px;
  height: 10px;
  border-top: solid 3px gray;
  border-left: solid 3px gray;
  transform: ${ props => props.open? "rotate(45deg)" : "rotate(225deg)" };
  margin-${ props => props.open? "top" : "bottom" }: 5px;
`;

const SParking_selector_table = styled.ul`
  display: ${ props => props.open ? "block" : "none"};
  margin-top: 6px;
`;

const SParking_selector_list = styled.li`
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

export default ParkingSelector;
