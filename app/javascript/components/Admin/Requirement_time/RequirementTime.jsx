import React, { useContext, useEffect } from "react";
import styled from 'styled-components';
import axios from 'axios';
import FlashMessageContext from "../../providers/FlashMessageProvider";

const RequirementTime = () => {
  const bookFlashMessage = useContext(FlashMessageContext);

  useEffect(() => {
    axios.get('/dokotomeyo/admin_requirementTime')
    .then((response) => {
      console.log(response.data.status)
    })
    .catch(() => {
      bookFlashMessage("データの取得に失敗しました");
    })
  }, []);

  return (
    <SRequirementTime_container>
      <p>Requirement_time</p>
    </SRequirementTime_container>
  );
};

const SRequirementTime_container = styled.div`
  height: 100%;
`;

export default RequirementTime;
