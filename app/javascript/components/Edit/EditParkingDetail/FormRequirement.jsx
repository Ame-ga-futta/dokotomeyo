import React, { useState } from "react";
import styled from 'styled-components';

const FormRequirement = (props) => {
  const {
    requirementsData,
    label
  } = props;

  const [updateRequirements, setUpdateRequirements] = useState({
    facility_name: "sample",
    purchase_price: "9999",
    free_time: "",
    only_weekdays: false
  });

  return (
    <SFormRequirement_container>
      <SformRequirement_Label>{label}</SformRequirement_Label>
      <SFormRequirement_list>
        {requirementsData.requirement_frees && requirementsData.requirement_frees.map((requirement, i) => {
          return (
            <SFormRequirement_item key={i}>
              <p>終日無料</p>
            </SFormRequirement_item>
          )
        })}
        {requirementsData.requirement_buys && requirementsData.requirement_buys.map((requirement, i) => {
          return (
            <SFormRequirement_item key={i}>
              <ul>
                <SFormRequirement_item_item>
                  <SRequirement_Text_field
                    type="text"
                    name="facility_name"
                    value={updateRequirements.facility_name}
                    onChange={(event) => setUpdateRequirements({...updateRequirements, facility_name: event.target.value})}
                  />
                  <p>での購入金額が</p>
                </SFormRequirement_item_item>
                <SFormRequirement_item_item>
                  <SRequirement_Text_field
                    type="number"
                    name="purchase_price"
                    value={updateRequirements.purchase_price}
                    onChange={(event) => setUpdateRequirements({...updateRequirements, purchase_price: event.target.value})}
                  />
                  <p>円以上で</p>
                </SFormRequirement_item_item>
                <SFormRequirement_item_item>
                  <SRequirement_Text_field
                    type="time"
                    name="free_time"
                    value={updateRequirements.free_time}
                    onChange={(event) => setUpdateRequirements({...updateRequirements, free_time: event.target.value})}
                  />
                  <p>時間無料</p>
                </SFormRequirement_item_item>
              </ul>
            </SFormRequirement_item>
          )
        })}
        {requirementsData.requirement_facilities && requirementsData.requirement_facilities.map((requirement, i) => {
          return (
            <SFormRequirement_item key={i}>
              <ul>
                <SFormRequirement_item_item>
                  <SRequirement_Text_field
                    type="text"
                    name="facility_name"
                    value={updateRequirements.facility_name}
                    onChange={(event) => setUpdateRequirements({...updateRequirements, facility_name: event.target.value})}
                  />
                  <p>の利用で</p>
                </SFormRequirement_item_item>
                <SFormRequirement_item_item>
                  <SRequirement_Text_field
                    type="time"
                    name="free_time"
                    value={updateRequirements.free_time}
                    onChange={(event) => setUpdateRequirements({...updateRequirements, free_time: event.target.value})}
                  />
                  <p>時間無料</p>
                </SFormRequirement_item_item>
              </ul>
            </SFormRequirement_item>
          )
        })}
        {requirementsData.requirement_times && requirementsData.requirement_times.map((requirement, i) => {
          return (
            <SFormRequirement_item key={i}>
              <ul>
                <SFormRequirement_item_item>
                  <p>入庫後</p>
                  <SRequirement_Text_field
                    type="time"
                    name="free_time"
                    value={updateRequirements.free_time}
                    onChange={(event) => setUpdateRequirements({...updateRequirements, free_time: event.target.value})}
                  />
                  <p>時間まで無料</p>
                </SFormRequirement_item_item>
              </ul>
            </SFormRequirement_item>
          )
        })}
      </SFormRequirement_list>
    </SFormRequirement_container>
  );
};

const SFormRequirement_container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const SformRequirement_Label = styled.p`
  width: 15%;
`;

const SFormRequirement_list = styled.ul`
  width: 85%;
  display: flex;
  align-items: start;
  flex-direction: column;
`;

const SFormRequirement_item = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const SFormRequirement_item_item = styled.li`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const SRequirement_Text_field = styled.input`
  border: solid 1px gray;
  border-radius: 5px;
  padding: 6px;
  margin: 0 5px;
  font-size: 16px;
`;

export default FormRequirement;
