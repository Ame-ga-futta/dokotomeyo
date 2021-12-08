import React, { useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostLeft = (props) => {
  const { bookFlashMessage } = props;

  const [address, setAddress] = useState();
  const [name, setName] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [beginning_of_worktime, setBeginning_of_worktime] = useState();
  const [end_of_worktime, setEnd_of_worktime] = useState();
  const [errors, setErrors] = useState();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    axios.post('/dokotomeyo/post', { parking: { name: name, address: address, latitude: latitude, longitude: longitude, beginning_of_worktime: beginning_of_worktime, end_of_worktime: end_of_worktime} })
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
      console.log("通信に失敗しました");
    })
    event.preventDefault();
  };

  return (
    <SPost_container_left>
      <SPost_title_container>
        <SPost_title>駐車場情報投稿</SPost_title>
        <SError_container>
          {errors && <SError>{errors}</SError>}
        </SError_container>
      </SPost_title_container>
      <form onSubmit={handleSubmit}>
        <SPost_form_container>
          <li>
            <SText_label>住所</SText_label>
            <SText_field
              type="text"
              name="address"
              value={address}
              onChange={event => setAddress(event.target.value)}
            />
          </li>
          <li>
            <SText_label>駐車場名</SText_label>
            <SText_field
              type="text"
              name="name"
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </li>
          <li>
            <SText_label>営業時間</SText_label>
            <STime_field_container>
              <STime_field
                type="time"
                name="beginning_of_worktime"
                value={beginning_of_worktime}
                onChange={event => setBeginning_of_worktime(event.target.value)}
              />
              <p>〜</p>
              <STime_field
                type="time"
                name="end_of_worktime"
                value={end_of_worktime}
                onChange={event => setEnd_of_worktime(event.target.value)}
              />
            </STime_field_container>
          </li>
          <SText_submit>登録</SText_submit>
        </SPost_form_container>
      </form>
    </SPost_container_left>
  );
};

const SPost_container_left = styled.div`
  width: 60%;
  background-color: rgb(255,255,255);
`;

const SPost_title_container = styled.div`
  text-align: center;
  padding: 30px;
`;

const SPost_title = styled.div`
  font-size: 25px;
  padding: 5px;
`;

const SError_container = styled.ul`
  font-size: 20px;
  color: red;
`;

const SError = styled.p`
  padding: 4px;
`;

const SPost_form_container = styled.ul`
  background-color: rgb(235, 235, 235);
  border-radius: 15px;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  padding: 30px;
  li {
    margin: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const SText_label = styled.label`
  width: 30%;
  border-radius: 3px;
`;

const SText_field = styled.input`
  width: 70%;
  border: solid 1px gray;
  border-radius: 5px;
  padding: 10px;
`;

const STime_field_container = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const STime_field = styled.input`
  width: 45%;
  border: solid 1px gray;
  border-radius: 5px;
  padding: 10px;
`;

const SText_submit = styled.button`
  width: 20%;
  background-color: rgba(75, 189, 255, 0.9);
  color: white;
  border-radius: 4px;
  margin: 10px;
  margin-left: auto;
  padding: 11px 20px;
  text-align: center;
`;

export default PostLeft;
