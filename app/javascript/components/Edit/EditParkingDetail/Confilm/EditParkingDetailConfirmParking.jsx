import React from "react";
import styled from 'styled-components';

const EditParkingDetailConfirmParking = (props) => {
  const {
    existParkingData,
    updateParkingData
  } = props;

  return (
    <ul>
      <ConfirmParking_item>
        <ConfirmParking_title></ConfirmParking_title>
        <ConfirmParking_header>変更前</ConfirmParking_header>
        <ConfirmParking_header>変更後</ConfirmParking_header>
      </ConfirmParking_item>
      <ConfirmParking_item>
        <ConfirmParking_title>駐車場名</ConfirmParking_title>
        <ConfirmParking_row>
          <li>
            <p>{existParkingData.name}</p>
          </li>
        </ConfirmParking_row>
        <ConfirmParking_row>
          <li>
            <p>{updateParkingData.name}</p>
          </li>
        </ConfirmParking_row>
      </ConfirmParking_item>
      <ConfirmParking_item>
        <ConfirmParking_title>住所</ConfirmParking_title>
        <ConfirmParking_row>
          <li>
            <p>{existParkingData.address}</p>
          </li>
        </ConfirmParking_row>
        <ConfirmParking_row>
          <li>
            <p>{updateParkingData.address}</p>
          </li>
        </ConfirmParking_row>
      </ConfirmParking_item>
      <ConfirmParking_item>
        <ConfirmParking_title>営業時間</ConfirmParking_title>
        <ConfirmParking_row>
          <li>
            <p>{existParkingData.beginning_of_worktime} 〜 {existParkingData.end_of_worktime}</p>
          </li>
        </ConfirmParking_row>
        <ConfirmParking_row>
          <li>
            <p>{updateParkingData.beginning_of_worktime} 〜 {updateParkingData.end_of_worktime}</p>
          </li>
        </ConfirmParking_row>
      </ConfirmParking_item>
    </ul>
  );
};

const ConfirmParking_item = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 12px 0;
`;

const ConfirmParking_title = styled.p`
  width: 10%;
`;

const ConfirmParking_header = styled.p`
  font-size: 26px;
  width: 40%;
  margin: 5px 0;
  text-align: center;
`;

const ConfirmParking_row = styled.ul`
  width: 40%;
`;

export default EditParkingDetailConfirmParking;
