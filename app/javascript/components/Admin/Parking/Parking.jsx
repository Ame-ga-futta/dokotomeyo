import React, { useState } from "react";
import styled from 'styled-components';
import ParkingSelector from "./ParkingSelector";
import ParkingItem from "./ParkingItem";

const Parking = () => {
  const [parkings, setParkings] = useState({});
  const [message, setMessage] = useState(false);

  return (
    <SParking_container>
      <SParking_title>Parking</SParking_title>
      <ParkingSelector setParkings={setParkings} setMessage={setMessage} />
      <SParking_table>
        {message && <SMessage>Parkingは0件です</SMessage>}
        {parkings && Object.keys(parkings).map((data, i) => {
          const parkingData = parkings[data]
          return <SParking_item  key={i}><ParkingItem parkingData={parkingData} /></SParking_item>
        })}
      </SParking_table>
    </SParking_container>
  );
};

const SParking_container = styled.div`
  height: 100%;
`;

const SParking_title = styled.h1`
  height: 50px;
  padding: 15px 20px;
  font-weight: bold;
  background-color: #eeeeee;
`;

const SParking_table = styled.ul`
  height: calc(100% - 100px);
  padding: 0 20px;
  overflow-y: scroll;
`;

const SParking_item = styled.li`
  padding: 3px 0;
  margin: 11px 0;
  border-bottom: solid 1px gray;
`;

const SMessage = styled.p`
  margin: 4px 10px;
`;

export default Parking;
