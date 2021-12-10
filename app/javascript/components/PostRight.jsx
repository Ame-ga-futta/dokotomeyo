import React from "react";
import styled from 'styled-components';
import { GoogleMap, Marker } from "@react-google-maps/api";

const PostRight = (props) => {
  const {
    mapCenter
  } = props;

  const containerStyle = {
    width: "100%",
    height: "calc(100vh - 80px )",
  };

  return (
    <SPost_container_right>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={17}
      >
        <Marker position={mapCenter} />
      </GoogleMap>
    </SPost_container_right>
  );
};

const SPost_container_right = styled.div`
  width: 40%;
  background-color: rgb(255, 250, 228);
`;

export default PostRight;
