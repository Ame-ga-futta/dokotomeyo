import React, { useContext, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import FlashMessageContext from "../../providers/FlashMessageProvider";

const RequirementBuySelector = (props) => {
  const {
    setBuys
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
        return "フリーワード検索"
    }
  };

  const PostInput = (event) => {
    axios.get('/dokotomeyo/admin_requirementBuy', {
      params: {
        select: select,
        input: input
      }
    })
    .then((response) => {
      setBuys(response.data.requirements)
    })
    .catch(() => {
      bookFlashMessage("データの取得に失敗しました");
    })
    event.preventDefault();
  };

  return (
    <SRequirementBuySelector_container>
      <SRequirementBuy_selector>
        <SRequirementBuy_selector_header onClick={() => setOpen(!open)}>
          <p>{returnText()}</p>
          <SRequirementBuy_selector_pull open={open}></SRequirementBuy_selector_pull>
        </SRequirementBuy_selector_header>
        <SRequirementBuy_selector_table open={open}>
          <SRequirementBuy_selector_list><p onClick={() => selectHandle(1)}>IDから検索</p></SRequirementBuy_selector_list>
          <SRequirementBuy_selector_list><p onClick={() => selectHandle(2)}>parking_idから検索</p></SRequirementBuy_selector_list>
          <SRequirementBuy_selector_list><p onClick={() => selectHandle(3)}>フリーワード検索</p></SRequirementBuy_selector_list>
        </SRequirementBuy_selector_table>
      </SRequirementBuy_selector>
      <SRequirementBuy_input>
        <form onSubmit={PostInput}>
          <SText_field
            type="text"
            value={input}
            onChange={event => setInput(event.target.value)}
          />
          <SText_submit>検索</SText_submit>
        </form>
      </SRequirementBuy_input>
    </SRequirementBuySelector_container>
  );
};

const SRequirementBuySelector_container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 4px 8px;
`;

const SRequirementBuy_selector = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 8px;
  border: solid 1px gray;
  border-radius: 5px;
  width: 30%;
`;

const SRequirementBuy_input = styled.div`
  width: 70%;
  margin: 0 4px;
`;

const SRequirementBuy_selector_header = styled.div`
  padding: 2px 8px 2px 2px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: rgb(205, 205, 205);
  }
`;

const SRequirementBuy_selector_pull = styled.p`
  width: 10px;
  height: 10px;
  border-top: solid 3px gray;
  border-left: solid 3px gray;
  transform: ${ props => props.open? "rotate(45deg)" : "rotate(225deg)" };
  margin-${ props => props.open? "top" : "bottom" }: 5px;
`;

const SRequirementBuy_selector_table = styled.ul`
  display: ${ props => props.open ? "block" : "none"};
  margin-top: 6px;
`;

const SRequirementBuy_selector_list = styled.li`
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

export default RequirementBuySelector;
