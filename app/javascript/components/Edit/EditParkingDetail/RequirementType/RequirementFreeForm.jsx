import React, { useEffect, useState } from "react";
import styled from 'styled-components';

const RequirementFreeForm = (props) => {
  const {
    requirement,
    updatesFree,
    changeRequirement,
    setChangeRequirement
  } = props;

  const [deleteRequirement, setDeleteRequirement] = useState(false);
  const updateRequirements = {
    facility_name: requirement.facility_name,
    purchase_price: requirement.purchase_price,
    free_time: requirement.free_time,
    only_weekdays: requirement.only_weekdays
  };

  useEffect(() => {
    updatesFree[requirement.id] = {
      delete: deleteRequirement,
      change: changeRequirement,
      requirements: updateRequirements
    };
  }, [deleteRequirement, changeRequirement, updateRequirements])

  return (
    <SFormRequirement_item>
      <SFormRequirement_text>終日無料</SFormRequirement_text>
      <SFormRequirement_checkboxes>
        <SFormRequirement_checkbox
          type="checkbox"
          checked={changeRequirement}
          onChange={() => setChangeRequirement(!changeRequirement)}
        />
        <SFormRequirement_checkbox_label>{requirement.only_weekdays ? "全日" : "平日"}に変更</SFormRequirement_checkbox_label>
        <SFormRequirement_checkbox
          type="checkbox"
          checked={deleteRequirement}
          onChange={() => setDeleteRequirement(!deleteRequirement)}
        />
        <SFormRequirement_checkbox_label>削除</SFormRequirement_checkbox_label>
      </SFormRequirement_checkboxes>
    </SFormRequirement_item>
  );
};

const SFormRequirement_item = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 0 6px;
  margin: 5px 0;
  border-bottom: dashed 1px gray;
`;

const SFormRequirement_text = styled.p`
  padding: 6px 0;
`;

const SFormRequirement_checkboxes = styled.div`
  display: flex;
  align-items: center;
`;

const SFormRequirement_checkbox = styled.input`
  margin: 3px 8px;
`;

const SFormRequirement_checkbox_label = styled.p`
  font-size: 14px;
  padding: 3px 0;
`;

export default RequirementFreeForm;
