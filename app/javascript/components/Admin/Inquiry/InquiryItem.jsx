import React from "react";
import styled from 'styled-components';

const InquiryItem = (props) => {
  const {
    inquiry,
    setDetail
  } = props;

  return (
    <SInquiryItem_container onClick={() => setDetail(inquiry)}>
      <SInquiryItem_name>{inquiry.name}</SInquiryItem_name>
      <SInquiryItem_text>{inquiry.address}</SInquiryItem_text>
      <SInquiryItem_text>{inquiry.created_at}</SInquiryItem_text>
    </SInquiryItem_container>
  );
};

const SInquiryItem_container = styled.div`
  display: flex;
  flex-direction: column;
  &:hover {
    background-color: rgb(205, 205, 205);
  }
`;

const SInquiryItem_name = styled.p`
  font-size: 18px;
  margin-bottom: 4px;
`;

const SInquiryItem_text = styled.p`
  font-size: 14px;
  margin-bottom: 2px;
`;

export default InquiryItem;
