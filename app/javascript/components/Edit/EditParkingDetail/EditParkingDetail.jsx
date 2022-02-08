import React, { useState } from "react";
import styled from 'styled-components';
import FormRequirement from "./FormRequirement";

const EditParkingDetail = (props) => {
  const {
    parkingData,
    requirementsWeekdayData,
    requirementsHolidayData
  } = props;

  const [updateParking, setUpdateParking] = useState({
    name: "",
    address: "",
    latitude: 35.681454048919186,
    longitude: 139.76707115336345,
    beginning_of_worktime: "",
    end_of_worktime: ""
  })

  return (
    <EditParkingDetail_container>
      <form>
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
              <FormRequirement requirementsData={requirementsWeekdayData} label={"平日"} />
              <FormRequirement requirementsData={requirementsHolidayData} label={"全日"} />
            </SRequirements>
          </SFormParkingDetail_item>
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
  justify-content: space-between;
`;

const SText_label = styled.label`
  width: 20%;
  padding: 10px 0;
  line-height: initial;
`;

const SText_address = styled.p`
  width: 80%;
  padding: 10px;
`;

const SText_field = styled.input`
  width: 80%;
  border: solid 1px gray;
  border-radius: 5px;
  padding: 10px;
`;

const STime_field_container = styled.div`
  width: 80%;
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
  width: 80%;
`;

export default EditParkingDetail;
