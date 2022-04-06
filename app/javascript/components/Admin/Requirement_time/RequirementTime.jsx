import React, { useState } from "react";
import styled from 'styled-components';
import RequirementTimeSelector from "./RequirementTimeSelector";

const RequirementTime = () => {
  const [times, setTimes] = useState({});

  return (
    <SRequirementTime_container>
      <p>Requirement_time</p>
      <RequirementTimeSelector setTimes={setTimes} />
    </SRequirementTime_container>
  );
};

const SRequirementTime_container = styled.div`
  height: 100%;
`;

export default RequirementTime;
