import React, { useEffect, useState } from "react";
import styled from 'styled-components';

const TopSearchResult = (props) => {
  const {
    parking,
    i,
    mapCenter,
    setHighlight
  } = props;

  const [distance, setDistance] = useState("");

  const options = {
    origins: [mapCenter],
    destinations: [{lat: parking.latitude, lng: parking.longitude}],
    travelMode: 'WALKING'
  }

  const service = new google.maps.DistanceMatrixService();

  useEffect(() => {
    service.getDistanceMatrix(options, ( results, status ) => {
      if (status === 'OK') {
        setDistance(results.rows[0].elements[0].duration.text);
      }
    });
  }, []);

  return (
    <STop_SearchResults_result onMouseOver={() => {setHighlight(i)}} onMouseOut={() => {setHighlight("")}}>
      <STop_SearchResults_result_name>
        {parking.name}
      </STop_SearchResults_result_name>
      <STop_SearchResults_result_text_list>
        <STop_SearchResults_result_text_travel_time>徒歩{distance}</STop_SearchResults_result_text_travel_time>
        <STop_SearchResults_result_text_work_time>{parking.beginning_of_worktime} ~ {parking.end_of_worktime}</STop_SearchResults_result_text_work_time>
      </STop_SearchResults_result_text_list>
    </STop_SearchResults_result>
  );
};

const STop_SearchResults_result = styled.div`
  padding: 3px 5px;
  border-bottom: solid 1px gray;
  &:hover {
    background-color: rgb(220, 220, 220);
  }
`;

const STop_SearchResults_result_name = styled.p`
  margin: 5px 0;
  font-size: 22px;
`;

const STop_SearchResults_result_text_list = styled.ul`
  display: flex;
  font-size: 14px;
`;

const STop_SearchResults_result_text_travel_time = styled.li`
  width: 15%;
  margin-right: 5%;
`;

const STop_SearchResults_result_text_work_time = styled.li`
  width: 25%;
  margin-right: 5%;
`;

export default TopSearchResult;
