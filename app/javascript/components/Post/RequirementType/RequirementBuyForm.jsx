import React, { useState } from "react";
import styled from 'styled-components';

const RequirementBuyForm = () => {
  const [facility_name, setFacility_name] = useState("");
  const [purchase_price, setPurchase_price] = useState("");
  const [free_time, setFree_time] = useState("");
  const [only_weekdays, setOnly_weekdays] = useState(false);

  return (
    <SPost_form_ul>
      <li>
        <SRequirement_Text_field
          type="text"
          name="facility_name"
          placeholder="施設名"
          value={facility_name}
          onChange={event => setFacility_name(event.target.value)}
        />
        <p>での購入金額が</p>
      </li>
      <li>
        <SRequirement_Text_field
          type="number"
          name="purchase_price"
          placeholder="購入金額"
          value={purchase_price}
          onChange={event => setPurchase_price(event.target.value)}
        />
        <p>円以上で</p>
      </li>
      <li>
        <SRequirement_Text_field
          type="time"
          name="free_time"
          value={free_time}
          onChange={event => setFree_time(event.target.value)}
        />
        <p>時間無料</p>
      </li>
      <li>
        <SText_checkbox
          type="checkbox"
          id="only_weekdays"
          value={only_weekdays}
          onChange={() => setOnly_weekdays(!only_weekdays)}
        />
        <SText_checkbox_label htmlFor="only_weekdays">平日のみ</SText_checkbox_label>
      </li>
    </SPost_form_ul>
  );
};

const SPost_form_ul = styled.ul`
  display: flex;
  flex-direction: column;
  padding-top: 5px;
  margin: 5px 0 0 30%;
  border-top: solid 1px gray;
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
