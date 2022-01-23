import React from "react";
import styled from 'styled-components';

const ParkingDetail = (props) => {
  const {
    openDetail,
    parking
  } = props;

  return (
    <STop_ParkingDetail_Wrapper openDetail={openDetail}>
      <p>{parking.name}</p>
      <p>{parking.address}</p>
      <p>{parking.beginning_of_worktime} ~ {parking.end_of_worktime}</p>
    </STop_ParkingDetail_Wrapper>
  );
};

const STop_ParkingDetail_Wrapper = styled.div`
  position: fixed;
  z-index : 99993;
  top  : 80px;
  right : 0;
  height: calc(100vh - 80px );
  width: ${ props => props.openDetail ? "61%" : "0%" };
  transition : 0.3s ease-in-out;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`;

export default ParkingDetail;
