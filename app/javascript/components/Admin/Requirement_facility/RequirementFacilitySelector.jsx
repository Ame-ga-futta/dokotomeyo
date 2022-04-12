import React, { useContext, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import FlashMessageContext from "../../providers/FlashMessageProvider";

const RequirementFacilitySelector = (props) => {
  const {
    setFacilities,
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
        return "フリーワード検索"
    }
  };

  const PostInput = (event) => {
    axios.get('/dokotomeyo/admin_requirementFacility', {
      params: {
        select: select,
        input: input
      }
    })
    .then((response) => {
      switch (response.data.status) {
        case 200:
          setFacilities(response.data.requirements);
          setMessage(false);
          break;
        case 400:
          setFacilities({});
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
    <SRequirementFacilitySelector_container>
      <SRequirementFacility_selector>
        <SRequirementFacility_selector_header onClick={() => setOpen(!open)}>
          <p>{returnText()}</p>
          <SRequirementFacility_selector_pull open={open}></SRequirementFacility_selector_pull>
        </SRequirementFacility_selector_header>
        <SRequirementFacility_selector_table open={open}>
          <SRequirementFacility_selector_list><p onClick={() => selectHandle(1)}>IDから検索</p></SRequirementFacility_selector_list>
          <SRequirementFacility_selector_list><p onClick={() => selectHandle(2)}>parking_idから検索</p></SRequirementFacility_selector_list>
          <SRequirementFacility_selector_list><p onClick={() => selectHandle(3)}>フリーワード検索</p></SRequirementFacility_selector_list>
        </SRequirementFacility_selector_table>
      </SRequirementFacility_selector>
      <SRequirementFacility_dummy></SRequirementFacility_dummy>
      <SRequirementFacility_input>
        <form onSubmit={PostInput}>
          <SText_field
            type="text"
            value={input}
            onChange={event => setInput(event.target.value)}
          />
          <SText_submit>検索</SText_submit>
        </form>
      </SRequirementFacility_input>
    </SRequirementFacilitySelector_container>
  );
};

const SRequirementFacilitySelector_container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 4px 8px;
  position: relative;
`;

const SRequirementFacility_selector = styled.div`
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

const SRequirementFacility_dummy = styled.div`
  width: 30%;
`;

const SRequirementFacility_input = styled.div`
  width: 70%;
  margin: 0 4px;
`;

const SRequirementFacility_selector_header = styled.div`
  padding: 2px 8px 2px 2px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: rgb(205, 205, 205);
  }
`;

const SRequirementFacility_selector_pull = styled.p`
  width: 10px;
  height: 10px;
  border-top: solid 3px gray;
  border-left: solid 3px gray;
  transform: ${ props => props.open? "rotate(45deg)" : "rotate(225deg)" };
  margin-${ props => props.open? "top" : "bottom" }: 5px;
`;

const SRequirementFacility_selector_table = styled.ul`
  display: ${ props => props.open ? "block" : "none"};
  margin-top: 6px;
`;

const SRequirementFacility_selector_list = styled.li`
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

export default RequirementFacilitySelector;
