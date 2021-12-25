import React, { useState, memo } from "react";
import styled from 'styled-components';
import { LoadScript } from "@react-google-maps/api";
import PostLeft from "./PostLeft";
import PostRight from "./PostRight";
import PostConfirm from "./PostConfirm";

const Post = memo((props) => {
  const { bookFlashMessage } = props;

  const API_KEY = process.env.GOOGLE_MAP_API_KEY;

  const [parking, setParking] = useState({
    name: "",
    address: "",
    latitude: 35.681454048919186,
    longitude: 139.76707115336345,
    beginning_of_worktime: "",
    end_of_worktime: ""
  });
  const [type, setType] = useState("free");
  const [requirement, setRequirement] = useState({});
  const [openconfirm, setOpenConfirm] = useState(false);
  const [errors, setErrors] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 35.681454048919186, lng: 139.76707115336345});

  return (
    <SPost_container>
      <LoadScript googleMapsApiKey={API_KEY}>
        <PostLeft
          parking={parking}
          setParking={setParking}
          setOpenConfirm={setOpenConfirm}
          errors={errors}
          setErrors={setErrors}
          setMapCenter={setMapCenter}
          type={type}
          setType={setType}
          requirement={requirement}
          setRequirement={setRequirement}
        />
        <PostRight
          parking={parking}
          setParking={setParking}
          mapCenter={mapCenter}
          setMapCenter={setMapCenter}
        />
        <PostConfirm
          parking={parking}
          type={type}
          requirement={requirement}
          openconfirm={openconfirm}
          setOpenConfirm={setOpenConfirm}
          setErrors={setErrors}
          bookFlashMessage={bookFlashMessage}
        />
      </LoadScript>
    </SPost_container>
  );
})

const SPost_container = styled.div`
  display: flex;
  height: calc(100vh - 80px );
`;

export default Post;
