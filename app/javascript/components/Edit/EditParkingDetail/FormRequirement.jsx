import React from "react";
import styled from 'styled-components';
import RequirementBuyForm from "./RequirementType/RequirementBuyForm";
import RequirementFacilityForm from "./RequirementType/RequirementFacilityForm";
import RequirementFreeForm from "./RequirementType/RequirementFreeForm";
import RequirementTimeForm from "./RequirementType/RequirementTimeForm";

const FormRequirement = (props) => {
  const {
    requirementsData,
    label
  } = props;

  return (
    <SFormRequirement_container>
      <SformRequirement_Label>{label}</SformRequirement_Label>
      <SFormRequirement_list>
        {requirementsData.requirement_buys && requirementsData.requirement_buys.map((requirement, i) => {
          return <RequirementBuyForm requirement={requirement} key={i}/>
        })}
        {requirementsData.requirement_facilities && requirementsData.requirement_facilities.map((requirement, i) => {
          return <RequirementFacilityForm requirement={requirement} key={i}/>
        })}
        {requirementsData.requirement_times && requirementsData.requirement_times.map((requirement, i) => {
          return <RequirementTimeForm requirement={requirement} key={i}/>
        })}
      </SFormRequirement_list>
    </SFormRequirement_container>
  );
};

const SFormRequirement_container = styled.div`
  padding: 10px 0;
`;

const SformRequirement_Label = styled.p`
  line-height: initial;
  border-bottom: solid 1px gray;
  padding: 0 0 4px 4px;
  margin-bottom: 2px;
`;

const SFormRequirement_list = styled.ul`
  display: flex;
  align-items: start;
  flex-direction: column;
`;

export default FormRequirement;
