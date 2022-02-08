import React, { useState } from "react";
import styled from 'styled-components';

const RequirementTimeForm = (props) => {
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
      <ul>
        <SFormRequirement_item_item>
          <p>入庫後</p>
          <SRequirement_Text_field
            type="time"
            name="free_time"
            value={updateRequirements.free_time}
            onChange={(event) => setUpdateRequirements({...updateRequirements, free_time: event.target.value})}
          />
          <p>時間まで無料</p>
        </SFormRequirement_item_item>
      </ul>
    </SFormRequirement_item>
  );
};

const SFormRequirement_item = styled.li`
  padding-bottom: 10px;
`;

const SFormRequirement_item_item = styled.li`
  display: flex;
  align-items: center;
  margin: 4px 0;
`;

const SRequirement_Text_field = styled.input`
  border: solid 1px gray;
  border-radius: 5px;
  padding: 6px;
  margin: 0 5px;
  font-size: 16px;
`;

export default RequirementTimeForm;
