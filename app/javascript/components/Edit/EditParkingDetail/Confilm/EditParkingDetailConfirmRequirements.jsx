import React from "react";
import styled from 'styled-components';
import ReturnFree from "../ReturnRequirements/ReturnFree";
import ReturnBuy from "../ReturnRequirements/ReturnBuy";
import ReturnFacility from "../ReturnRequirements/ReturnFacility";
import ReturnTime from "../ReturnRequirements/ReturnTime";
import ExistRequirements from "./ExistRequirements";
import UpdateRequirementsWeekday from "./UpdateRequirementsWeekday";
import UpdateRequirementsHoliday from "./UpdateRequirementsHoliday";

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
              <ExistRequirements existRequirements={existRequirementsWeekdayData} />
            </ConfirmParking_column_item>
            <ConfirmParking_column_item>
              <ConfirmParking_sub_title>全日</ConfirmParking_sub_title>
              <ExistRequirements existRequirements={existRequirementsHolidayData} />
            </ConfirmParking_column_item>
          </ConfirmParking_column>
        </ConfirmParking_row>
        <ConfirmParking_row>
          <ConfirmParking_column>
            <ConfirmParking_column_item>
              <ConfirmParking_sub_title>平日</ConfirmParking_sub_title>
              <UpdateRequirementsWeekday updateRequirements={updatesData} />
            </ConfirmParking_column_item>
            <ConfirmParking_column_item>
              <ConfirmParking_sub_title>全日</ConfirmParking_sub_title>
              <UpdateRequirementsHoliday updateRequirements={updatesData} />
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

export default EditParkingDetailConfirmRequirements;
