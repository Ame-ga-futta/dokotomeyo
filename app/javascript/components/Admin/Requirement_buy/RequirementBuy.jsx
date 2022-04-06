import React, { useState } from "react";
import styled from 'styled-components';
import RequirementBuySelector from "./RequirementBuySelector";

const RequirementBuy = () => {
  const [buys, setBuys] = useState({});

  return (
    <SRequirementBuy_container>
      <p>Requirement_buy</p>
      <RequirementBuySelector setBuys={setBuys} />
    </SRequirementBuy_container>
  );
};

const SRequirementBuy_container = styled.div`
  height: 100%;
`;

export default RequirementBuy;
