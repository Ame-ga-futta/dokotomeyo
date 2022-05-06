import React, { useState } from "react";
import styled from 'styled-components';
import axios from 'axios';

const InquiryReply = (props) => {
  const {
    reply,
    inquiryID
  } = props;

  const [message, setMessage] = useState("");

  const ReplyInquiry = () => {
    axios.post('/dokotomeyo/admin_reply_inquiry', {
      reply_data: {
        reply: reply,
        inquiryID: inquiryID
      }
    })
    .then((response) => {
      if (response.data.status == 200) {
        window.location.reload();
      } else {
        setMessage("返信に失敗しました")
      }
    })
    .catch(() => {
      setMessage("通信に失敗しました")
    })
  }

  return (
    <SInquiryReply_container>
      {message && <SMessage>{message}</SMessage>}
      <SInquiryReply_header>下記の内容で返信しますか?</SInquiryReply_header>
      <p>{reply}</p>
      <SText_submit onClick={() => ReplyInquiry()}>返信</SText_submit>
    </SInquiryReply_container>
  );
};

const SInquiryReply_container = styled.div`
  margin: 10px 5% 10px 20%;
`;

const SMessage = styled.p`
  margin: 4px 10px;
  color: red;
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
