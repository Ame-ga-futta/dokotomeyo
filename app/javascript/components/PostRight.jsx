import React, { useState } from "react";
import styled from 'styled-components';
import { GoogleMap, Marker } from "@react-google-maps/api";

const PostRight = (props) => {
  const {
    setAddress,
    setLatitude,
    setLongitude,
    mapCenter,
    setMapCenter
  } = props;

  const [place, setPlace] = useState("");

  const containerStyle = {
    width: "100%",
    height: "calc(100vh - 80px )",
  };

  const geocoder = new window.google.maps.Geocoder();

  const click = (latLng) => {
    geocoder.geocode({location: latLng}, ( results, status ) => {
      if (status === 'OK') {
        setAddress(results[0].formatted_address);
        setLatitude(results[0].geometry.location.lat());
        setLongitude(results[0].geometry.location.lng());
        setMapCenter({ lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() })
      }
    });
  }

  const search = (event) => {
    geocoder.geocode({ address: place }, ( results, status ) => {
      if (status === 'OK') {
        setMapCenter({ lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() })
      }
    });
    event.preventDefault();
  }

  return (
    <SPost_container_right>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={17}
        onClick={event => click(event.latLng)}
      >
        <Marker position={mapCenter} />
      </GoogleMap>
      <SGoogleMap_serach>
        <form onSubmit={search}>
          <SSearch_field
            type="text"
            name="place"
            value={place}
            onChange={event => setPlace(event.target.value)}
          />
          <SSearch_submit>検索</SSearch_submit>
        </form>
      </SGoogleMap_serach>
    </SPost_container_right>
  );
};

const SPost_container_right = styled.div`
  position: relative;
  width: 40%;
  background-color: rgb(255, 250, 228);
`;

const SGoogleMap_serach = styled.div`
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

export default PostRight;
