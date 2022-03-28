import React from "react";
import styled from 'styled-components';

const ParkingRequirementsWeekday = (props) => {
  const {
    requirementsWeekdayData
  } = props;

  return (
    <STop_ParkingRequirementsWeekday_container>
      <STop_ParkingDetail_requirements_heading>平日</STop_ParkingDetail_requirements_heading>
      <STop_ParkingDetail_requirements_list>
        {requirementsWeekdayData.requirement_frees && requirementsWeekdayData.requirement_frees.map((requirement, i) => {
          return (
            <li key={i}>
              <p>終日無料</p>
            </li>
          )
        })}
        {requirementsWeekdayData.requirement_buys && requirementsWeekdayData.requirement_buys.map((requirement, i) => {
          return (
            <li key={i}>
              <p>{requirement.facility_name}での購入金額が{requirement.purchase_price}円以上で{Number(requirement.free_time.split(':')[0])}時間{Number(requirement.free_time.split(':')[1])}分無料</p>
            </li>
          )
        })}
        {requirementsWeekdayData.requirement_facilities && requirementsWeekdayData.requirement_facilities.map((requirement, i) => {
          return (
            <li key={i}>
              <p>{requirement.facility_name}の利用で{Number(requirement.free_time.split(':')[0])}時間{Number(requirement.free_time.split(':')[1])}分無料</p>
            </li>
          )
        })}
        {requirementsWeekdayData.requirement_times && requirementsWeekdayData.requirement_times.map((requirement, i) => {
          return (
            <li key={i}>
              <p>入庫後{Number(requirement.free_time.split(':')[0])}時間{Number(requirement.free_time.split(':')[1])}分無料</p>
            </li>
          )
        })}
      </STop_ParkingDetail_requirements_list>
    </STop_ParkingRequirementsWeekday_container>
  );
};

const STop_ParkingRequirementsWeekday_container = styled.div`
  display: flex;
  flex-direction: row;
`;

const STop_ParkingDetail_requirements_heading = styled.p`
  width: 10%;
  padding-bottom: 10px;
`;

const STop_ParkingDetail_requirements_list = styled.ul`
  width: 90%;
  padding-bottom: 10px;
`;

export default ParkingRequirementsWeekday;
