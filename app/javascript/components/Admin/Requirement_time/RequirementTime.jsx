import React, { useState } from "react";
import styled from 'styled-components';
import RequirementTimeSelector from "./RequirementTimeSelector";
import RequirementTimeItem from "./RequirementTimeItem";

const RequirementTime = () => {
  const [times, setTimes] = useState({});

  return (
    <SRequirementTime_container>
      <p>Requirement_time</p>
      <RequirementTimeSelector setTimes={setTimes} />
      {times && Object.keys(times).map((data, i) => {
        const requirementTimeData = times[data]
        return <RequirementTimeItem key={i} requirementTimeData={requirementTimeData} />
      })}
    </SRequirementTime_container>
  );
};

const SRequirementTime_container = styled.div`
  height: 100%;
`;

export default RequirementTime;
