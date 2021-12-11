import React, { useState, memo } from "react";
import styled from 'styled-components';
import { LoadScript } from "@react-google-maps/api";
import PostLeft from "./PostLeft";
import PostRight from "./PostRight";
import PostConfirm from "./PostConfirm";

const Post = memo((props) => {
  const { bookFlashMessage } = props;

  const API_KEY = process.env.GOOGLE_MAP_API_KEY;

  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [beginning_of_worktime, setBeginning_of_worktime] = useState("");
  const [end_of_worktime, setEnd_of_worktime] = useState("");
  const [openconfirm, setOpenConfirm] = useState(false);
  const [errors, setErrors] = useState();
  const [mapCenter, setMapCenter] = useState({lat: 35.681454048919186, lng: 139.76707115336345});

  return (
    <SPost_container>
      <LoadScript googleMapsApiKey={API_KEY}>
        <PostLeft
          address={address}
          name={name}
          setName={setName}
          latitude={latitude}
          longitude={longitude}
          beginning_of_worktime={beginning_of_worktime}
          setBeginning_of_worktime={setBeginning_of_worktime}
          end_of_worktime={end_of_worktime}
          setEnd_of_worktime={setEnd_of_worktime}
          setOpenConfirm={setOpenConfirm}
          errors={errors}
          setMapCenter={setMapCenter}
        />
        <PostRight
          setAddress={setAddress}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          mapCenter={mapCenter}
          setMapCenter={setMapCenter}
        />
        <PostConfirm
          address={address}
          name={name}
          latitude={latitude}
          longitude={longitude}
          beginning_of_worktime={beginning_of_worktime}
          end_of_worktime={end_of_worktime}
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
