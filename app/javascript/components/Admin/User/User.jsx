import React, { useState } from "react";
import styled from 'styled-components';
import UserSelector from "./UserSelector";
import UserItem from "./UserItem";

const User = () => {
  const [users, setUsers] = useState({});

  return (
    <SUser_container>
      <SUser_title>User</SUser_title>
      <UserSelector setUsers={setUsers} />
      <SUser_table>
        {users && Object.keys(users).map((data, i) => {
          const userData = users[data]
          return <SUser_item key={i}><UserItem userData={userData} /></SUser_item>
        })}
      </SUser_table>
    </SUser_container>
  );
};

const SUser_container = styled.div`
  height: 100%;
`;

const SUser_title = styled.h1`
  height: 50px;
  padding: 15px 20px;
  font-weight: bold;
  background-color: #eeeeee;
`;

const SUser_table = styled.ul`
  height: calc(100% - 100px);
  padding: 0 20px;
  overflow-y: scroll;
`;

const SUser_item = styled.li`
  padding: 3px 0;
  margin: 11px 0;
  border-bottom: solid 1px gray;
`;

export default User;
