import React, { useContext, useEffect } from "react";
import styled from 'styled-components';
import axios from 'axios';
import FlashMessageContext from "../../providers/FlashMessageProvider";

const RequirementFree = () => {
  const bookFlashMessage = useContext(FlashMessageContext);

  useEffect(() => {
    axios.get('/dokotomeyo/admin_requirementFree')
    .then((response) => {
      console.log(response.data.status)
    })
    .catch(() => {
      bookFlashMessage("データの取得に失敗しました");
    })
  }, []);

  return (
    <SRequirementFree_container>
      <p>Requirement_free</p>
    </SRequirementFree_container>
  );
};

const SRequirementFree_container = styled.div`
  height: 100%;
`;

export default RequirementFree;
