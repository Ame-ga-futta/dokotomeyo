import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EditParkingDetailConfirmParking from "./EditParkingDetailConfirmParking";
import EditParkingDetailConfirmRequirements from "./EditParkingDetailConfirmRequirements";

const EditParkingDetailConfilm = (props) => {
  const {
    openconfirm,
    setOpenConfirm,
    updatesData
  } = props;
  const { id } = useParams();

  const [existParkingData, setExistParkingData] = useState({});
  const [existRequirementsWeekdayData, setExistRequirementsWeekdayData] = useState({});
  const [existRequirementsHolidayData, setExistRequirementsHolidayData] = useState({});

  useEffect(() => {
    axios.post('/dokotomeyo/details', { parkingID: id })
    .then((response) => {
      setExistParkingData(response.data.parking);
      setExistRequirementsWeekdayData(response.data.requirements_weekday);
      setExistRequirementsHolidayData(response.data.requirements_holiday);
    })
    .catch(() => {
      console.log("通信に失敗");
    })
  }, []);

  const fix = () => {
    setOpenConfirm(false);
  };

  const register = () => {
    console.log(updatesData)
    setOpenConfirm(false);
  }

  return (
    <SEditConfirm_wrapper openconfirm={openconfirm}>
      <SEditConfirm_box>
        <SEditConfirm_title>以下の入力内容でよろしいですか？</SEditConfirm_title>
        <SEditConfilm_data>
          <EditParkingDetailConfirmParking existParkingData={existParkingData} updateParkingData={updatesData.parking} />
          <EditParkingDetailConfirmRequirements existRequirementsWeekdayData={existRequirementsWeekdayData} existRequirementsHolidayData={existRequirementsHolidayData} updatesData={updatesData} />
        </SEditConfilm_data>
        <SEditConfirm_buttons>
          <SEditConfirm_button onClick={fix}>
            修正
          </SEditConfirm_button>
          <SEditConfirm_button onClick={register}>
            登録
          </SEditConfirm_button>
        </SEditConfirm_buttons>
      </SEditConfirm_box>
    </SEditConfirm_wrapper>
  );
};

const SEditConfirm_wrapper = styled.div`
  position: fixed;
  z-index : 99998;
  top  : 80px;
  right : 100%;
  width: 100%;
  height: calc(100vh - 80px );
  background-color: rgba(24, 24, 24, 0.7);
  transition : 0.3s ease-in-out;
  transform: translateX(${ props => props.openconfirm ? "100%" : "0%" });
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SEditConfirm_box = styled.div`
  width: 80%;
  max-height: 75%;
  padding: 20px 40px;
  background-color: rgb(235, 235, 235);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  overflow-y: scroll;
`;

const SEditConfirm_title = styled.p`
  font-size: 30px;
  padding: 25px 0 5px 0;
  text-align: center;
`;

const SEditConfilm_data = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px 20px;
`;

const SEditConfirm_buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  flex-direction: row;
  margin: 15px;
`;

const SEditConfirm_button = styled.button`
  width: 20%;
  font-size: 20px;
  text-align: center;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  &:first-child {
    color: black;
    background-color: rgb(218, 218, 218);
  }
  &:last-child {
    color: white;
    background-color: rgb(75, 189, 255);
  }
`;

export default EditParkingDetailConfilm;
