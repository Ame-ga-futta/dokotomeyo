import React from "react";
import styled from 'styled-components';
import ReturnFree from "../ReturnRequirements/ReturnFree";
import ReturnBuy from "../ReturnRequirements/ReturnBuy";
import ReturnFacility from "../ReturnRequirements/ReturnFacility";
import ReturnTime from "../ReturnRequirements/ReturnTime";

const ExistRequirements = (props) => {
  const {
    existRequirements
  } = props;

  return (
    <ConfirmParking_sub_table>
      {existRequirements.requirement_frees && existRequirements.requirement_frees.map((requirement, i) => {
        return <ReturnFree key={i} />
      })}
      {existRequirements.requirement_buys && existRequirements.requirement_buys.map((requirement, i) => {
        return <ReturnBuy key={i} requirement={requirement} />
      })}
      {existRequirements.requirement_facilities && existRequirements.requirement_facilities.map((requirement, i) => {
        return <ReturnFacility key={i} requirement={requirement} />
      })}
      {existRequirements.requirement_times && existRequirements.requirement_times.map((requirement, i) => {
        return <ReturnTime key={i} requirement={requirement} />
      })}
    </ConfirmParking_sub_table>
  );
};

const ConfirmParking_sub_table = styled.ul`
  width: 85%;
`;

export default ExistRequirements;
