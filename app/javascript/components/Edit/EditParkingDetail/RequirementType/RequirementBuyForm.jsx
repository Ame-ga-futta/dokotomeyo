import React, { useEffect, useState } from "react";
import styled from 'styled-components';

const RequirementBuyForm = (props) => {
  const {
    requirement,
    updatesBuy,
    changeRequirement
  } = props;

  const [deleteRequirement, setDeleteRequirement] = useState(false);
  const [updateRequirements, setUpdateRequirements] = useState({
    facility_name: requirement.facility_name,
    purchase_price: requirement.purchase_price,
    free_time: requirement.free_time,
    only_weekdays: requirement.only_weekdays
  });

  useEffect(() => {
    updatesBuy[requirement.id] = {
      delete: deleteRequirement,
      requirements: updateRequirements
    };
  }, [deleteRequirement, updateRequirements])

  useEffect(() => {
    if (changeRequirement) {
      setDeleteRequirement(true)
    } else {
      setDeleteRequirement(false)
    }
  }, [changeRequirement])

  return (
    <SFormRequirement_item>
      <ul>
        <SFormRequirement_item_item>
          <SRequirement_Text_field
            type="text"
            name="facility_name"
            value={updateRequirements.facility_name}
            onChange={(event) => setUpdateRequirements({...updateRequirements, facility_name: event.target.value})}
          />
          <p>での購入金額が</p>
        </SFormRequirement_item_item>
        <SFormRequirement_item_item>
          <SRequirement_Number_field
            type="number"
            name="purchase_price"
            value={updateRequirements.purchase_price}
            onChange={(event) => setUpdateRequirements({...updateRequirements, purchase_price: event.target.value})}
          />
          <p>円以上で</p>
          <SRequirement_Text_field
            type="time"
            name="free_time"
            value={updateRequirements.free_time}
            onChange={(event) => setUpdateRequirements({...updateRequirements, free_time: event.target.value})}
          />
          <p>時間無料</p>
        </SFormRequirement_item_item>
      </ul>
      <SFormRequirement_checkboxes>
        <SFormRequirement_checkbox
          type="checkbox"
          checked={deleteRequirement}
          onChange={() => {changeRequirement || setDeleteRequirement(!deleteRequirement)}}
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

const SFormRequirement_checkboxes = styled.div`
  display: flex;
  align-items: center;
`;

const SFormRequirement_checkbox = styled.input`
  margin: 3px 8px 3px 3px;
`;

const SFormRequirement_checkbox_label = styled.p`
  font-size: 14px;
  padding: 3px 0;
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

const SRequirement_Number_field = styled.input`
  width: 20%;
  border: solid 1px gray;
  border-radius: 5px;
  padding: 6px;
  margin: 0 5px;
  font-size: 16px;
`;

export default RequirementBuyForm;
