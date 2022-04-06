import React, { useState } from "react";
import styled from 'styled-components';
import RequirementFreeSelector from "./RequirementFreeSelector";

const RequirementFree = () => {
  const [frees, setFrees] = useState({});

  return (
    <SRequirementFree_container>
      <p>Requirement_free</p>
      <RequirementFreeSelector setFrees={setFrees} />
    </SRequirementFree_container>
  );
};

const SRequirementFree_container = styled.div`
  height: 100%;
`;

export default RequirementFree;
