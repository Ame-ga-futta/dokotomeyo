import React, { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FlashMessageContext from "../../providers/FlashMessageProvider";

const RequirementFreeItem = (props) => {
  const {
    requirementFreeData
  } = props;

  const navigate = useNavigate();
  const bookFlashMessage = useContext(FlashMessageContext);

  const [parkingData, setParkingData] = useState({});

  useEffect(() => {
    axios.get('/dokotomeyo/details', { params: { parkingID: requirementFreeData.parking_id } })
    .then((response) => {
      setParkingData(response.data.parking);
    })
    .catch(() => {
      bookFlashMessage("通信に失敗しました");
      navigate("/dokotomeyo");
    })
  }, [requirementFreeData])

  return (
    <SRequirementFreeItem_container>
      <SRequirementFreeItem_contents>
        <p>{parkingData.name}</p>
        <p>{requirementFreeData.only_weekdays ? "平日のみ" : "全日"}終日無料</p>
      </SRequirementFreeItem_contents>
      <SUserItem_edit>
        <p>編集</p>
      </SUserItem_edit>
      <SUserItem_edit>
        <p>削除</p>
      </SUserItem_edit>
    </SRequirementFreeItem_container>
  );
};

const SRequirementFreeItem_container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SRequirementFreeItem_contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const SRequirementFreeItem_edit = styled.div`
  display: flex;
  flex-direction: row;
  width: 5%;
  font-size: 14px;
  color: gray;
  cursor: pointer;
`;

export default RequirementFreeItem;
