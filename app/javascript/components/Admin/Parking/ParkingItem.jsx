import React, { useContext } from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import FlashMessageContext from "../../providers/FlashMessageProvider";

const ParkingItem = (props) => {
  const {
    parkingData
  } = props;

  const navigate = useNavigate();
  const bookFlashMessage = useContext(FlashMessageContext);

  return (
    <SParkingItem_container>
      <SParkingItem_contents>
        <SParkingItem_name>{parkingData.name}</SParkingItem_name>
        <SParkingItem_text>{parkingData.beginning_of_worktime} 〜 {parkingData.end_of_worktime}</SParkingItem_text>
        <SParkingItem_text>{parkingData.address}</SParkingItem_text>
        <SParkingItem_text>{parkingData.latitude}, {parkingData.longitude}</SParkingItem_text>
      </SParkingItem_contents>
      <SParkingItem_edit>
        <p>削除</p>
      </SParkingItem_edit>
    </SParkingItem_container>
  );
};

const SParkingItem_container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SParkingItem_contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const SParkingItem_edit = styled.div`
  display: flex;
  flex-direction: row;
  width: 5%;
  font-size: 14px;
  color: gray;
  cursor: pointer;
`;

const SParkingItem_name = styled.p`
  font-size: 18px;
  margin-bottom: 4px;
`;

const SParkingItem_text = styled.p`
  font-size: 14px;
  margin-bottom: 2px;
`;

export default ParkingItem;
