import React, { useState } from "react";
import styled from 'styled-components';
import RequirementFreeForm from "./RequirementType/RequirementFreeForm";
import RequirementTimeForm from "./RequirementType/RequirementTimeForm";
import RequirementBuyForm from "./RequirementType/RequirementBuyForm";
import RequirementFacilityForm from "./RequirementType/RequirementFacilityForm";

const RequirementForm = () => {
  const [type, setType] = useState("free");

  const ChangeType = (event) => {
    setType(event.target.id);
  }

  const DisplayForm = () => {
    switch (type){
      case "free":
        return <RequirementFreeForm />
      case "time":
        return <RequirementTimeForm />
      case "buy":
        return <RequirementBuyForm />
      case "facility":
        return <RequirementFacilityForm />
    }
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
          <SText_checkbox_label htmlFor="buy">買い物金額一定以上で無料</SText_checkbox_label>
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
        {DisplayForm()}
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
