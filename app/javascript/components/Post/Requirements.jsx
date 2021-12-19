import React from "react";
import styled from 'styled-components';
import RequirementForm from "./RequirementForm";

const Requirements = () => {
  return (
    <SPostRequirements_wrapper>
      <form>
        <SPostRequirements_form>
          <SText_label>無料の条件</SText_label>
          <SPostRequirements_checkboxes>
            <RequirementForm />
          </SPostRequirements_checkboxes>
        </SPostRequirements_form>
      </form>
    </SPostRequirements_wrapper>
  );
};

const SPostRequirements_wrapper = styled.div`
  margin: 10px;
  text-align: left;
`;

const SText_label = styled.label`
  width: 30%;
  font-size: 18px;
`;

const SPostRequirements_form = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SPostRequirements_checkboxes = styled.div`
  width: 70%;
`;

export default Requirements;
