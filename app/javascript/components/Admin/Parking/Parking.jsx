import React, { useState } from "react";
import styled from 'styled-components';
import ParkingSelector from "./ParkingSelector";

const Parking = () => {
  const [parkings, setParkings] = useState({});

  return (
    <SParking_container>
      <p>Parking</p>
      <ParkingSelector setParkings={setParkings} />
    </SParking_container>
  );
};

const SParking_container = styled.div`
  height: 100%;
`;

export default Parking;
