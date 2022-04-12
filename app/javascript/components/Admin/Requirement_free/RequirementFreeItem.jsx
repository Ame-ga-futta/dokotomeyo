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

  const SendParking = () => {
    navigate(`/dokotomeyo/parking/${requirementFreeData.parking_id}`)
  }

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
      <SRequirementFreeItem_contents onClick={SendParking}>
        <SRequirementFreeItem_name>{parkingData.name}</SRequirementFreeItem_name>
        <SRequirementFreeItem_text>{requirementFreeData.only_weekdays ? "平日のみ" : "全日"} 終日無料</SRequirementFreeItem_text>
      </SRequirementFreeItem_contents>
      <SRequirementFreeItem_edit>
        <SRequirementFreeItem_edit_text>削除</SRequirementFreeItem_edit_text>
      </SRequirementFreeItem_edit>
    </SRequirementFreeItem_container>
  );
};

const SRequirementFreeItem_container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SRequirementFreeItem_contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  &:hover {
    background-color: rgb(205, 205, 205);
  }
`;

const SRequirementFreeItem_edit = styled.div`
  display: flex;
  flex-direction: row;
  width: 10%;
  font-size: 14px;
  color: gray;
  cursor: pointer;
`;

const SRequirementFreeItem_edit_text = styled.p`
  margin: auto;
`;

const SRequirementFreeItem_name = styled.p`
  font-size: 18px;
  margin-bottom: 4px;
`;

const SRequirementFreeItem_text = styled.p`
  font-size: 14px;
`;

export default RequirementFreeItem;
