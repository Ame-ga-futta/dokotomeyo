import React, { useState } from "react";
import styled from 'styled-components';
import ParkingSelector from "./ParkingSelector";
import ParkingItem from "./ParkingItem";

const Parking = () => {
  const [parkings, setParkings] = useState({});

  return (
    <SParking_container>
      <p>Parking</p>
      <ParkingSelector setParkings={setParkings} />
      {parkings && Object.keys(parkings).map((data, i) => {
        const parkingData = parkings[data]
        return <ParkingItem key={i} parkingData={parkingData} />
      })}
    </SParking_container>
  );
};

const SParking_container = styled.div`
  height: 100%;
`;

export default Parking;
