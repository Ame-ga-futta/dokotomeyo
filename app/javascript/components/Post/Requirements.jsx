import React, { useState } from "react";
import styled from 'styled-components';
import RequirementForm from "./RequirementForm";
import RequirementFreeForm from "./RequirementType/RequirementFreeForm";
import RequirementTimeForm from "./RequirementType/RequirementTimeForm";
import RequirementBuyForm from "./RequirementType/RequirementBuyForm";
import RequirementFacilityForm from "./RequirementType/RequirementFacilityForm";

const Requirements = () => {
  const [type, setType] = useState("free");

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
    <SPostRequirements_wrapper>
      <form>
        <SPostRequirements_form>
          <SText_label>無料の条件</SText_label>
          <SPostRequirements_checkboxes>
            <RequirementForm type={type} setType={setType} />
          </SPostRequirements_checkboxes>
        </SPostRequirements_form>
        {DisplayForm()}
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
