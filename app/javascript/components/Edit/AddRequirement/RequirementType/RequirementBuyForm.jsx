import React from "react";
import styled from 'styled-components';

const RequirementBuyForm = (props) => {
  const {
    addRequirement,
    setAddRequirement
  } = props;

  return (
    <>
      <SEdit_form_ul>
        <li>
          <SRequirement_Text_field
            type="text"
            name="facility_name"
            placeholder="施設名"
            value={addRequirement.facility_name}
            onChange={(event) => setAddRequirement({...addRequirement, facility_name: event.target.value})}
          />
          <p>での購入金額が</p>
        </li>
        <li>
          <SRequirement_Text_field
            type="number"
            name="purchase_price"
            placeholder="購入金額"
            value={addRequirement.purchase_price}
            onChange={(event) => setAddRequirement({...addRequirement, purchase_price: event.target.value})}
          />
          <p>円以上で</p>
        </li>
        <li>
          <SRequirement_Text_field
            type="time"
            name="free_time"
            value={addRequirement.free_time}
            onChange={(event) => setAddRequirement({...addRequirement, free_time: event.target.value})}
          />
          <p>時間無料</p>
        </li>
        <li>
          <SText_checkbox
            type="checkbox"
            id="only_weekdays"
            value={addRequirement.only_weekdays}
            onChange={() => setAddRequirement({...addRequirement, only_weekdays: !addRequirement.only_weekdays})}
          />
          <SText_checkbox_label htmlFor="only_weekdays">平日のみ</SText_checkbox_label>
        </li>
      </SEdit_form_ul>
    </>
  );
};

const SEdit_form_ul = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 10px;
  li {
    margin: 10px 0;
    display: flex;
    justify-content: start;
    align-items: center;
  }
`;

const SRequirement_Text_field = styled.input`
  width: 50%;
  border: solid 1px gray;
  border-radius: 5px;
  padding: 6px;
  margin: 0 5px;
  font-size: 16px;
`;

const SText_checkbox = styled.input`
  margin: 3px 8px 3px 3px;
`;

const SText_checkbox_label = styled.label`
  font-size: 14px;
`;

export default RequirementBuyForm;
