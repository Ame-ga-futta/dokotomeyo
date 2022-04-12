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

  const sendParking = () => {
    navigate(`/dokotomeyo/parking/${requirementBuyData.parking_id}`)
  }

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
      <SRequirementBuyItem_contents onClick={sendParking}>
        <SRequirementBuyItem_name>{parkingData.name}</SRequirementBuyItem_name>
        <SRequirementBuyItem_text>
          {requirementBuyData.facility_name}での購入金額が
          {requirementBuyData.purchase_price}円以上で
          {Number(requirementBuyData.free_time.split(':')[0])}時間
          {Number(requirementBuyData.free_time.split(':')[1])}分無料
        </SRequirementBuyItem_text>
        <SRequirementBuyItem_text>{requirementBuyData.only_weekdays ? "平日のみ" : "全日"} 終日無料</SRequirementBuyItem_text>
      </SRequirementBuyItem_contents>
      <SRequirementBuyItem_edit>
        <SRequirementBuyItem_edit_text>削除</SRequirementBuyItem_edit_text>
      </SRequirementBuyItem_edit>
    </SRequirementBuyItem_container>
  );
};

const SRequirementBuyItem_container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SRequirementBuyItem_contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  &:hover {
    background-color: rgb(205, 205, 205);
  }
`;

const SRequirementBuyItem_edit = styled.div`
  display: flex;
  flex-direction: row;
  width: 10%;
  font-size: 14px;
  color: gray;
  cursor: pointer;
`;

const SRequirementBuyItem_edit_text = styled.p`
  margin: auto;
`;

const SRequirementBuyItem_name = styled.p`
  font-size: 18px;
  margin-bottom: 4px;
`;

const SRequirementBuyItem_text = styled.p`
  font-size: 14px;
`;

export default RequirementBuyItem;
