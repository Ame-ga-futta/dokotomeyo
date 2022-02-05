import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import ParkingRequirementsWeekday from "../Top/ParkingRequirementsWeekday";
import ParkingRequirementsHoliday from "../Top/ParkingRequirementsHoliday";
import EditParkingDetail from "./EditParkingDetail/EditParkingDetail";
import AddRequirement from "./AddRequirement/AddRequirement";

const EditParking = () => {
  const { id } = useParams();

  const [parkingData, setParkingData] = useState({});
  const [requirementsWeekdayData, setRequirementsWeekdayData] = useState({});
  const [requirementsHolidayData, setRequirementsHolidayData] = useState({});
  const [center, setCenter] = useState({
    lat: 35.681454048919186,
    lng: 139.76707115336345
  });
  const [selectTab, setSelectTab] = useState(true);

  const API_KEY = process.env.GOOGLE_MAP_API_KEY;
  const containerStyle = {
    width: "100%",
    height: "calc(100vh - 80px )",
  };

  useEffect(() => {
    axios.post('/dokotomeyo/details', { parkingID: id })
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
  }, [id])

  return (
    <SEdit_parking_wrapper>
      <SEdit_Detail_container>
        <ul>
          <SEdit_Detail_list_name>
            <SEdit_Detail_name>{parkingData.name}</SEdit_Detail_name>
          </SEdit_Detail_list_name>
          <SEdit_Detail_list_item>
            <SEdit_Detail_header>住所</SEdit_Detail_header>
            <SEdit_Detail_data>{parkingData.address}</SEdit_Detail_data>
          </SEdit_Detail_list_item>
          <SEdit_Detail_list_item>
            <SEdit_Detail_header>営業時間</SEdit_Detail_header>
            <SEdit_Detail_data>{parkingData.beginning_of_worktime} 〜 {parkingData.end_of_worktime}</SEdit_Detail_data>
          </SEdit_Detail_list_item>
          <SEdit_Detail_list_item>
            <SEdit_Detail_header>無料の条件</SEdit_Detail_header>
            <SEdit_Detail_requirements>
              <ParkingRequirementsWeekday requirementsWeekdayData={requirementsWeekdayData} />
              <ParkingRequirementsHoliday requirementsHolidayData={requirementsHolidayData} />
            </SEdit_Detail_requirements>
          </SEdit_Detail_list_item>
        </ul>
        <SEdit_Detail_Edit>
          <SEdit_Detail_selector>
            <SEdit_Detail_selector_edit onClick={() => {setSelectTab(true)}} selectTab={selectTab} >
              駐車場情報を修正する
            </SEdit_Detail_selector_edit>
            <SEdit_Detail_selector_add onClick={() => {setSelectTab(false)}} selectTab={selectTab} >
              条件を追加する
            </SEdit_Detail_selector_add>
          </SEdit_Detail_selector>
          {selectTab
            ? <EditParkingDetail parkingData={parkingData} requirementsWeekdayData={requirementsWeekdayData} requirementsHolidayData={requirementsHolidayData} />
            : <AddRequirement parkingID={id} />
          }
        </SEdit_Detail_Edit>
      </SEdit_Detail_container>
      <SEdit_Map_container>
        <LoadScript googleMapsApiKey={API_KEY}>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18} >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </SEdit_Map_container>
    </SEdit_parking_wrapper>
  );
};

const SEdit_parking_wrapper = styled.div`
  display: flex;
`;

const SEdit_Detail_container = styled.div`
  width: 50%;
`;

const SEdit_Map_container = styled.div`
  width: 50%;
`;

const SEdit_Detail_list_name = styled.li`
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  background-color: #eeeeee;
`;

const SEdit_Detail_list_item = styled.li`
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
`;

const SEdit_Detail_name = styled.h4`
  font-weight: bold;
`;

const SEdit_Detail_header = styled.p`
  width: 20%;
`;

const SEdit_Detail_data = styled.p`
  width: 80%;
`;

const SEdit_Detail_requirements = styled.div`
  width: 80%;
`;

const SEdit_Detail_Edit = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5% 0 0 20%;
`;

const SEdit_Detail_selector = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: row;
`;

const SEdit_Detail_selector_edit = styled.div`
  padding: 8px 18px;
  border-bottom: solid 2px ${ props => props.selectTab ? "gray" : "white" };
  transition: all 0.6s;
  &:hover {
    background-color: rgb(189, 189, 189);
  }
`;

const SEdit_Detail_selector_add = styled.div`
  padding: 8px 18px;
  border-bottom: solid 2px ${ props => props.selectTab ? "white" : "gray" };
  transition: all 0.6s;
  &:hover {
    background-color: rgb(189, 189, 189);
  }
`;

export default EditParking;
