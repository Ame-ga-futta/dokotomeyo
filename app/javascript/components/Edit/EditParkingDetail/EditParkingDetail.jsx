import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FormRequirement from "./FormRequirement";

const EditParkingDetail = (props) => {
  const {
    updateParking,
    setUpdateParking,
    setCenter
  } = props;
  const { id } = useParams();

  const [requirementsWeekdayData, setRequirementsWeekdayData] = useState({});
  const [requirementsHolidayData, setRequirementsHolidayData] = useState({});
  const [updatesBuy] = useState({});
  const [updatesFacility] = useState({});
  const [updatesTime] = useState({});
  const [updatesFree] = useState({});
  const [openconfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    axios.post('/dokotomeyo/details', { parkingID: id })
    .then((response) => {
      setUpdateParking(response.data.parking);
      setRequirementsWeekdayData(response.data.requirements_weekdays);
      setRequirementsHolidayData(response.data.requirements_holiday);
      setCenter({
        lat: response.data.parking.latitude,
        lng: response.data.parking.longitude
      })
    })
    .catch(() => {
      console.log("通信に失敗");
    })
  }, []);

  const Confilm = (event) => {
    setOpenConfirm(true)
    const updatesData = {
      parking: updateParking,
      requirement_buy: updatesBuy,
      requirement_facility: updatesFacility,
      requirement_time: updatesTime,
      requirement_free: updatesFree
    }
    console.log(updatesData)
    event.preventDefault();
  };

  return (
    <EditParkingDetail_container>
      <form onSubmit={Confilm}>
        <SFormParkingDetail_list>
          <SFormParkingDetail_item>
            <SText_label>住所</SText_label>
            <SText_address>{updateParking.address}</SText_address>
          </SFormParkingDetail_item>
          <SFormParkingDetail_item>
            <Stext_notice>
              画面右の地図をクリックするか、地図上部の検索ボックスで<br />場所を入力すると、住所が入力されます。
            </Stext_notice>
          </SFormParkingDetail_item>
          <SFormParkingDetail_item>
            <SText_label>駐車場名</SText_label>
            <SText_field
              type="text"
              name="name"
              value={updateParking.name}
              onChange={event => setUpdateParking({...updateParking, name: event.target.value})}
            />
          </SFormParkingDetail_item>
          <SFormParkingDetail_item>
            <SText_label>営業時間</SText_label>
            <STime_field_container>
              <STime_field
                type="time"
                name="beginning_of_worktime"
                value={updateParking.beginning_of_worktime}
                onChange={event => setUpdateParking({...updateParking, beginning_of_worktime: event.target.value})}
              />
              <p>〜</p>
              <STime_field
                type="time"
                name="end_of_worktime"
                value={updateParking.end_of_worktime}
                onChange={event => setUpdateParking({...updateParking, end_of_worktime: event.target.value})}
              />
            </STime_field_container>
          </SFormParkingDetail_item>
          <SFormParkingDetail_item>
            <Stext_notice>
            営業終了時間が日付を跨ぐ場合は、翌日の時間で入力してください。<br />24時間営業の場合は 0:00 ~ 23:59 で入力してください。
            </Stext_notice>
          </SFormParkingDetail_item>
          <SFormParkingDetail_item>
            <SText_label>無料の条件</SText_label>
            <SRequirements>
              <FormRequirement requirementsData={requirementsWeekdayData} label={"平日"} updatesBuy={updatesBuy} updatesFacility={updatesFacility} updatesTime={updatesTime} updatesFree={updatesFree} />
              <FormRequirement requirementsData={requirementsHolidayData} label={"全日"} updatesBuy={updatesBuy} updatesFacility={updatesFacility} updatesTime={updatesTime} updatesFree={updatesFree} />
            </SRequirements>
          </SFormParkingDetail_item>
          <SText_submit>編集</SText_submit>
        </SFormParkingDetail_list>
      </form>
    </EditParkingDetail_container>
  );
};

const EditParkingDetail_container = styled.div`
  height: calc(100% - 35px);
  overflow-y: scroll;
`;

const SFormParkingDetail_list = styled.ul`
  display: flex;
  flex-direction: column;
`;

const SFormParkingDetail_item = styled.li`
  margin: 10px;
  display: flex;
  justify-content: start;
`;

const SText_label = styled.label`
  width: 15%;
  padding: 10px 0;
  line-height: initial;
`;

const SText_address = styled.p`
  width: 85%;
  padding: 10px;
`;

const SText_field = styled.input`
  width: 85%;
  border: solid 1px gray;
  border-radius: 5px;
  padding: 10px;
`;

const STime_field_container = styled.div`
  width: 85%;
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

const Stext_notice = styled.p`
  color: gray;
  font-size: 14px;
  text-align: left;
  margin: 0 0 0 auto;
`;

const SRequirements = styled.div`
  width: 85%;
`;

const SText_submit = styled.button`
  width: 20%;
  background-color: rgb(75, 189, 255);
  color: white;
  border-radius: 4px;
  margin: 10px;
  margin-left: 80%;
  padding: 11px 20px;
  text-align: center;
`;

export default EditParkingDetail;
