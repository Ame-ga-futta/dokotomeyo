import React from "react";
import styled from 'styled-components';

const RequirementFreeForm = (props) => {
  const {
    addRequirement,
    setAddRequirement
  } = props;

  return (
    <>
      <SEdit_form_ul>
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

const SText_checkbox = styled.input`
  margin: 3px 8px 3px 3px;
`;

const SText_checkbox_label = styled.label`
  font-size: 14px;
`;

export default RequirementFreeForm;
