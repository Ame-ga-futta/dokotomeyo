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
        <p>{parkingData.name}</p>
        <p>{parkingData.beginning_of_worktime}</p>
        <p>{parkingData.end_of_worktime}</p>
        <p>{parkingData.address}</p>
        <p>{parkingData.latitude}</p>
        <p>{parkingData.longitude}</p>
      </SParkingItem_contents>
      <SUserItem_edit>
        <p>編集</p>
      </SUserItem_edit>
      <SUserItem_edit>
        <p>削除</p>
      </SUserItem_edit>
    </SParkingItem_container>
  );
};

const SParkingItem_container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

export default ParkingItem;
