import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditParkingDetailConfirmParking from "./EditParkingDetailConfirmParking";
import EditParkingDetailConfirmRequirements from "./EditParkingDetailConfirmRequirements";

const EditParkingDetailConfilm = (props) => {
  const {
    openconfirm,
    setOpenConfirm,
    updatesData,
    setErrors,
    bookFlashMessage
  } = props;
  const { id } = useParams();
  const navigate = useNavigate();

  const [existParkingData, setExistParkingData] = useState({});
  const [existRequirementsWeekdayData, setExistRequirementsWeekdayData] = useState({});
  const [existRequirementsHolidayData, setExistRequirementsHolidayData] = useState({});

  useEffect(() => {
    axios.get('/dokotomeyo/details', { params: { parkingID: id } })
    .then((response) => {
      setExistParkingData(response.data.parking);
      setExistRequirementsWeekdayData(response.data.requirements_weekday);
      setExistRequirementsHolidayData(response.data.requirements_holiday);
    })
    .catch(() => {
      bookFlashMessage("駐車場が見つかりませんでした");
      navigate("/dokotomeyo");
    })
  }, []);

  const fix = () => {
    setOpenConfirm(false);
  };

  const register = () => {
    axios.post('/dokotomeyo/edit_hold', {
      edit_parking_detail: updatesData
    })
    .then((response) => {
      switch (response.data.status) {
        case 200:
          window.location.reload();
          break;
        case 400:
          setErrors(response.data.message)
          break;
      }
    })
    .catch(() => {
      setErrors(["通信に失敗しました 最初からやり直してください"]);
    })
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
`;

const SEditConfirm_title = styled.p`
  max-height: 10%;
  font-size: 30px;
  padding: 25px 0 5px 0;
  text-align: center;
`;

const SEditConfilm_data = styled.div`
  max-height: 80%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px 20px;
`;

const SEditConfirm_buttons = styled.div`
  max-height: 10%;
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
