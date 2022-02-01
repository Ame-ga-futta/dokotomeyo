import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import RequirementForm from "./RequirementForm";
import RequirementFreeForm from "./RequirementType/RequirementFreeForm";
import RequirementTimeForm from "./RequirementType/RequirementTimeForm";
import RequirementBuyForm from "./RequirementType/RequirementBuyForm";
import RequirementFacilityForm from "./RequirementType/RequirementFacilityForm";

const AddRequirement = (props) => {
  const {

  } = props;

  const [type, setType] = useState("free")
  const [addRequirement, setAddRequirement] = useState({})

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

  return (
    <div>
      <form>
        <AddRequirement_form>
          <RequirementForm type={type} setType={setType} />
        </AddRequirement_form>
        {DisplayForm()}
      </form>
    </div>
  );
};

const AddRequirement_form = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
`;

export default AddRequirement;
