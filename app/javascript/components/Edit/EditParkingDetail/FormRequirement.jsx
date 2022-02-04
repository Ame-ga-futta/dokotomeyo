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
        {requirementsData.requirement_frees && requirementsData.requirement_frees.map((requirement, i) => {
          return <RequirementFreeForm requirement={requirement} key={i}/>
        })}
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
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const SformRequirement_Label = styled.p`
  width: 15%;
`;

const SFormRequirement_list = styled.ul`
  width: 85%;
  display: flex;
  align-items: start;
  flex-direction: column;
`;

const SFormRequirement_item = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const SFormRequirement_item_item = styled.li`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const SRequirement_Text_field = styled.input`
  border: solid 1px gray;
  border-radius: 5px;
  padding: 6px;
  margin: 0 5px;
  font-size: 16px;
`;

export default FormRequirement;
