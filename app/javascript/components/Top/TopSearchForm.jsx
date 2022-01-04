import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';

const TopSearchForm = (props) => {
  const {
    narrowDown,
    setNarrowDown,
    mapCenter,
    setMapCenter,
    bookFlashMessage
  } = props;

  const [inputDate, setInputDate] = useState(
    narrowDown.start_date.getFullYear() + "-" + ("00" + narrowDown.start_date.getMonth() + 1).slice(-2) + "-" + ("00" + narrowDown.start_date.getDate()).slice(-2)
  );
  const [inputStartTime, setInputStartTime] = useState(
    ("00" + narrowDown.start_date.getHours()).slice(-2) + ":" + ("00" + narrowDown.start_date.getMinutes()).slice(-2)
  );
  const [inputEndTime, setInputEndTime] = useState(
    ("00" + (narrowDown.start_date.getHours() +3)).slice(-2) + ":" + ("00" + narrowDown.start_date.getMinutes()).slice(-2)
  );

  useEffect(() => {
    setNarrowDown({
      ...narrowDown,
      start_date: new Date(`${inputDate} ${inputStartTime}`),
      end_date: new Date(`${inputDate} ${inputEndTime}`)
    });
  }, [inputDate, inputStartTime, inputEndTime])

  const geocoder = new window.google.maps.Geocoder();

  const ParkingSearch = (event) => {
    geocoder.geocode({ address: narrowDown.place }, ( results, status ) => {
      if (status === 'OK') {
        setMapCenter({ lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() })
      }
    });
    axios.post('/dokotomeyo/search', {
      search_parking: {
        mapCenter: mapCenter,
        narrowDown: narrowDown
      }
    })
    .then((response) => {
      switch (response.data.status) {
        case 200:
          console.log(response.data.parkings);
          break;
        case 400:
          bookFlashMessage(response.data.message);
          break;
      }
    })
    .catch(() => {
      bookFlashMessage("通信に失敗しました 最初からやり直してください");
    })
    event.preventDefault();
  }

  return (
    <STop_SearchFormWrapper>
      <form onSubmit={ParkingSearch}>
        <STop_SearchForm_container>
          <STop_SearchForm_container_input>
            <STop_SearchForm_container_input_ul>
              <li>
                <STop_Search_field
                  type="text"
                  name="place"
                  placeholder="駐車したい場所を入力"
                  onChange={event => setNarrowDown({...narrowDown, place: event.target.value })}
                />
              </li>

              <li>
                <STop_Search_time_container>
                  <STop_Search_label>入庫</STop_Search_label>
                  <STop_Search_time
                    type="date"
                    name="start_date"
                    value={inputDate}
                    onChange={event => {
                      setInputDate(event.target.value);
                    }}
                  />
                  <STop_Search_time
                    type="time"
                    name="start_time"
                    value={inputStartTime}
                    onChange={event => {
                      setInputStartTime(event.target.value);
                    }}
                  />
                  <STop_Search_label>〜</STop_Search_label>
                  <STop_Search_label>出庫</STop_Search_label>
                  <STop_Search_time
                    type="time"
                    name="end_time"
                    value={inputEndTime}
                    onChange={event => {
                      setInputEndTime(event.target.value);
                    }}
                  />
                </STop_Search_time_container>
              </li>

              <li>
                <STop_Search_checkbox
                  type="checkbox"
                  id="time"
                  checked={narrowDown.include_time}
                  onChange={() => setNarrowDown({...narrowDown, include_time: !narrowDown.include_time })}
                />
                <STop_Search_checkbox_label htmlFor="time">入庫後一定時間無料を含む</STop_Search_checkbox_label>
              </li>

              <li>
                <STop_Search_checkbox
                  type="checkbox"
                  id="buy"
                  checked={narrowDown.include_buy}
                  onChange={() => setNarrowDown({...narrowDown, include_buy: !narrowDown.include_buy })}
                />
                <STop_Search_checkbox_label htmlFor="buy">提携施設での買い物金額一定以上で無料を含む</STop_Search_checkbox_label>
              </li>

              <li>
                <STop_Search_checkbox
                  type="checkbox"
                  id="facility"
                  checked={narrowDown.include_facility}
                  onChange={() => setNarrowDown({...narrowDown, include_facility: !narrowDown.include_facility })}
                />
                <STop_Search_checkbox_label htmlFor="facility">施設利用で無料を含む</STop_Search_checkbox_label>
              </li>
            </STop_SearchForm_container_input_ul>
          </STop_SearchForm_container_input>
          <STop_SearchForm_container_submit>検索</STop_SearchForm_container_submit>
        </STop_SearchForm_container>
      </form>
    </STop_SearchFormWrapper>
  );
};

const STop_SearchFormWrapper = styled.div`
  width: 90%;
`;

const STop_SearchForm_container = styled.div`
  display: flex;
  flex-direction: row;
`;

const STop_SearchForm_container_input = styled.div`
  width: 85%;
  background-color: rgb(255, 255, 255);
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px 0 0 5px;
`;

const STop_SearchForm_container_submit = styled.button`
  width: 15%;
  background-color: rgb(75, 189, 255);
  padding: 15px;
  margin-top: 20px;
  border-radius: 0 5px 5px 0;
  text-align: center;
  color: white;
`;

const STop_SearchForm_container_input_ul = styled.ul`
  display: flex;
  flex-direction: column;
`;

const STop_Search_field = styled.input`
  width: 100%;
  border-bottom: solid 1px gray;
  padding: 10px;
  margin: 5px 0;
`;

const STop_Search_time_container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0 8px 0;
`;

const STop_Search_label = styled.label`
  margin: 0 10px;
`;

const STop_Search_time = styled.input`
  width: 30%;
  border-bottom: solid 1px gray;
  padding: 10px;
  text-align: center;
`;

const STop_Search_checkbox = styled.input`
  margin: 5px 8px 5px 3px;
`;

const STop_Search_checkbox_label = styled.label`
  font-size: 14px;
`;

export default TopSearchForm;
