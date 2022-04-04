import React from "react";
import styled from 'styled-components';

const ReturnFacility = (props) => {
  const {
    requirement,
    delete_requirement
  } = props;

  return (
    <ConfirmParking_sub_item>
      <ConfirmParking_sub_item_text delete_requirement={delete_requirement}>
        {requirement.facility_name}の利用で
        {Number(requirement.free_time.split(':')[0])}時間
        {Number(requirement.free_time.split(':')[1])}分無料
      </ConfirmParking_sub_item_text>
    </ConfirmParking_sub_item>
  );
};

const ConfirmParking_sub_item = styled.li`
  margin-bottom: 5px;
`;

const ConfirmParking_sub_item_text = styled.p`
  ${ props => props.delete_requirement && "text-decoration-line: line-through; text-decoration-style: solid; color: gray;" }
`;

export default ReturnFacility;
