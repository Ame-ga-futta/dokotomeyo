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
        <p>{parkingData.name}</p>
        <p>{requirementFacilityData.facility_name}</p>
        <p>{requirementFacilityData.free_time}</p>
        <p>{requirementFacilityData.only_weekdays ? "平日のみ" : "全日"}終日無料</p>
      </SRequirementFacilityItem_contents>
      <SUserItem_edit>
        <p>編集</p>
      </SUserItem_edit>
      <SUserItem_edit>
        <p>削除</p>
      </SUserItem_edit>
    </SRequirementFacilityItem_container>
  );
};

const SRequirementFacilityItem_container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

export default RequirementFacilityItem;
