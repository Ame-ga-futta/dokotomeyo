import React from "react";
import styled from 'styled-components';
import ReturnFree from "../ReturnRequirements/ReturnFree";
import ReturnBuy from "../ReturnRequirements/ReturnBuy";
import ReturnFacility from "../ReturnRequirements/ReturnFacility";
import ReturnTime from "../ReturnRequirements/ReturnTime";

const UpdateRequirementsWeekday = (props) => {
  const {
    updateRequirements
  } = props;

  return (
    <ConfirmParking_sub_table>
      {updateRequirements.requirement_free && Object.keys(updateRequirements.requirement_free).map((data, i) => {
        const requirement = updateRequirements.requirement_free[data].requirements
        const delete_requirement = updateRequirements.requirement_free[data].delete
        const change_requirement = updateRequirements.requirement_free[data].change
        const display = requirement.only_weekdays
        if (delete_requirement) {
          return requirement.only_weekdays && <ReturnFree key={i} delete_requirement={delete_requirement} />
        } else if (change_requirement) {
          return <ReturnFree key={i} delete_requirement={display} />
        } else {
          return requirement.only_weekdays && <ReturnFree key={i} />
        }
      })}
      {updateRequirements.requirement_buy && Object.keys(updateRequirements.requirement_buy).map((data, i) => {
        const requirement = updateRequirements.requirement_buy[data].requirements
        const delete_requirement = updateRequirements.requirement_buy[data].delete
        return requirement.only_weekdays && <ReturnBuy key={i} requirement={requirement} delete_requirement={delete_requirement} />
      })}
      {updateRequirements.requirement_facility && Object.keys(updateRequirements.requirement_facility).map((data, i) => {
        const requirement = updateRequirements.requirement_facility[data].requirements
        const delete_requirement = updateRequirements.requirement_facility[data].delete
        return requirement.only_weekdays && <ReturnFacility key={i} requirement={requirement} delete_requirement={delete_requirement} />
      })}
      {updateRequirements.requirement_time && Object.keys(updateRequirements.requirement_time).map((data, i) => {
        const requirement = updateRequirements.requirement_time[data].requirements
        const delete_requirement = updateRequirements.requirement_time[data].delete
        return requirement.only_weekdays && <ReturnTime key={i} requirement={requirement} delete_requirement={delete_requirement} />
      })}
    </ConfirmParking_sub_table>
  );
};

const ConfirmParking_sub_table = styled.ul`
  width: 85%;
`;

export default UpdateRequirementsWeekday;
