import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from "axios";
import RequirementForm from "./RequirementForm";
import RequirementFreeForm from "./RequirementType/RequirementFreeForm";
import RequirementTimeForm from "./RequirementType/RequirementTimeForm";
import RequirementBuyForm from "./RequirementType/RequirementBuyForm";
import RequirementFacilityForm from "./RequirementType/RequirementFacilityForm";
import AddRequirementConfirm from "./AddRequirementConfirm";

const AddRequirement = (props) => {
  const {
    parkingID
  } = props;

  const [errors, setErrors] = useState([]);
  const [openconfirm, setOpenConfirm] = useState(false);
  const [type, setType] = useState("free");
  const [addRequirement, setAddRequirement] = useState({});

  useEffect(() => {
    setAddRequirement({
      facility_name: "",
      purchase_price: "",
      free_time: "",
      only_weekdays: false
    })
  }, [type])

  const DisplayForm = () => {
    switch (type){
      case "free":
        return <RequirementFreeForm addRequirement={addRequirement} setAddRequirement={setAddRequirement} />
      case "time":
        return <RequirementTimeForm addRequirement={addRequirement} setAddRequirement={setAddRequirement} />
      case "buy":
        return <RequirementBuyForm addRequirement={addRequirement} setAddRequirement={setAddRequirement} />
      case "facility":
        return <RequirementFacilityForm addRequirement={addRequirement} setAddRequirement={setAddRequirement} />
    }
  }

  const Confilm = (event) => {
    axios.post('/dokotomeyo/add_confirm', {
      add_requirement: {
        requirement_type: type,
        parkingID: parkingID,
        requirement: addRequirement
      }
    })
    .then((response) => {
      switch (response.data.status){
        case 200:
          setOpenConfirm(true);
          break;
        case 400:
          setErrors(response.data.message);
          break;
      }
    })
    .catch(() => {
      setErrors("通信に失敗しました 最初からやり直してください");
    })
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={Confilm}>
        <SError_container>
          {errors && errors.map((error, i) => {
            return (
              <li key={i}><SError>{error}</SError></li>
            )
          })}
        </SError_container>
        <AddRequirement_form>
          <RequirementForm type={type} setType={setType} />
        </AddRequirement_form>
        {DisplayForm()}
        <SText_submit>追加</SText_submit>
      </form>
      <AddRequirementConfirm openconfirm={openconfirm} setOpenConfirm={setOpenConfirm} type={type} parkingID={parkingID} addRequirement={addRequirement} setErrors={setErrors} />
    </div>
  );
};

const SError_container = styled.ul`
  font-size: 15px;
  color: red;
`;

const SError = styled.p`
  padding: 4px 3%;
`;

const AddRequirement_form = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
  padding-bottom: 3px;
  border-bottom: solid 1px gray;
`;

const SText_submit = styled.button`
  width: 20%;
  background-color: rgb(75, 189, 255);
  color: white;
  border-radius: 4px;
  margin: 10px;
  margin-left: 70%;
  padding: 11px 20px;
  text-align: center;
`;

export default AddRequirement;
