import React, { useContext, useEffect } from "react";
import styled from 'styled-components';
import axios from 'axios';
import FlashMessageContext from "../../providers/FlashMessageProvider";

const RequirementBuy = () => {
  const bookFlashMessage = useContext(FlashMessageContext);

  useEffect(() => {
    axios.get('/dokotomeyo/admin_requirementBuy')
    .then((response) => {
      console.log(response.data.status)
    })
    .catch(() => {
      bookFlashMessage("データの取得に失敗しました");
    })
  }, []);

  return (
    <SRequirementBuy_container>
      <p>Requirement_buy</p>
    </SRequirementBuy_container>
  );
};

const SRequirementBuy_container = styled.div`
  height: 100%;
`;

export default RequirementBuy;
