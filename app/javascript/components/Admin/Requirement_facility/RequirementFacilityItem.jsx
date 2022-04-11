import React, { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FlashMessageContext from "../../providers/FlashMessageProvider";

const RequirementFacilityItem = (props) => {
  const {
    requirementFacilityData
  } = props;

  const navigate = useNavigate();
  const bookFlashMessage = useContext(FlashMessageContext);

  const [parkingData, setParkingData] = useState({});

  useEffect(() => {
    axios.get('/dokotomeyo/details', { params: { parkingID: requirementFacilityData.parking_id } })
    .then((response) => {
      setParkingData(response.data.parking);
    })
    .catch(() => {
      bookFlashMessage("通信に失敗しました");
      navigate("/dokotomeyo");
    })
  }, [requirementFacilityData])

  return (
    <SRequirementFacilityItem_container>
      <SRequirementFacilityItem_contents>
        <SRequirementFacilityItem_name>{parkingData.name}</SRequirementFacilityItem_name>
        <SRequirementFacilityItem_text>
          {requirementFacilityData.facility_name}の利用で
          {Number(requirementFacilityData.free_time.split(':')[0])}時間
          {Number(requirementFacilityData.free_time.split(':')[1])}分無料
        </SRequirementFacilityItem_text>
        <SRequirementFacilityItem_text>{requirementFacilityData.only_weekdays ? "平日のみ" : "全日"} 終日無料</SRequirementFacilityItem_text>
      </SRequirementFacilityItem_contents>
      <SRequirementFacilityItem_edit>
        <p>削除</p>
      </SRequirementFacilityItem_edit>
    </SRequirementFacilityItem_container>
  );
};

const SRequirementFacilityItem_container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SRequirementFacilityItem_contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const SRequirementFacilityItem_edit = styled.div`
  display: flex;
  flex-direction: row;
  width: 5%;
  font-size: 14px;
  color: gray;
  cursor: pointer;
`;

const SRequirementFacilityItem_name = styled.p`
  font-size: 18px;
  margin-bottom: 4px;
`;

const SRequirementFacilityItem_text = styled.p`
  font-size: 14px;
`;

export default RequirementFacilityItem;
