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
  const [openEdit, setOpenEdit] = useState(false);

  const DeleteItem = () => {

  }

  const SendParking = () => {
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
    <>
      <SRequirementTimeItem_list>
        <SRequirementTimeItem_contents onClick={SendParking}>
          <SRequirementTimeItem_name>{parkingData.name}</SRequirementTimeItem_name>
          <SRequirementTimeItem_text>
            入庫後{Number(requirementTimeData.free_time.split(':')[0])}時間{Number(requirementTimeData.free_time.split(':')[1])}分無料
          </SRequirementTimeItem_text>
          <SRequirementTimeItem_text>{requirementTimeData.only_weekdays ? "平日のみ" : "全日"} 終日無料</SRequirementTimeItem_text>
        </SRequirementTimeItem_contents>
        <SRequirementTimeItem_edit>
          <SRequirementTimeItem_edit_text onClick={() => setOpenEdit(!openEdit)}>{openEdit ? "閉じる" : "削除"}</SRequirementTimeItem_edit_text>
        </SRequirementTimeItem_edit>
      </SRequirementTimeItem_list>
      {openEdit &&
        <SRequirementTimeItem_Delete>
          <SRequirementTimeItem_Delete_text>本当に削除しますか？</SRequirementTimeItem_Delete_text>
          <SRequirementTimeItem_Delete_button onClick={DeleteItem}>削除</SRequirementTimeItem_Delete_button>
        </SRequirementTimeItem_Delete>
      }
    </>
  );
};

const SRequirementTimeItem_list = styled.div`
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

const SRequirementTimeItem_Delete = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0;
`;

const SRequirementTimeItem_Delete_text = styled.p`
  width: 90%;
  color: red;
  text-align: end;
`;

const SRequirementTimeItem_Delete_button = styled.p`
  width: 10%;
  font-size: 14px;
  color: gray;
  cursor: pointer;
  text-align: center;
`;

export default RequirementTimeItem;
