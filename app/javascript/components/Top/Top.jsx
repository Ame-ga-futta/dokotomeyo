import React, { useState } from "react";
import styled from 'styled-components';
import { LoadScript } from "@react-google-maps/api";
import Flash from './Flash';
import TopLeft from "./TopLeft";
import TopRight from "./TopRight";

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
    start_time: "",
    end_time: "",
    include_time: true,
    include_buy: false,
    include_facility: false
  });

  return (
    <>
      {flashMessage && <Flash message={flashMessage}/>}
      <LoadScript googleMapsApiKey={API_KEY}>
        <SSearch_container>
          <TopLeft narrowDown={narrowDown} setNarrowDown={setNarrowDown} mapCenter={mapCenter} setMapCenter={setMapCenter} bookFlashMessage={bookFlashMessage} />
          <TopRight mapCenter={mapCenter} />
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
