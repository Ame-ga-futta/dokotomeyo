import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { GoogleMap, Marker } from "@react-google-maps/api";
import axios from 'axios';
import ParkingRequirementsWeekday from "./ParkingRequirementsWeekday";
import ParkingRequirementsHoliday from "./ParkingRequirementsHoliday";

const ParkingDetail = (props) => {
  const {
    detail
  } = props;

  const [parkingData, setParkingData] = useState({});
  const [requirementsWeekdayData, setRequirementsWeekdayData] = useState({});
  const [requirementsHolidayData, setRequirementsHolidayData] = useState({});
  const [center, setCenter] = useState({
    lat: 35.681454048919186,
    lng: 139.76707115336345
  });

  useEffect(() => {
    axios.post('/dokotomeyo/details', { parkingID: detail })
    .then((response) => {
      setParkingData(response.data.parking);
      setRequirementsWeekdayData(response.data.requirements_weekdays);
      setRequirementsHolidayData(response.data.requirements_holiday);
      setCenter({
        lat: response.data.parking.latitude,
        lng: response.data.parking.longitude
      })
    })
    .catch(() => {
      console.log("通信に失敗");
    })
  }, [detail]);

  const containerStyle = {
    width: "100%",
    height: "50%",
  }

  return (
    <STop_ParkingDetail>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18} >
        <Marker position={center} />
      </GoogleMap>
      <ul>
        <STop_ParkingDetail_list_name>
          <STop_ParkingDetail_name>{parkingData.name}</STop_ParkingDetail_name>
        </STop_ParkingDetail_list_name>
        <STop_ParkingDetail_list_item>
          <STop_ParkingDetail_header>住所</STop_ParkingDetail_header>
          <STop_ParkingDetail_data>{parkingData.address}</STop_ParkingDetail_data>
        </STop_ParkingDetail_list_item>
        <STop_ParkingDetail_list_item>
          <STop_ParkingDetail_header>営業時間</STop_ParkingDetail_header>
          <STop_ParkingDetail_data>
            {parkingData.beginning_of_worktime} 〜 {parkingData.end_of_worktime}
          </STop_ParkingDetail_data>
        </STop_ParkingDetail_list_item>
        <STop_ParkingDetail_list_item>
          <STop_ParkingDetail_header>無料の条件</STop_ParkingDetail_header>
          <STop_ParkingDetail_requirements>
            <ParkingRequirementsWeekday requirementsWeekdayData={requirementsWeekdayData} />
            <ParkingRequirementsHoliday requirementsHolidayData={requirementsHolidayData} />
          </STop_ParkingDetail_requirements>
        </STop_ParkingDetail_list_item>
      </ul>
    </STop_ParkingDetail>
  )
};

const STop_ParkingDetail = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const STop_ParkingDetail_list_name = styled.li`
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  background-color: #eeeeee;
`;

const STop_ParkingDetail_list_item = styled.li`
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
`;

const STop_ParkingDetail_name = styled.h4`
  font-weight: bold;
`;

const STop_ParkingDetail_header = styled.p`
  width: 20%;
`;

const STop_ParkingDetail_data = styled.p`
  width: 80%;
`;

const STop_ParkingDetail_requirements = styled.div`
  width: 80%;
`;

export default ParkingDetail;
