import React, { useState } from "react";
import styled from 'styled-components';
import RequirementFacilitySelector from "./RequirementFacilitySelector";
import RequirementFacilityItem from "./RequirementFacilityItem";

const RequirementFacility = () => {
  const [facilities, setFacilities] = useState({});
  const [message, setMessage] = useState(false);

  return (
    <SRequirementFacility_container>
      <SRequirementFacility_title>Requirement_facility</SRequirementFacility_title>
      <RequirementFacilitySelector setFacilities={setFacilities} setMessage={setMessage} />
      <SRequirementFacility_table>
        {message && <SMessage>RequirementFacilityは0件です</SMessage>}
        {facilities && Object.keys(facilities).map((data, i) => {
          const requirementFacilityData = facilities[data]
          return <SRequirementFacility_item key={i}><RequirementFacilityItem requirementFacilityData={requirementFacilityData} /></SRequirementFacility_item>
        })}
      </SRequirementFacility_table>
    </SRequirementFacility_container>
  );
};

const SRequirementFacility_container = styled.div`
  height: 100%;
`;

const SRequirementFacility_title = styled.h1`
  height: 50px;
  padding: 15px 20px;
  font-weight: bold;
  background-color: #eeeeee;
`;

const SRequirementFacility_table = styled.ul`
  height: calc(100% - 100px);
  padding: 0 20px;
  overflow-y: scroll;
`;

const SRequirementFacility_item = styled.li`
  padding: 3px 0;
  margin: 11px 0;
  border-bottom: solid 1px gray;
`;

const SMessage = styled.p`
  margin: 4px 10px;
`;

export default RequirementFacility;
