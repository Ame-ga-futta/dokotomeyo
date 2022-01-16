import React from "react";
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostConfirm = (props) => {
  const {
    parking,
    type,
    requirement,
    openconfirm,
    setOpenConfirm,
    setErrors,
    bookFlashMessage
  } = props;

  const navigate = useNavigate();

  const fix = () => {
    setOpenConfirm(false);
  };

  const register = () => {
    axios.post('/dokotomeyo/post', {
      post_parking: {
        requirement_type: type,
        parking: parking,
        requirement: requirement
      }
    })
    .then((response) => {
      switch (response.data.status){
        case 200:
          bookFlashMessage(response.data.message);
          navigate("/dokotomeyo");
          break;
        case 400:
          setErrors(response.data.message);
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
            <SPostConfirm_contents_title>無料の条件</SPostConfirm_contents_title>
            <SPostConfirm_contents_text>終日無料</SPostConfirm_contents_text>
          </li>
        );
      case "time":
        return (
          <li>
            <SPostConfirm_contents_title>無料の条件</SPostConfirm_contents_title>
            <SPostConfirm_contents_text>
              入庫後{Number(requirement.free_time.split(':')[0])}時間{Number(requirement.free_time.split(':')[1])}分無料
            </SPostConfirm_contents_text>
          </li>
        );
      case "buy":
        return (
          <li>
            <SPostConfirm_contents_title>無料の条件</SPostConfirm_contents_title>
            <SPostConfirm_contents_text>
              {requirement.facility_name}での購入金額が<br />
              {requirement.purchase_price}円以上で<br />
              {Number(requirement.free_time.split(':')[0])}時間{Number(requirement.free_time.split(':')[1])}分無料
            </SPostConfirm_contents_text>
          </li>
        );
      case "facility":
        return (
          <li>
            <SPostConfirm_contents_title>無料の条件</SPostConfirm_contents_title>
            <SPostConfirm_contents_text>
              {requirement.facility_name}の利用で<br />
              {Number(requirement.free_time.split(':')[0])}時間{Number(requirement.free_time.split(':')[1])}分無料
            </SPostConfirm_contents_text>
          </li>
        );
    }
  }

  return (
    <SPostConfirm_wrapper openconfirm={openconfirm}>
      <SPostConfirm_box>
        <SPostConfirm_title>以下の入力内容でよろしいですか？</SPostConfirm_title>
        <SPostConfirm_subtitle>※地図クリックで詳細位置を修正できます</SPostConfirm_subtitle>
        <SPostConfirm_contents_list>
          <li>
            <SPostConfirm_contents_title>住所</SPostConfirm_contents_title>
            <SPostConfirm_contents_text>{parking.address}</SPostConfirm_contents_text>
          </li>
          <li>
            <SPostConfirm_contents_title>駐車場名</SPostConfirm_contents_title>
            <SPostConfirm_contents_text>{parking.name}</SPostConfirm_contents_text>
          </li>
          <li>
            <SPostConfirm_contents_title>営業時間</SPostConfirm_contents_title>
            <SPostConfirm_contents_text>
              {parking.beginning_of_worktime}〜{parking.end_of_worktime}
            </SPostConfirm_contents_text>
          </li>
          {FormatSentence()}
          <li>
            <p>{requirement.only_weekdays ? "平日のみ適用" : "土日祝も適用"}</p>
          </li>
        </SPostConfirm_contents_list>
        <SPostConfirm_buttons>
          <SPostConfirm_button onClick={fix}>
            修正
          </SPostConfirm_button>
          <SPostConfirm_button onClick={register}>
            登録
          </SPostConfirm_button>
        </SPostConfirm_buttons>
      </SPostConfirm_box>
    </SPostConfirm_wrapper>
  );
};

const SPostConfirm_wrapper = styled.div`
  position: fixed;
  z-index : 99998;
  top  : 80px;
  left : -60%;
  width: 60%;
  height: calc(100vh - 80px );
  background-color: rgba(24, 24, 24, 0.7);
  transition : 0.3s ease-in-out;
  transform: translateX(${ props => props.openconfirm ? "100%" : "0%" });
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SPostConfirm_box = styled.div`
  width: 80%;
  max-height: 75%;
  padding: 20px 40px;
  background-color: rgb(235, 235, 235);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  overflow-y: scroll;
`;

const SPostConfirm_title = styled.p`
  font-size: 30px;
  padding: 25px 0 5px 0;
  text-align: center;
`;

const SPostConfirm_subtitle = styled.p`
  font-size: 16px;
  padding: 8px;
  text-align: center;
`;

const SPostConfirm_contents_list = styled.ul`
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
    margin-left: 20%;
    font-size: 18px;
  }
`;

const SPostConfirm_contents_title = styled.p`
  width: 20%;
`;

const SPostConfirm_contents_text = styled.p`
  width: 80%;
  font-size: 18px;
`;

const SPostConfirm_buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  flex-direction: row;
  margin: 15px;
`;

const SPostConfirm_button = styled.button`
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

export default PostConfirm;
