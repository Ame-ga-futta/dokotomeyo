import React, { useState } from "react";
import styled from 'styled-components';
import UserSelector from "./UserSelector";

const User = () => {
  const [users, setUsers] = useState({});

  return (
    <SUser_container>
      <p>User</p>
      <UserSelector setUsers={setUsers} />
    </SUser_container>
  );
};

const SUser_container = styled.div`
  height: 100%;
`;

export default User;
