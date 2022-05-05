import React, { useEffect } from "react";
import styled from 'styled-components';

const InquiryReply = (props) => {
  const {
    reply
  } = props;

  useEffect(() => {
    console.log("テンプレ文の取得")
  }, [reply])

  const ReplyInquiry = () => {
    console.log(reply)
  }

  return (
    <SInquiryReply_container>
      <SInquiryReply_header>下記の内容で返信しますか?</SInquiryReply_header>
      <p>{reply}</p>
      <SText_submit onClick={() => ReplyInquiry()}>返信</SText_submit>
    </SInquiryReply_container>
  );
};

const SInquiryReply_container = styled.div`
  margin: 10px 5% 10px 20%;
`;

const SInquiryReply_header = styled.p`
  margin-bottom: 20px;
`;

const SText_submit = styled.button`
  width: 20%;
  background-color: rgb(75, 189, 255);
  color: white;
  border-radius: 4px;
  margin: 5px 5% 5px 80%;
  padding: 11px 20px;
  text-align: center;
  background-color: ${ props => props.confirm ? "rgb(105, 105, 105)" : "rgb(75, 189, 255)" };
`;

export default InquiryReply;
