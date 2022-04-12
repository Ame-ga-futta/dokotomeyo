import React, { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FlashMessageContext from "../../providers/FlashMessageProvider";

const RequirementTimeItem = (props) => {
  const {
    requirementTimeData
  } = props;

  const navigate = useNavigate();
  const bookFlashMessage = useContext(FlashMessageContext);

  const [parkingData, setParkingData] = useState({});

  const sendParking = () => {
    navigate(`/dokotomeyo/parking/${requirementTimeData.parking_id}`)
  }

  useEffect(() => {
    axios.get('/dokotomeyo/details', { params: { parkingID: requirementTimeData.parking_id } })
    .then((response) => {
      setParkingData(response.data.parking);
    })
    .catch(() => {
      bookFlashMessage("通信に失敗しました");
      navigate("/dokotomeyo");
    })
  }, [requirementTimeData])

  return (
    <SRequirementTimeItem_container>
      <SRequirementTimeItem_contents onClick={sendParking}>
        <SRequirementTimeItem_name>{parkingData.name}</SRequirementTimeItem_name>
        <SRequirementTimeItem_text>
          入庫後{Number(requirementTimeData.free_time.split(':')[0])}時間{Number(requirementTimeData.free_time.split(':')[1])}分無料
        </SRequirementTimeItem_text>
        <SRequirementTimeItem_text>{requirementTimeData.only_weekdays ? "平日のみ" : "全日"} 終日無料</SRequirementTimeItem_text>
      </SRequirementTimeItem_contents>
      <SRequirementTimeItem_edit>
        <SRequirementTimeItem_edit_text>削除</SRequirementTimeItem_edit_text>
      </SRequirementTimeItem_edit>
    </SRequirementTimeItem_container>
  );
};

const SRequirementTimeItem_container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SRequirementTimeItem_contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  &:hover {
    background-color: rgb(205, 205, 205);
  }
`;

const SRequirementTimeItem_edit = styled.div`
  display: flex;
  flex-direction: row;
  width: 10%;
  font-size: 14px;
  color: gray;
  cursor: pointer;
`;

const SRequirementTimeItem_edit_text = styled.p`
  margin: auto;
`;

const SRequirementTimeItem_name = styled.p`
  font-size: 18px;
  margin-bottom: 4px;
`;

const SRequirementTimeItem_text = styled.p`
  font-size: 14px;
`;

export default RequirementTimeItem;
