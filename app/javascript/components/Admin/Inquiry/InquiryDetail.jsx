import React, { useState } from "react";
import styled from 'styled-components';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import InquiryReply from "./InquiryReply";

const InquiryDetail = (props) => {
  const {
    detail,
    setDetail
  } = props;

  const [reply, setReply] = useState("");
  const [confirm, setConfirm] = useState(false);

  return (
    <InquiryDetail_container>
      <InquiryDetail_return onClick={() => setDetail({})}>
        <AiOutlineArrowLeft size={20} color={'#696969'} />
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
      <InquiryDetail_reply>
        <InquiryDetail_header>返信</InquiryDetail_header>
        <SText_area
          type="text"
          name="reply"
          value={reply}
          onChange={event => setReply(event.target.value)}
        />
        <SText_submit onClick={() => setConfirm(!confirm)} confirm={confirm}>{confirm ? "キャンセル" : "返信"}</SText_submit>
        {confirm && <InquiryReply reply={reply}/> }
      </InquiryDetail_reply>
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

const InquiryDetail_reply = styled.div`

`;

const InquiryDetail_header = styled.p`
  padding: 10px 6px;
  border-bottom: solid 1px gray;
  font-weight: bold;
`;

const SText_area = styled.textarea`
  width: 75%;
  margin: 15px 5% 15px 20%;
  height: calc( 1.2em * 10 );
  border: solid 1px gray;
  border-radius: 5px;
  padding: 10px;
`;

const SText_submit = styled.button`
  width: 15%;
  background-color: rgb(75, 189, 255);
  color: white;
  border-radius: 4px;
  margin: 5px 5% 5px 80%;
  padding: 11px 20px;
  text-align: center;
  background-color: ${ props => props.confirm ? "rgb(105, 105, 105)" : "rgb(75, 189, 255)" };
`;

export default InquiryDetail;
