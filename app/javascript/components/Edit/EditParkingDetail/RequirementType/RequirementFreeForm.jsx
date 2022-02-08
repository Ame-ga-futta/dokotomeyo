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
      <SFormRequirement_frees>
        <SText_checkbox
          type="checkbox"
          id="only_weekdays"
          value={updateRequirements.only_weekdays}
          onChange={() => setUpdateRequirements({...updateRequirements, only_weekdays: !updateRequirements.only_weekdays})}
        />
        <SText_checkbox_label htmlFor="only_weekdays">平日のみ</SText_checkbox_label>
      </SFormRequirement_frees>
    </SFormRequirement_item>
  );
};

const SFormRequirement_item = styled.li`
  padding-bottom: 10px;
`;

const SFormRequirement_frees = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const SText_checkbox = styled.input`
  margin: 3px 8px 3px 3px;
`;

const SText_checkbox_label = styled.label`
  margin: 3px;
`;

export default RequirementFreeForm;
