import React, { useState } from "react";
import styled from 'styled-components';
import RequirementBuySelector from "./RequirementBuySelector";
import RequirementBuyItem from "./RequirementBuyItem";

const RequirementBuy = () => {
  const [buys, setBuys] = useState({});

  return (
    <SRequirementBuy_container>
      <SRequirementBuy_title>Requirement_buy</SRequirementBuy_title>
      <RequirementBuySelector setBuys={setBuys} />
      <SRequirementBuy_table>
        {buys && Object.keys(buys).map((data, i) => {
          const requirementBuyData = buys[data]
          return <SRequirementBuy_item key={i}><RequirementBuyItem requirementBuyData={requirementBuyData} /></SRequirementBuy_item>
        })}
      </SRequirementBuy_table>
    </SRequirementBuy_container>
  );
};

const SRequirementBuy_container = styled.div`
  height: 100%;
`;

const SRequirementBuy_title = styled.h1`
  height: 50px;
  padding: 15px 20px;
  font-weight: bold;
  background-color: #eeeeee;
`;

const SRequirementBuy_table = styled.ul`
  height: calc(100% - 100px);
  padding: 0 20px;
  overflow-y: scroll;
`;

const SRequirementBuy_item = styled.li`
  padding: 3px 0;
  margin: 11px 0;
  border-bottom: solid 1px gray;
`;

export default RequirementBuy;
