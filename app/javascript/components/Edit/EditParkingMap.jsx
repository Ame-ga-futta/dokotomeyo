import React, { useState } from "react";
import styled from 'styled-components';
import { GoogleMap, Marker } from "@react-google-maps/api";

const EditParkingMap = (props) => {
  const {
    updateParking,
    setUpdateParking,
    center,
    setCenter
  } = props;

  const [place, setPlace] = useState("");

  const containerStyle = {
    width: "100%",
    height: "calc(100vh - 80px )",
  };

  const geocoder = new window.google.maps.Geocoder();

  const click = (latLng) => {
    geocoder.geocode({ location: latLng }, ( results, status ) => {
      if (status === 'OK') {
        setUpdateParking({ ...updateParking, address: results[0].formatted_address.split('、')[1], latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng() })
        setCenter({ lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() })
      }
    });
  };

  const search = (event) => {
    geocoder.geocode({ address: place}, ( results, status ) => {
      if (status === 'OK') {
        setUpdateParking({ ...updateParking, address: results[0].formatted_address.split('、')[1], latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng() })
        setCenter({ lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() })
      }
    });
    event.preventDefault();
  };

  return (
    <SEdit_Map_container>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
        onClick={event => click(event.latLng)} >
        <Marker position={center} />
      </GoogleMap>
      <SGoogleMap_search>
        <form onSubmit={search}>
          <SSearch_field
            type="text"
            name="place"
            value={place}
            onChange={event => setPlace(event.target.value)}
          />
          <SSearch_submit>検索</SSearch_submit>
        </form>
      </SGoogleMap_search>
    </SEdit_Map_container>
  );
};

const SEdit_Map_container = styled.div`
  width: 40%;
  position: relative;
`;

const SGoogleMap_search = styled.div`
  position: absolute;
  width: 100%;
  top  : 55px;
  left : 0;
  padding: 0 10px;
`;

const SSearch_field = styled.input`
  width: 70%;
  height: 38px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 0px 4px 2px #e8e8e8;
  font-size: 17px;
  padding: 5px 15px;
`;

const SSearch_submit = styled.button`
  width: 15%;
  height: 38px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 0px 4px 2px #e8e8e8;
  font-size: 17px;
  padding: 5px 0;
  text-align: center;
`;

export default EditParkingMap;
