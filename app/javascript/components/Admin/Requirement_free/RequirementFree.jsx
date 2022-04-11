import React, { useState } from "react";
import styled from 'styled-components';
import RequirementFreeSelector from "./RequirementFreeSelector";
import RequirementFreeItem from "./RequirementFreeItem";

const RequirementFree = () => {
  const [frees, setFrees] = useState({});

  return (
    <SRequirementFree_container>
      <p>Requirement_free</p>
      <RequirementFreeSelector setFrees={setFrees} />
      {frees && Object.keys(frees).map((data, i) => {
        const requirementFreeData = frees[data]
        return <RequirementFreeItem key={i} requirementFreeData={requirementFreeData} />
      })}
    </SRequirementFree_container>
  );
};

const SRequirementFree_container = styled.div`
  height: 100%;
`;

export default RequirementFree;
