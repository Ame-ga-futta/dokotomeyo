import React, { useState } from "react";
import styled from 'styled-components';

const RequirementFreeForm = (props) => {
  const {
    requirement
  } = props;

  const [updateRequirements, setUpdateRequirements] = useState({
    facility_name: requirement.facility_name,
    purchase_price: requirement.purchase_price,
    free_time: requirement.free_time,
    only_weekdays: requirement.only_weekdays
  });

  return (
    <SFormRequirement_item>
      <p>終日無料</p>
    </SFormRequirement_item>
  );
};

const SFormRequirement_item = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const SFormRequirement_item_item = styled.li`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const SRequirement_Text_field = styled.input`
  border: solid 1px gray;
  border-radius: 5px;
  padding: 6px;
  margin: 0 5px;
  font-size: 16px;
`;

export default RequirementFreeForm;
