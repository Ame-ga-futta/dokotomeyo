import React from "react";
import styled from 'styled-components';
import ReturnFree from "./ReturnRequirements/ReturnFree";
import ReturnBuy from "./ReturnRequirements/ReturnBuy";
import ReturnFacility from "./ReturnRequirements/ReturnFacility";
import ReturnTime from "./ReturnRequirements/ReturnTime";

const EditParkingDetailConfirmRequirements = (props) => {
  const {
    existRequirementsWeekdayData,
    existRequirementsHolidayData,
    updatesData
  } = props;

  return (
    <ul>
      <ConfirmParking_item>
        <ConfirmParking_title>無料の条件</ConfirmParking_title>
        <ConfirmParking_row>
          <ConfirmParking_column>
            <ConfirmParking_column_item>
              <ConfirmParking_sub_title>平日</ConfirmParking_sub_title>
              <ConfirmParking_sub_table>
                {existRequirementsWeekdayData.requirement_frees && existRequirementsWeekdayData.requirement_frees.map((requirement, i) => {
                  return <ReturnFree key={i} />
                })}
                {existRequirementsWeekdayData.requirement_buys && existRequirementsWeekdayData.requirement_buys.map((requirement, i) => {
                  return <ReturnBuy key={i} requirement={requirement} />
                })}
                {existRequirementsWeekdayData.requirement_facilities && existRequirementsWeekdayData.requirement_facilities.map((requirement, i) => {
                  return <ReturnFacility key={i} requirement={requirement} />
                })}
                {existRequirementsWeekdayData.requirement_times && existRequirementsWeekdayData.requirement_times.map((requirement, i) => {
                  return <ReturnTime key={i} requirement={requirement} />
                })}
              </ConfirmParking_sub_table>
            </ConfirmParking_column_item>
            <ConfirmParking_column_item>
              <ConfirmParking_sub_title>全日</ConfirmParking_sub_title>
              <ConfirmParking_sub_table>
                {existRequirementsHolidayData.requirement_frees && existRequirementsHolidayData.requirement_frees.map((requirement, i) => {
                  return <ReturnFree key={i} />
                })}
                {existRequirementsHolidayData.requirement_buys && existRequirementsHolidayData.requirement_buys.map((requirement, i) => {
                  return <ReturnBuy key={i} requirement={requirement} />
                })}
                {existRequirementsHolidayData.requirement_facilities && existRequirementsHolidayData.requirement_facilities.map((requirement, i) => {
                  return <ReturnFacility key={i} requirement={requirement} />
                })}
                {existRequirementsHolidayData.requirement_times && existRequirementsHolidayData.requirement_times.map((requirement, i) => {
                  return <ReturnTime key={i} requirement={requirement} />
                })}
              </ConfirmParking_sub_table>
            </ConfirmParking_column_item>
          </ConfirmParking_column>
        </ConfirmParking_row>
        <ConfirmParking_row>
          <ConfirmParking_column>
            <ConfirmParking_column_item>
              <ConfirmParking_sub_title>平日</ConfirmParking_sub_title>
              <ConfirmParking_sub_table>
                {updatesData.requirement_free && Object.keys(updatesData.requirement_free).map((data, i) => {
                  const requirement = updatesData.requirement_free[data].requirements
                  const delete_requirement = updatesData.requirement_free[data].delete
                  const change_requirement = updatesData.requirement_free[data].change
                  const display = requirement.only_weekdays
                  if (delete_requirement) {
                    return requirement.only_weekdays && <ReturnFree key={i} delete_requirement={delete_requirement} />
                  } else if (change_requirement) {
                    return <ReturnFree key={i} delete_requirement={display} />
                  } else {
                    return requirement.only_weekdays && <ReturnFree key={i} />
                  }
                })}
                {updatesData.requirement_buy && Object.keys(updatesData.requirement_buy).map((data, i) => {
                  const requirement = updatesData.requirement_buy[data].requirements
                  const delete_requirement = updatesData.requirement_buy[data].delete
                  return requirement.only_weekdays && <ReturnBuy key={i} requirement={requirement} delete_requirement={delete_requirement} />
                })}
                {updatesData.requirement_facility && Object.keys(updatesData.requirement_facility).map((data, i) => {
                  const requirement = updatesData.requirement_facility[data].requirements
                  const delete_requirement = updatesData.requirement_facility[data].delete
                  return requirement.only_weekdays && <ReturnFacility key={i} requirement={requirement} delete_requirement={delete_requirement} />
                })}
                {updatesData.requirement_time && Object.keys(updatesData.requirement_time).map((data, i) => {
                  const requirement = updatesData.requirement_time[data].requirements
                  const delete_requirement = updatesData.requirement_time[data].delete
                  return requirement.only_weekdays && <ReturnTime key={i} requirement={requirement} delete_requirement={delete_requirement} />
                })}
              </ConfirmParking_sub_table>
            </ConfirmParking_column_item>
            <ConfirmParking_column_item>
              <ConfirmParking_sub_title>全日</ConfirmParking_sub_title>
              <ConfirmParking_sub_table>
                {updatesData.requirement_free && Object.keys(updatesData.requirement_free).map((data, i) => {
                  const requirement = updatesData.requirement_free[data].requirements
                  const delete_requirement = updatesData.requirement_free[data].delete
                  const change_requirement = updatesData.requirement_free[data].change
                  const display = !requirement.only_weekdays
                  if (delete_requirement) {
                    return requirement.only_weekdays || <ReturnFree key={i} delete_requirement={delete_requirement} />
                  } else if (change_requirement) {
                    return <ReturnFree key={i} delete_requirement={display} />
                  } else {
                    return requirement.only_weekdays || <ReturnFree key={i} />
                  }
                })}
                {updatesData.requirement_buy && Object.keys(updatesData.requirement_buy).map((data, i) => {
                  const requirement = updatesData.requirement_buy[data].requirements
                  const delete_requirement = updatesData.requirement_buy[data].delete
                  return requirement.only_weekdays || <ReturnBuy key={i} requirement={requirement} delete_requirement={delete_requirement} />
                })}
                {updatesData.requirement_facility && Object.keys(updatesData.requirement_facility).map((data, i) => {
                  const requirement = updatesData.requirement_facility[data].requirements
                  const delete_requirement = updatesData.requirement_facility[data].delete
                  return requirement.only_weekdays || <ReturnFacility key={i} requirement={requirement} delete_requirement={delete_requirement} />
                })}
                {updatesData.requirement_time && Object.keys(updatesData.requirement_time).map((data, i) => {
                  const requirement = updatesData.requirement_time[data].requirements
                  const delete_requirement = updatesData.requirement_time[data].delete
                  return requirement.only_weekdays || <ReturnTime key={i} requirement={requirement} delete_requirement={delete_requirement} />
                })}
              </ConfirmParking_sub_table>
            </ConfirmParking_column_item>
          </ConfirmParking_column>
        </ConfirmParking_row>
      </ConfirmParking_item>
    </ul>
  );
};

const ConfirmParking_item = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 0;
`;

const ConfirmParking_title = styled.p`
  width: 10%;
`;

const ConfirmParking_row = styled.ul`
  width: 40%;
`;

const ConfirmParking_column = styled.ul`
  display: flex;
  flex-direction: column;
`;

const ConfirmParking_column_item = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ConfirmParking_sub_title = styled.p`
  width: 10%;
`;

const ConfirmParking_sub_table = styled.ul`
  width: 85%;
`;

const ConfirmParking_sub_item = styled.li`
  margin-bottom: 5px;
`;

const ConfirmParking_sub_item_text = styled.p`
  ${ props => props.delete_requirement && "text-decoration-line: line-through; text-decoration-style: solid; color: gray;" }
`;

export default EditParkingDetailConfirmRequirements;
