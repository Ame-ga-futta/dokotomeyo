import React, { useState } from "react";
import styled from 'styled-components';
import RequirementFacilitySelector from "./RequirementFacilitySelector";

const RequirementFacility = () => {
  const [facilities, setFacilities] = useState({});

  return (
    <SRequirementFacility_container>
      <p>Requirement_facility</p>
      <RequirementFacilitySelector setFacilities={setFacilities} />
    </SRequirementFacility_container>
  );
};

const SRequirementFacility_container = styled.div`
  height: 100%;
`;

export default RequirementFacility;
