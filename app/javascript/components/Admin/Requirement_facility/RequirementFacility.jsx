import React, { useContext, useEffect } from "react";
import styled from 'styled-components';
import axios from 'axios';
import FlashMessageContext from "../../providers/FlashMessageProvider";

const RequirementFacility = () => {
  const bookFlashMessage = useContext(FlashMessageContext);

  useEffect(() => {
    axios.get('/dokotomeyo/admin_requirementFacility')
    .then((response) => {
      console.log(response.data.status)
    })
    .catch(() => {
      bookFlashMessage("データの取得に失敗しました");
    })
  }, []);

  return (
    <SRequirementFacility_container>
      <p>Requirement_facility</p>
    </SRequirementFacility_container>
  );
};

const SRequirementFacility_container = styled.div`
  height: 100%;
`;

export default RequirementFacility;
