import React, { useState } from "react";
import styled from 'styled-components';
import RequirementFreeSelector from "./RequirementFreeSelector";
import RequirementFreeItem from "./RequirementFreeItem";

const RequirementFree = () => {
  const [frees, setFrees] = useState({});

  return (
    <SRequirementFree_container>
      <SRequirementFree_title>Requirement_free</SRequirementFree_title>
      <RequirementFreeSelector setFrees={setFrees} />
      <SRequirementFree_table>
        {frees && Object.keys(frees).map((data, i) => {
          const requirementFreeData = frees[data]
          return <SRequirementFree_item key={i}><RequirementFreeItem requirementFreeData={requirementFreeData} /></SRequirementFree_item>
        })}
      </SRequirementFree_table>
    </SRequirementFree_container>
  );
};

const SRequirementFree_container = styled.div`
  height: 100%;
`;

const SRequirementFree_title = styled.h1`
  height: 50px;
  padding: 15px 20px;
  font-weight: bold;
  background-color: #eeeeee;
`;

const SRequirementFree_table = styled.ul`
  height: calc(100% - 100px);
  padding: 0 20px;
  overflow-y: scroll;
`;

const SRequirementFree_item = styled.li`
  padding: 3px 0;
  margin: 11px 0;
  border-bottom: solid 1px gray;
`;

export default RequirementFree;
