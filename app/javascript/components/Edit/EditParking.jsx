import React, { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import { LoadScript } from "@react-google-maps/api";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditParkingMap from "./EditParkingMap";
import EditParkingDetail from "./EditParkingDetail/EditParkingDetail";
import AddRequirement from "./AddRequirement/AddRequirement";
import FlashMessageContext from "../providers/FlashMessageProvider";

const EditParking = () => {
  const { id } = useParams();
  const API_KEY = process.env.GOOGLE_MAP_API_KEY;

  const navigate = useNavigate();
  const [parkingData, setParkingData] = useState({});
  const [requirementsWeekdayData, setRequirementsWeekdayData] = useState({});
  const [requirementsHolidayData, setRequirementsHolidayData] = useState({});
  const [updateParking, setUpdateParking] = useState({
    name: "",
    address: "",
    beginning_of_worktime: "",
    end_of_worktime: "",
    latitude: 35.681454048919186,
    longitude: 139.76707115336345,
  });
  const [center, setCenter] = useState({
    lat: 35.681454048919186,
    lng: 139.76707115336345
  });
  const [selectTab, setSelectTab] = useState(false);
  const bookFlashMessage = useContext(FlashMessageContext);

  useEffect(() => {
    axios.get('/dokotomeyo/details', { params: { parkingID: id } })
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
      bookFlashMessage("駐車場が見つかりませんでした");
      navigate("/dokotomeyo");
    })
  }, [id]);

  return (
    <SEdit_parking_wrapper>
      <SEdit_Detail_container>
        <SEdit_Detail_Edit>
          <SEdit_Detail_selector>
            <SEdit_Detail_selector_add onClick={() => {setSelectTab(false)}} selectTab={selectTab} >
              条件を追加する
            </SEdit_Detail_selector_add>
            <SEdit_Detail_selector_edit onClick={() => {setSelectTab(true)}} selectTab={selectTab} >
              駐車場情報を修正する
            </SEdit_Detail_selector_edit>
          </SEdit_Detail_selector>
          {selectTab
            ? <EditParkingDetail updateParking={updateParking} setUpdateParking={setUpdateParking} setCenter={setCenter} />
            : <AddRequirement parkingID={id} parkingData={parkingData} requirementsWeekdayData={requirementsWeekdayData} requirementsHolidayData={requirementsHolidayData} />
          }
        </SEdit_Detail_Edit>
      </SEdit_Detail_container>
      <LoadScript googleMapsApiKey={API_KEY}>
        <EditParkingMap updateParking={updateParking} setUpdateParking={setUpdateParking} center={center} setCenter={setCenter} />
      </LoadScript>
    </SEdit_parking_wrapper>
  );
};

const SEdit_parking_wrapper = styled.div`
  display: flex;
`;

const SEdit_Detail_container = styled.div`
  width: 60%;
  height: calc(100vh - 80px);
`;

const SEdit_Detail_Edit = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SEdit_Detail_selector = styled.div`
  height: 43px;
  font-size: 14px;
  display: flex;
  flex-direction: row;
`;

const SEdit_Detail_selector_add = styled.p`
  font-weight: bold;
  padding: 16px 24px 8px 24px;
  border-bottom: solid 2px ${ props => props.selectTab ? "white" : "gray" };
  transition: all 0.6s;
  &:hover {
    background-color: rgb(205, 205, 205);
  }
`;

const SEdit_Detail_selector_edit = styled.p`
  font-weight: bold;
  padding: 16px 24px 8px 24px;
  border-bottom: solid 2px ${ props => props.selectTab ? "gray" : "white" };
  transition: all 0.6s;
  &:hover {
    background-color: rgb(205, 205, 205);
  }
`;

export default EditParking;
