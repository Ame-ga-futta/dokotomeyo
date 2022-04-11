import React, { useState } from "react";
import styled from 'styled-components';
import RequirementFacilitySelector from "./RequirementFacilitySelector";
import RequirementFacilityItem from "./RequirementFacilityItem";

const RequirementFacility = () => {
  const [facilities, setFacilities] = useState({});

  return (
    <SRequirementFacility_container>
      <p>Requirement_facility</p>
      <RequirementFacilitySelector setFacilities={setFacilities} />
      {facilities && Object.keys(facilities).map((data, i) => {
        const requirementFacilityData = facilities[data]
        return <RequirementFacilityItem key={i} requirementFacilityData={requirementFacilityData} />
      })}
    </SRequirementFacility_container>
  );
};

const SRequirementFacility_container = styled.div`
  height: 100%;
`;

export default RequirementFacility;
