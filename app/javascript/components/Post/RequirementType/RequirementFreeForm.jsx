import React from "react";
import styled from 'styled-components';

const RequirementFreeForm = (props) => {
  const {
    requirement,
    setRequirement
  } = props;

  return (
    <SPost_form_ul>
      <SText_checkbox_row>
        <SText_checkbox
          type="checkbox"
          id="only_weekdays"
          value={requirement.only_weekdays}
          onChange={() => setRequirement({...requirement, only_weekdays: !requirement.only_weekdays})}
        />
        <SText_checkbox_label htmlFor="only_weekdays">平日のみ</SText_checkbox_label>
      </SText_checkbox_row>
    </SPost_form_ul>
  );
};

const SPost_form_ul = styled.ul`
  display: flex;
  flex-direction: column;
  padding-top: 5px;
  margin-top: 5px;
  border-top: solid 1px gray;
  li {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const SText_checkbox_row = styled.div`
  margin-left: 30%;
`;

const SText_checkbox = styled.input`
  margin: 3px 8px 3px 3px;
`;

const SText_checkbox_label = styled.label`
  font-size: 14px;
`;

export default RequirementFreeForm;
