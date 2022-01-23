import React, { useState } from "react";
import styled from 'styled-components';
import moment from 'moment'
import { LoadScript } from "@react-google-maps/api";
import Flash from './Flash';
import TopLeft from "./TopLeft";
import TopRight from "./TopRight";
import ParkingDetail from "./ParkingDetail";

const Top = (props) => {
  const {
    flashMessage,
    bookFlashMessage
  } = props;

  const API_KEY = process.env.GOOGLE_MAP_API_KEY;

  const [mapCenter, setMapCenter] = useState({
    lat: 35.681454048919186,
    lng: 139.76707115336345
  });
  const [narrowDown, setNarrowDown] = useState({
    place: "",
    start_date: moment(),
    end_date: moment().add(3, 'hours'),
    include_time: true,
    include_buy: false,
    include_facility: false
  });
  const [parkings, setParkings] = useState({})
  const [Highlight, setHighlight] = useState("");
  const [parking, setParking] = useState("");
  const [openDetail, setOpenDetail] = useState(false);

  const openHandle = () => {
    setOpenDetail(!openDetail);
  };

  return (
    <>
      {flashMessage && <Flash message={flashMessage}/>}
      <LoadScript googleMapsApiKey={API_KEY}>
        <SSearch_container>
          <TopLeft narrowDown={narrowDown} setNarrowDown={setNarrowDown} mapCenter={mapCenter} setMapCenter={setMapCenter} bookFlashMessage={bookFlashMessage} parkings={parkings} setParkings={setParkings} setHighlight={setHighlight} setParking={setParking} openHandle={openHandle} />
          <TopRight mapCenter={mapCenter} parkings={parkings} Highlight={Highlight} />
          <ParkingDetail openDetail={openDetail} parking={parking} />
        </SSearch_container>
      </LoadScript>
    </>
  );
};

const SSearch_container = styled.div`
  display: flex;
  height: calc(100vh - 80px );
`;

export default Top;
