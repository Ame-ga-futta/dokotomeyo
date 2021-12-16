import React from "react";
import styled from 'styled-components';
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const TopRight = () => {
  const API_KEY = process.env.GOOGLE_MAP_API_KEY;

  const containerStyle = {
    width: "100%",
    height: "calc(100vh - 80px )",
  };

  const center = {
    lat: 35.68137561624836,
    lng: 139.76711406870342,
  };

  return (
    <STop_right>
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={17}
        ></GoogleMap>
      </LoadScript>
    </STop_right>
  );
};


const STop_right = styled.div`
  width: 60%;
  background-color: rgb(255, 250, 228);
`;

export default TopRight;
