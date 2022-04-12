import React, { useContext, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FlashMessageContext from "../../providers/FlashMessageProvider";

const ParkingItem = (props) => {
  const {
    parkingData
  } = props;

  const navigate = useNavigate();
  const bookFlashMessage = useContext(FlashMessageContext);

  const [openEdit, setOpenEdit] = useState(false);

  const DeleteItem = () => {

  }

  const SendParking = () => {
    navigate(`/dokotomeyo/parking/${parkingData.id}`)
  }

  return (
    <>
      <SParkingItem_list>
        <SParkingItem_contents onClick={SendParking}>
          <SParkingItem_name>{parkingData.name}</SParkingItem_name>
          <SParkingItem_text>{parkingData.beginning_of_worktime} 〜 {parkingData.end_of_worktime}</SParkingItem_text>
          <SParkingItem_text>{parkingData.address}</SParkingItem_text>
          <SParkingItem_text>{parkingData.latitude}, {parkingData.longitude}</SParkingItem_text>
        </SParkingItem_contents>
        <SParkingItem_edit>
          <SParkingItem_edit_text onClick={() => setOpenEdit(!openEdit)}>{openEdit ? "閉じる" : "削除"}</SParkingItem_edit_text>
        </SParkingItem_edit>
      </SParkingItem_list>
      {openEdit &&
        <SParkingItem_Delete>
          <SParkingItem_Delete_text>本当に削除しますか？</SParkingItem_Delete_text>
          <SParkingItem_Delete_button onClick={DeleteItem}>削除</SParkingItem_Delete_button>
        </SParkingItem_Delete>
      }
    </>
  );
};

const SParkingItem_list = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SParkingItem_contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  &:hover {
    background-color: rgb(205, 205, 205);
  }
`;

const SParkingItem_edit = styled.div`
  display: flex;
  flex-direction: row;
  width: 10%;
  font-size: 14px;
  color: gray;
  cursor: pointer;
`;

const SParkingItem_edit_text = styled.p`
  margin: auto;
`;

const SParkingItem_name = styled.p`
  font-size: 18px;
  margin-bottom: 4px;
`;

const SParkingItem_text = styled.p`
  font-size: 14px;
  margin-bottom: 2px;
`;

const SParkingItem_Delete = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0;
`;

const SParkingItem_Delete_text = styled.p`
  width: 90%;
  color: red;
  text-align: end;
`;

const SParkingItem_Delete_button = styled.p`
  width: 10%;
  font-size: 14px;
  color: gray;
  cursor: pointer;
  text-align: center;
`;

export default ParkingItem;
