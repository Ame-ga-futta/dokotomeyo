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
  const [openEdit, setOpenEdit] = useState(false);

  const DeleteItem = () => {
    axios.delete('/dokotomeyo/admin_requirementFree', {
      params: { ID: requirementFreeData.id }
    })
    .then(() => {
      window.location.reload();
    })
    .catch(() => {
      bookFlashMessage("削除に失敗しました");
    })
  }

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
    <>
      <SRequirementFreeItem_list>
        <SRequirementFreeItem_contents onClick={SendParking}>
          <SRequirementFreeItem_name>{parkingData.name}</SRequirementFreeItem_name>
          <SRequirementFreeItem_text>{requirementFreeData.only_weekdays ? "平日のみ" : "全日"} 終日無料</SRequirementFreeItem_text>
        </SRequirementFreeItem_contents>
        <SRequirementFreeItem_edit>
          <SRequirementFreeItem_edit_text onClick={() => setOpenEdit(!openEdit)}>{openEdit ? "閉じる" : "削除"}</SRequirementFreeItem_edit_text>
        </SRequirementFreeItem_edit>
      </SRequirementFreeItem_list>
      {openEdit &&
        <SRequirementFreeItem_Delete>
          <SRequirementFreeItem_Delete_text>本当に削除しますか？</SRequirementFreeItem_Delete_text>
          <SRequirementFreeItem_Delete_button onClick={DeleteItem}>削除</SRequirementFreeItem_Delete_button>
        </SRequirementFreeItem_Delete>
      }
    </>
  );
};

const SRequirementFreeItem_list = styled.div`
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

const SRequirementFreeItem_Delete = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0;
`;

const SRequirementFreeItem_Delete_text = styled.p`
  width: 90%;
  color: red;
  text-align: end;
`;

const SRequirementFreeItem_Delete_button = styled.p`
  width: 10%;
  font-size: 14px;
  color: gray;
  cursor: pointer;
  text-align: center;
`;

export default RequirementFreeItem;
