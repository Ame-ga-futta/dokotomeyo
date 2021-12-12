import React from "react";
import styled from 'styled-components';

const PostLeft = (props) => {
  const {
    address,
    name,
    setName,
    latitude,
    longitude,
    beginning_of_worktime,
    setBeginning_of_worktime,
    end_of_worktime,
    setEnd_of_worktime,
    setOpenConfirm,
    errors,
    setMapCenter
  } = props;

  const Confilm = (event) => {
    setOpenConfirm(true);
    setMapCenter({ lat: latitude, lng: longitude });
    event.preventDefault();
  }

  return (
    <SPost_container_left>
      <SPost_title_container>
        <SPost_title>駐車場情報投稿</SPost_title>
        <SError_container>
          {errors && errors.map((error, i) => {
            return (
              <li key={i}><SError>{error}</SError></li>
            );
          })}
        </SError_container>
      </SPost_title_container>
      <SPost_form_container onSubmit={Confilm}>
        <SPost_form_box>
          <li>
            <SText_label>住所</SText_label>
            <SText_address>{address}</SText_address>
          </li>
          <li>
            <SPost_container_notice>
              画面右の地図をクリックするか、地図上部の検索ボックスで<br />場所を入力すると、住所が入力されます。
            </SPost_container_notice>
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
        </SPost_form_box>
        <SPost_form_text>
          なるべく正確な情報を入力してください。
        </SPost_form_text>
        <SPost_form_text>
          dokotomeyoは、無料で使用できる駐車場の情報を共有・検索できるサービスです。登録する駐車場は無料で使える場所だけにしてください。
        </SPost_form_text>
      </SPost_form_container>
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

const SPost_form_container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SPost_form_box = styled.ul`
  background-color: rgb(235, 235, 235);
  border-radius: 15px;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 30px;
  margin-bottom: 15px;
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

const SText_address = styled.p`
  width: 70%;
  padding: 10px;
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
  background-color: rgb(75, 189, 255);
  color: white;
  border-radius: 4px;
  margin: 10px;
  margin-left: auto;
  padding: 11px 20px;
  text-align: center;
`;

const SPost_container_notice = styled.p`
  color: gray;
  font-size: 14px;
  text-align: left;
  margin: 0 0 0 auto;
`;

const SPost_form_text = styled.p`
  width: 80%;
  color: gray;
  font-size: 14px;
  margin: 4px;
  text-align: left;
`;

export default PostLeft;
