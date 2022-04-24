import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';

const EditParam = () => {
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    axios.get('/dokotomeyo/admin_permission')
    .then((response) => {
      setPermissions(response.data.edit_params)
    })
    .catch(() => {

    })
  }, [])

  console.log(permissions)

  return (
    <SParking_container>
      <p>{permissions.length}</p>
    </SParking_container>
  );
};

const SParking_container = styled.div`
  height: 100%;
`;

export default EditParam;
