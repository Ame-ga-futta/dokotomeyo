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
  const [openEdit, setOpenEdit] = useState(false);

  const DeleteItem = () => {
    axios.delete('/dokotomeyo/admin_requirementFacility', {
      params: { ID: requirementFacilityData.id }
    })
    .then((response) => {
      switch (response.data.status) {
        case 200:
          window.location.reload();
          break;
        case 400:
          bookFlashMessage(response.data.message);
          setOpenEdit(false);
          break;
      }
    })
    .catch(() => {
      bookFlashMessage("削除に失敗しました");
    })
  }

  const SendParking = () => {
    navigate(`/dokotomeyo/parking/${requirementFacilityData.parking_id}`)
  }

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
    <>
      <SRequirementFacilityItem_list>
        <SRequirementFacilityItem_contents onClick={SendParking}>
          <SRequirementFacilityItem_name>{parkingData.name}</SRequirementFacilityItem_name>
          <SRequirementFacilityItem_text>
            {requirementFacilityData.facility_name}の利用で
            {Number(requirementFacilityData.free_time.split(':')[0])}時間
            {Number(requirementFacilityData.free_time.split(':')[1])}分無料
          </SRequirementFacilityItem_text>
          <SRequirementFacilityItem_text>{requirementFacilityData.only_weekdays ? "平日のみ" : "全日"} 終日無料</SRequirementFacilityItem_text>
        </SRequirementFacilityItem_contents>
        <SRequirementFacilityItem_edit>
          <SRequirementFacilityItem_edit_text onClick={() => setOpenEdit(!openEdit)}>{openEdit ? "閉じる" : "削除"}</SRequirementFacilityItem_edit_text>
        </SRequirementFacilityItem_edit>
      </SRequirementFacilityItem_list>
      {openEdit &&
        <SRequirementFacilityItem_Delete>
          <SRequirementFacilityItem_Delete_text>本当に削除しますか？</SRequirementFacilityItem_Delete_text>
          <SRequirementFacilityItem_Delete_button onClick={DeleteItem}>削除</SRequirementFacilityItem_Delete_button>
        </SRequirementFacilityItem_Delete>
      }
    </>
  );
};

const SRequirementFacilityItem_list = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SRequirementFacilityItem_contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  &:hover {
    background-color: rgb(205, 205, 205);
  }
`;

const SRequirementFacilityItem_edit = styled.div`
  display: flex;
  flex-direction: row;
  width: 10%;
  font-size: 14px;
  color: gray;
  cursor: pointer;
`;

const SRequirementFacilityItem_edit_text = styled.p`
  margin: auto;
`;

const SRequirementFacilityItem_name = styled.p`
  font-size: 18px;
  margin-bottom: 4px;
`;

const SRequirementFacilityItem_text = styled.p`
  font-size: 14px;
`;

const SRequirementFacilityItem_Delete = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0;
`;

const SRequirementFacilityItem_Delete_text = styled.p`
  width: 90%;
  color: red;
  text-align: end;
`;

const SRequirementFacilityItem_Delete_button = styled.p`
  width: 10%;
  font-size: 14px;
  color: gray;
  cursor: pointer;
  text-align: center;
`;

export default RequirementFacilityItem;
