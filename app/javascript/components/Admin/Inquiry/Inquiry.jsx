import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import InquiryItem from "./InquiryItem";
import InquiryDetail from "./InquiryDetail";

const Inquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [message, setMessage] = useState(false);
  const [detail, setDetail] = useState({});

  useEffect(() => {
    axios.get('/dokotomeyo/inquiry')
    .then((response) => {
      switch (response.data.status) {
        case 200:
          setInquiries(response.data.inquiries);
          setMessage(false);
          break;
        case 400:
          setInquiries([]);
          setMessage(true);
          break;
      }
    })
    .catch(() => {

    })
  }, [])

  return (
    <SInquiry_container>
      <SInquiry_title>Inquiry</SInquiry_title>
      <SInquiry_table>
        {message && <SMessage>Inquiryは0件です</SMessage>}
        {inquiries && inquiries.map((inquiry, i) => {
          return <SInquiry_item key={i}><InquiryItem inquiry={inquiry} setDetail={setDetail}/></SInquiry_item>
        })}
      </SInquiry_table>
      <SInquiry_detail detail={detail}>
        {Object.keys(detail).length == 0 || <InquiryDetail detail={detail} setDetail={setDetail} />}
      </SInquiry_detail>
    </SInquiry_container>
  );
};

const SInquiry_container = styled.div`
  height: 100%;
`;

const SInquiry_title = styled.h1`
  height: 50px;
  padding: 15px 20px;
  font-weight: bold;
  background-color: #eeeeee;
`;

const SInquiry_table = styled.ul`
  height: calc(100% - 100px);
  padding: 0 20px;
  overflow-y: scroll;
`;

const SInquiry_item = styled.li`
  padding: 3px 0;
  margin: 11px 0;
  border-bottom: solid 1px gray;
`;

const SMessage = styled.p`
  margin: 4px 10px;
`;

const SInquiry_detail = styled.div`
  position: fixed;
  z-index : 99993;
  top  : 80px;
  right : 0;
  height: calc(100vh - 80px );
  width: ${ props => Object.keys(props.detail).length == 0 ? "0%" : "80%" };
  transition : 0.3s ease-in-out;
  background-color: #ffffff;
`;

export default Inquiry;
