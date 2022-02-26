import React from "react";
import styled from 'styled-components';
import axios from 'axios';

const AddRequirementConfirm = (props) => {
  const {
    openconfirm,
    setOpenConfirm,
    type,
    parkingID,
    addRequirement,
    setErrors
  } = props;

  const fix = () => {
    setOpenConfirm(false);
  };

  const register = () => {
    axios.post('/dokotomeyo/add_create', {
      add_requirement: {
        requirement_type: type,
        parkingID: parkingID,
        requirement: addRequirement
      }
    })
    .then((response) => {
      switch (response.data.status){
        case 200:
          window.location.reload();
          break;
        case 400:
          setErrors(response.data.message)
          break;
      }
    })
    .catch(() => {
      setErrors("通信に失敗しました 最初からやり直してください");
    })
    setOpenConfirm(false);
  };

  const FormatSentence = () => {
    switch (type){
      case "free":
        return (
          <li>
            <SAddRequirement_contents_title>無料の条件</SAddRequirement_contents_title>
            <SAddRequirement_contents_text>終日無料</SAddRequirement_contents_text>
          </li>
        );
      case "time":
        return (
          <li>
            <SAddRequirement_contents_title>無料の条件</SAddRequirement_contents_title>
            <SAddRequirement_contents_text>
              入庫後{Number(addRequirement.free_time.split(':')[0])}時間{Number(addRequirement.free_time.split(':')[1])}分無料
            </SAddRequirement_contents_text>
          </li>
        );
      case "buy":
        return (
          <li>
            <SAddRequirement_contents_title>無料の条件</SAddRequirement_contents_title>
            <SAddRequirement_contents_text>
              {addRequirement.facility_name}での購入金額が<br />
              {addRequirement.purchase_price}円以上で<br />
              {Number(addRequirement.free_time.split(':')[0])}時間{Number(addRequirement.free_time.split(':')[1])}分無料
            </SAddRequirement_contents_text>
          </li>
        );
      case "facility":
        return (
          <li>
            <SAddRequirement_contents_title>無料の条件</SAddRequirement_contents_title>
            <SAddRequirement_contents_text>
              {addRequirement.facility_name}の利用で<br />
              {Number(addRequirement.free_time.split(':')[0])}時間{Number(addRequirement.free_time.split(':')[1])}分無料
            </SAddRequirement_contents_text>
          </li>
        );
    }
  };

  return (
    <SAddConfirm_wrapper openconfirm={openconfirm}>
      <SAddConfirm_box>
        <SAddConfirm_title>以下の入力内容でよろしいですか？</SAddConfirm_title>
        <SAddConfirm_contents_list>
          {FormatSentence()}
          <li>
            <p>{addRequirement.only_weekdays ? "平日のみ適用" : "土日祝も適用"}</p>
          </li>
        </SAddConfirm_contents_list>
        <SAddConfirm_buttons>
          <SAddConfirm_button onClick={fix}>
            修正
          </SAddConfirm_button>
          <SAddConfirm_button onClick={register}>
            登録
          </SAddConfirm_button>
        </SAddConfirm_buttons>
      </SAddConfirm_box>
    </SAddConfirm_wrapper>
  );
};

const SAddConfirm_wrapper = styled.div`
  position: fixed;
  z-index : 99998;
  top  : 80px;
  right : 100%;
  width: 100%;
  height: calc(100vh - 80px );
  background-color: rgba(24, 24, 24, 0.7);
  transition : 0.3s ease-in-out;
  transform: translateX(${ props => props.openconfirm ? "100%" : "0%" });
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SAddConfirm_box = styled.div`
  width: 80%;
  max-height: 75%;
  padding: 20px 40px;
  background-color: rgb(235, 235, 235);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const SAddConfirm_title = styled.p`
  max-height: 10%;
  font-size: 30px;
  padding: 25px 0 5px 0;
  text-align: center;
`;

const SAddConfirm_contents_list = styled.ul`
  max-height: 80%;
  overflow-y: scroll;
  display: flex;
  align-items: start;
  justify-content: space-between;
  flex-direction: column;
  margin: 20px;
  li {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 10px 0;
  }
  li:last-child {
    margin-left: 30%;
    font-size: 18px;
  }
`;

const SAddRequirement_contents_title = styled.p`
  width: 30%;
`;

const SAddRequirement_contents_text = styled.p`
  width: 70%;
  font-size: 18px;
`;

const SAddConfirm_buttons = styled.div`
  max-height: 10%;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-direction: row;
  margin: 15px;
`;

const SAddConfirm_button = styled.button`
  width: 20%;
  font-size: 20px;
  text-align: center;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  &:first-child {
    color: black;
    background-color: rgb(218, 218, 218);
  }
  &:last-child {
    color: white;
    background-color: rgb(75, 189, 255);
  }
`;

export default AddRequirementConfirm;
