import React from "react";
import styled from 'styled-components';

const RequirementTimeForm = (props) => {
  const {
    requirement,
    setRequirement
  } = props;

  return (
    <SPost_form_ul>
      <li>
        <p>入庫後</p>
        <SRequirement_Text_field
          type="time"
          name="free_time"
          value={requirement.free_time}
          onChange={event => setRequirement({...requirement, free_time: event.target.value})}
        />
        <p>時間まで無料</p>
      </li>
      <li>
        <SText_checkbox
          type="checkbox"
          id="only_weekdays"
          value={requirement.only_weekdays}
          onChange={() => setRequirement({...requirement, only_weekdays: !requirement.only_weekdays})}
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

export default RequirementTimeForm;
