import React, { useState } from "react";
import styled from 'styled-components';
import RequirementBuySelector from "./RequirementBuySelector";
import RequirementBuyItem from "./RequirementBuyItem";

const RequirementBuy = () => {
  const [buys, setBuys] = useState({});

  return (
    <SRequirementBuy_container>
      <p>Requirement_buy</p>
      <RequirementBuySelector setBuys={setBuys} />
      {buys && Object.keys(buys).map((data, i) => {
        const requirementBuyData = buys[data]
        return <RequirementBuyItem key={i} requirementBuyData={requirementBuyData} />
      })}
    </SRequirementBuy_container>
  );
};

const SRequirementBuy_container = styled.div`
  height: 100%;
`;

export default RequirementBuy;
