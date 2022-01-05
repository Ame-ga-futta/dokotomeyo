import React from "react";
import styled from 'styled-components';
import { GoogleMap, Marker } from "@react-google-maps/api";

const TopRight = (props) => {
  const {
    mapCenter
  } = props;

  const containerStyle = {
    width: "100%",
    height: "calc(100vh - 80px )",
  };

  return (
    <STop_right>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={16}
      >
        <Marker position={mapCenter} />
      </GoogleMap>
    </STop_right>
  );
};


const STop_right = styled.div`
  width: 60%;
  background-color: rgb(255, 250, 228);
`;

export default TopRight;
