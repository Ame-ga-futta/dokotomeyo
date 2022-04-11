import React, { useState } from "react";
import styled from 'styled-components';
import UserSelector from "./UserSelector";
import UserItem from "./UserItem";

const User = () => {
  const [users, setUsers] = useState({});

  return (
    <SUser_container>
      <p>User</p>
      <UserSelector setUsers={setUsers} />
      {users && Object.keys(users).map((data, i) => {
        const userData = users[data]
        return <UserItem key={i} userData={userData} />
      })}
    </SUser_container>
  );
};

const SUser_container = styled.div`
  height: 100%;
`;

export default User;
