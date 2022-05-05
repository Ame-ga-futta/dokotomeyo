import React, { useState } from "react";
import styled from 'styled-components';
import RequirementTimeSelector from "./RequirementTimeSelector";
import RequirementTimeItem from "./RequirementTimeItem";

const RequirementTime = () => {
  const [times, setTimes] = useState({});
  const [message, setMessage] = useState(false);

  return (
    <SRequirementTime_container>
      <SRequirementTime_title>Requirement_time</SRequirementTime_title>
      <RequirementTimeSelector setTimes={setTimes} setMessage={setMessage} />
      <SRequirementTime_table>
        {message && <SMessage>RequirementTimeは0件です</SMessage>}
        {times && Object.keys(times).map((data, i) => {
          const requirementTimeData = times[data]
          return <SRequirementTime_item key={i}><RequirementTimeItem requirementTimeData={requirementTimeData} /></SRequirementTime_item>
        })}
      </SRequirementTime_table>
    </SRequirementTime_container>
  );
};

const SRequirementTime_container = styled.div`
  height: 100%;
`;

const SRequirementTime_title = styled.h1`
  height: 50px;
  padding: 15px 20px;
  font-weight: bold;
  background-color: #eeeeee;
`;

const SRequirementTime_table = styled.ul`
  height: calc(100% - 100px);
  padding: 0 20px;
  overflow-y: scroll;
`;

const SRequirementTime_item = styled.li`
  padding: 3px 0;
  margin: 11px 0;
  border-bottom: solid 1px gray;
`;

const SMessage = styled.p`
  margin: 4px 10px;
`;

export default RequirementTime;
