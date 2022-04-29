import React from "react";
import styled from 'styled-components';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const InquiryDetail = (props) => {
  const {
    detail,
    setDetail
  } = props;

  return (
    <InquiryDetail_container>
      <InquiryDetail_return onClick={() => setDetail({})}>
        <AiOutlineArrowLeft size={20} color={'#696969'} />
        <InquiryDetail_return_text>閉じる</InquiryDetail_return_text>
      </InquiryDetail_return>
      <InquiryDetail_table>
        <InquiryDetail_item>
          <InquiryDetail_item_header>お問い合わせ名</InquiryDetail_item_header>
          <InquiryDetail_item_text>{detail.name}</InquiryDetail_item_text>
        </InquiryDetail_item>
        <InquiryDetail_item>
          <InquiryDetail_item_header>返信用メールアドレス</InquiryDetail_item_header>
          <InquiryDetail_item_text>{detail.address}</InquiryDetail_item_text>
        </InquiryDetail_item>
        <InquiryDetail_item>
          <InquiryDetail_item_header>お問い合わせ内容</InquiryDetail_item_header>
          <InquiryDetail_item_text>{detail.message}</InquiryDetail_item_text>
        </InquiryDetail_item>
      </InquiryDetail_table>
    </InquiryDetail_container>
  );
};

const InquiryDetail_container = styled.div`

`;

const InquiryDetail_return = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 6px;
  border-bottom: solid 1px gray;
  &:hover {
    background-color: rgb(205, 205, 205);
  }
`;

const InquiryDetail_return_text = styled.p`
  margin: 0 5px;
`;

const InquiryDetail_table = styled.ul`
  display: flex;
  flex-direction: column;
`;

const InquiryDetail_item = styled.li`
  display: flex;
  flex-direction: row;
  margin: 6px 10px;
`;

const InquiryDetail_item_header = styled.p`
  width: 20%;
`;

const InquiryDetail_item_text = styled.p`
  width: 80%;
`;

export default InquiryDetail;
