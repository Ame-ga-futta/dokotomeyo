import React from "react";
import styled from 'styled-components';
import ParkingRequirementsWeekday from "../../Top/ParkingRequirementsWeekday";
import ParkingRequirementsHoliday from "../../Top/ParkingRequirementsHoliday";

const AddRequirementDetail = (props) => {
  const {
    parkingData,
    requirementsWeekdayData,
    requirementsHolidayData
  } = props;

  return (
    <SEdit_Detail_table>
      <SEdit_Detail_list_name>
        <SEdit_Detail_name>{parkingData.name}</SEdit_Detail_name>
      </SEdit_Detail_list_name>
      <SEdit_Detail_list_item>
        <SEdit_Detail_header>住所</SEdit_Detail_header>
        <SEdit_Detail_data>{parkingData.address}</SEdit_Detail_data>
      </SEdit_Detail_list_item>
      <SEdit_Detail_list_item>
        <SEdit_Detail_header>営業時間</SEdit_Detail_header>
        <SEdit_Detail_data>{parkingData.beginning_of_worktime} 〜 {parkingData.end_of_worktime}</SEdit_Detail_data>
      </SEdit_Detail_list_item>
      <SEdit_Detail_list_item>
        <SEdit_Detail_header>無料の条件</SEdit_Detail_header>
        <SEdit_Detail_requirements>
          <ParkingRequirementsWeekday requirementsWeekdayData={requirementsWeekdayData} />
          <ParkingRequirementsHoliday requirementsHolidayData={requirementsHolidayData} />
        </SEdit_Detail_requirements>
      </SEdit_Detail_list_item>
    </SEdit_Detail_table>
  );
};

const SEdit_Detail_list_name = styled.li`
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  background-color: #eeeeee;
`;

const SEdit_Detail_list_item = styled.li`
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
`;

const SEdit_Detail_name = styled.h4`
  font-weight: bold;
`;

const SEdit_Detail_header = styled.p`
  width: 20%;
`;

const SEdit_Detail_data = styled.p`
  width: 80%;
`;

const SEdit_Detail_requirements = styled.div`
  width: 80%;
`;

const SEdit_Detail_table = styled.ul`
  max-height: 50%;
  overflow-y: scroll;
`;

export default AddRequirementDetail;
