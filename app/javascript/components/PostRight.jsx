import React from "react";
import styled from 'styled-components';
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const PostRight = () => {
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
    <SPost_container_right>
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={17}
        ></GoogleMap>
      </LoadScript>
    </SPost_container_right>
  );
};

const SPost_container_right = styled.div`
  width: 40%;
  background-color: rgb(255, 250, 228);
`;

export default PostRight;
