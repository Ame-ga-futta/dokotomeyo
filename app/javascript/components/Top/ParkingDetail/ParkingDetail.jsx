import React, { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GoogleMap, Marker } from "@react-google-maps/api";
import axios from 'axios';
import FavoriteIcon from "./FavoriteIcon";
import ParkingRequirementsWeekday from "./ParkingRequirementsWeekday";
import ParkingRequirementsHoliday from "./ParkingRequirementsHoliday";
import Comments from "./Comments";
import FlashMessageContext from "../../providers/FlashMessageProvider";
import SessionContext from "../../providers/SessionProvider";

const ParkingDetail = (props) => {
  const {
    detail,
    setDetail
  } = props;

  const [parkingData, setParkingData] = useState({});
  const [requirementsWeekdayData, setRequirementsWeekdayData] = useState({});
  const [requirementsHolidayData, setRequirementsHolidayData] = useState({});
  const [center, setCenter] = useState({
    lat: 35.681454048919186,
    lng: 139.76707115336345
  });
  const bookFlashMessage = useContext(FlashMessageContext);
  const {userName} = useContext(SessionContext);

  useEffect(() => {
    axios.get('/dokotomeyo/details', { params: { parkingID: detail } })
    .then((response) => {
      setParkingData(response.data.parking);
      setRequirementsWeekdayData(response.data.requirements_weekday);
      setRequirementsHolidayData(response.data.requirements_holiday);
      setCenter({
        lat: response.data.parking.latitude,
        lng: response.data.parking.longitude
      })
    })
    .catch(() => {
      setDetail("")
      bookFlashMessage("通信に失敗しました");
    })
  }, [detail]);

  const containerStyle = {
    width: "100%",
    height: "50%",
  }

  return (
    <STop_ParkingDetail_container>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18} >
        <Marker position={center} />
      </GoogleMap>
      <STop_ParkingDetail>
        <STop_ParkingDetail_list_name>
          <STop_ParkingDetail_name>{parkingData.name}</STop_ParkingDetail_name>
          {userName && <FavoriteIcon parkingID={parkingData.id} />}
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
        <STop_ParkingDetail_list_item_edit>
          <STop_ParkingDetail_edit>
            <Link to={`/dokotomeyo/parking/${parkingData.id}`}>条件の編集・追加</Link>
          </STop_ParkingDetail_edit>
        </STop_ParkingDetail_list_item_edit>
        <Comments parkingID={parkingData.id} />
      </STop_ParkingDetail>
    </STop_ParkingDetail_container>
  )
};

const STop_ParkingDetail_container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const STop_ParkingDetail = styled.ul`
  height: 50%;
  overflow-y: scroll;
`;

const STop_ParkingDetail_list_name = styled.li`
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

const STop_ParkingDetail_list_item_edit = styled.li`
  padding: 5px 20px;
`;

const STop_ParkingDetail_edit = styled.div`
  font-size: 14px;
  color: gray;
  width: 17%;
  border-bottom: solid 1px gray;
  padding: 3px;
  margin-left: 83%;
  text-align: center;
`;

export default ParkingDetail;
