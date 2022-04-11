import React, { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FlashMessageContext from "../../providers/FlashMessageProvider";

const RequirementBuyItem = (props) => {
  const {
    requirementBuyData
  } = props;

  const navigate = useNavigate();
  const bookFlashMessage = useContext(FlashMessageContext);

  const [parkingData, setParkingData] = useState({});

  useEffect(() => {
    axios.get('/dokotomeyo/details', { params: { parkingID: requirementBuyData.parking_id } })
    .then((response) => {
      setParkingData(response.data.parking);
    })
    .catch(() => {
      bookFlashMessage("通信に失敗しました");
      navigate("/dokotomeyo");
    })
  }, [requirementBuyData])

  return (
    <SRequirementBuyItem_container>
      <SRequirementBuyItem_contents>
        <p>{parkingData.name}</p>
        <p>{requirementBuyData.facility_name}</p>
        <p>{requirementBuyData.purchase_price}</p>
        <p>{requirementBuyData.free_time}</p>
        <p>{requirementBuyData.only_weekdays ? "平日のみ" : "全日"}終日無料</p>
      </SRequirementBuyItem_contents>
      <SUserItem_edit>
        <p>編集</p>
      </SUserItem_edit>
      <SUserItem_edit>
        <p>削除</p>
      </SUserItem_edit>
    </SRequirementBuyItem_container>
  );
};

const SRequirementBuyItem_container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SRequirementBuyItem_contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const SRequirementBuyItem_edit = styled.div`
  display: flex;
  flex-direction: row;
  width: 5%;
  font-size: 14px;
  color: gray;
  cursor: pointer;
`;

export default RequirementBuyItem;
