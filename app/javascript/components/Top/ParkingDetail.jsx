import React from "react";
import styled from 'styled-components';
import { GoogleMap, Marker } from "@react-google-maps/api";

const ParkingDetail = (props) => {
  const {
    detail
  } = props;

  const center = {
    lat: 35.681454048919186,
    lng: 139.76707115336345
  }

  const containerStyle = {
    width: "100%",
    height: "50%",
  }

  return (
    <STop_ParkingDetail>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18} >
        <Marker position={center} />
      </GoogleMap>
      <STop_ParkingDetail_list>
        <li>
          <STop_ParkingDetail_name>{detail}</STop_ParkingDetail_name>
        </li>
        <li>
          <STop_ParkingDetail_header>住所</STop_ParkingDetail_header>
          <STop_ParkingDetail_data>あっち</STop_ParkingDetail_data>
        </li>
        <li>
          <STop_ParkingDetail_header>営業時間</STop_ParkingDetail_header>
          <STop_ParkingDetail_data>あれ 〜 それ</STop_ParkingDetail_data>
        </li>
        <li>
          <STop_ParkingDetail_header>無料の条件</STop_ParkingDetail_header>
          <STop_ParkingDetail_data>ああああああああああ！！！！！！！！</STop_ParkingDetail_data>
        </li>
      </STop_ParkingDetail_list>
    </STop_ParkingDetail>
  )
};

const STop_ParkingDetail = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const STop_ParkingDetail_list = styled.ul`
  li {
    padding: 10px 20px;
    display: flex;
    flex-direction: row;
  }
  li: first-child {
    background-color: #eeeeee;
  }
`;

const STop_ParkingDetail_name = styled.h4`
  font-weight: bold;
`;

const STop_ParkingDetail_header = styled.p`
  width: 20%;
`;

const STop_ParkingDetail_data = styled.p`
  width: 80%;
`;

export default ParkingDetail;
