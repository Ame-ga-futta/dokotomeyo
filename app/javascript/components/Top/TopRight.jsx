import React from "react";
import styled from 'styled-components';
import { GoogleMap, Marker } from "@react-google-maps/api";

const TopRight = (props) => {
  const {
    mapCenter,
    parkings,
    Highlight
  } = props;

  const containerStyle = {
    width: "100%",
    height: "calc(100vh - 80px )",
  };

  const centerMarkerOptions = {
    position: mapCenter,
    icon: {
      fillColor: "#009be8",
      fillOpacity: 1,
      path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      scale: 10,
      strokeColor: "#ffffff",
      strokeWeight: 1.4
    }
  }

  return (
    <STop_right>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={15}
      >
        <Marker options={centerMarkerOptions} />
        <ul>
          {parkings[0] && parkings[0].map((parking, i) => {
            return (
              <li key={i}>
                <Marker
                  position={{ lat: parking.latitude, lng: parking.longitude }}
                  animation={Highlight === i && google.maps.Animation.BOUNCE}
                />
              </li>
            )
          })}
        </ul>
      </GoogleMap>
    </STop_right>
  );
};


const STop_right = styled.div`
  width: 60%;
  background-color: rgb(255, 250, 228);
`;

export default TopRight;
