import React from "react";
import styled from 'styled-components';

const RequirementForm = (props) => {
  const {type, setType} = props

  const ChangeType = (event) => {
    setType(event.target.id);
  }

  return (
    <div>
      <ul>
        <li>
          <SText_checkbox
            type="checkbox"
            id="free"
            checked={type === "free"}
            onChange={ChangeType}
          />
          <SText_checkbox_label htmlFor="free">終日無料</SText_checkbox_label>
        </li>
        <li>
          <SText_checkbox
            type="checkbox"
            id="time"
            checked={type === "time"}
            onChange={ChangeType}
          />
          <SText_checkbox_label htmlFor="time">入庫後一定時間無料</SText_checkbox_label>
        </li>
        <li>
          <SText_checkbox
            type="checkbox"
            id="buy"
            checked={type === "buy"}
            onChange={ChangeType}
          />
          <SText_checkbox_label htmlFor="buy">提携施設での買い物金額一定以上で無料</SText_checkbox_label>
        </li>
        <li>
          <SText_checkbox
            type="checkbox"
            id="facility"
            checked={type === "facility"}
            onChange={ChangeType}
          />
          <SText_checkbox_label htmlFor="facility">施設利用で無料</SText_checkbox_label>
        </li>
      </ul>
    </div>
  );
};

const SText_checkbox = styled.input`
  margin: 3px 8px 3px 3px;
`;

const SText_checkbox_label = styled.label`
  font-size: 14px;
`;

export default RequirementForm;
