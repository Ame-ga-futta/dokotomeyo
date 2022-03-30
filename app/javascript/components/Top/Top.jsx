import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import moment from 'moment'
import { useParams } from 'react-router-dom';
import { LoadScript } from "@react-google-maps/api";
import TopLeft from "./TopLeft/TopLeft";
import TopRight from "./TopRight/TopRight";
import ParkingDetail from "./ParkingDetail/ParkingDetail";

const Top = (props) => {
  const {
    userName,
    bookFlashMessage
  } = props;

  const { id } = useParams();
  const API_KEY = process.env.GOOGLE_MAP_API_KEY;

  const [mapCenter, setMapCenter] = useState({
    lat: 35.681454048919186,
    lng: 139.76707115336345
  });
  const [narrowDown, setNarrowDown] = useState({
    place: "",
    start_date: moment().add(1, "months"),
    end_date: moment().add(1, "months").add(3, 'hours'),
    include_time: true,
    include_buy: false,
    include_facility: false
  });
  const [parkings, setParkings] = useState({})
  const [Highlight, setHighlight] = useState("");
  const [detail, setDetail] = useState("");

  useEffect(() => {
    if (id != null) {
      setDetail(id)
    }
  }, [])

  return (
    <>
      <LoadScript googleMapsApiKey={API_KEY}>
        <SSearch_container>
          <TopLeft narrowDown={narrowDown} setNarrowDown={setNarrowDown} mapCenter={mapCenter} setMapCenter={setMapCenter} bookFlashMessage={bookFlashMessage} parkings={parkings} setParkings={setParkings} setHighlight={setHighlight} detail={detail} setDetail={setDetail} />
          <TopRight mapCenter={mapCenter} parkings={parkings} Highlight={Highlight} />
          <TopDetail_container detail={detail}>
            {detail == "" || <ParkingDetail userName={userName} detail={detail} setDetail={setDetail} bookFlashMessage={bookFlashMessage} />}
          </TopDetail_container>
        </SSearch_container>
      </LoadScript>
    </>
  );
};

const SSearch_container = styled.div`
  display: flex;
  height: calc(100vh - 80px );
`;

const TopDetail_container = styled.div`
  position: fixed;
  z-index : 99993;
  top  : 80px;
  right : 0;
  height: calc(100vh - 80px );
  width: ${ props => props.detail == "" ? "0%" : "61%" };
  transition : 0.3s ease-in-out;
  background-color: #ffffff;
`;

export default Top;
