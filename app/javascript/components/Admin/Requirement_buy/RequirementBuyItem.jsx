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
  const [openEdit, setOpenEdit] = useState(false);

  const DeleteItem = () => {
    axios.delete('/dokotomeyo/admin_requirementBuy', {
      params: { ID: requirementBuyData.id }
    })
    .then(() => {
      window.location.reload();
    })
    .catch(() => {
      bookFlashMessage("削除に失敗しました");
    })
  }

  const SendParking = () => {
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
    <>
      <SRequirementBuyItem_list>
        <SRequirementBuyItem_contents onClick={SendParking}>
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
          <SRequirementBuyItem_edit_text onClick={() => setOpenEdit(!openEdit)}>{openEdit ? "閉じる" : "削除"}</SRequirementBuyItem_edit_text>
        </SRequirementBuyItem_edit>
      </SRequirementBuyItem_list>
      {openEdit &&
        <SRequirementBuyItem_Delete>
          <SRequirementBuyItem_Delete_text>本当に削除しますか？</SRequirementBuyItem_Delete_text>
          <SRequirementBuyItem_Delete_button onClick={DeleteItem}>削除</SRequirementBuyItem_Delete_button>
        </SRequirementBuyItem_Delete>
      }
    </>
  );
};

const SRequirementBuyItem_list = styled.div`
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

const SRequirementBuyItem_Delete = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0;
`;

const SRequirementBuyItem_Delete_text = styled.p`
  width: 90%;
  color: red;
  text-align: end;
`;

const SRequirementBuyItem_Delete_button = styled.p`
  width: 10%;
  font-size: 14px;
  color: gray;
  cursor: pointer;
  text-align: center;
`;

export default RequirementBuyItem;
