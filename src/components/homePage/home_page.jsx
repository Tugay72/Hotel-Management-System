import './home_page.css';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import allColumns from './table_columns';

import SearchContainer from "./search_container";
import { Table, Layout, Switch, ConfigProvider } from 'antd';
import CustomNavbar from '../navbar';

const { Content } = Layout;


const HomePage = () => {
  const [searchClicked, setSearchClicked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [roomTypeFilter, setRoomTypeFilter] = useState([]);
  const [showEveryRoom, setShowEveryRoom] = useState(false);
  const [dates, setDates] = useState(['2024/06/17', '2024/07/31']['2024/06/17']);

  const tableRef = useRef(null);
  var hotel_data;

  // Hide some of the columns 
  const columns = (dates) => showDetails
    ? allColumns(dates)
    : allColumns(dates).filter(column => column.key !== 'number_of_adults' && column.key !== 'number_of_children' && column.key !== 'available_after');
  
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("https://v1.nocodeapi.com/tugay/google_sheets/nuKhgbQuEidqDKQA?tabId=hotel_data_v1", requestOptions)
      .then(response => response.json())  // Parse response as JSON
      .then(data => {
        var hotel_data = data;  // Assign parsed JSON to hotel_data
        console.log(hotel_data);  // Log the data to console or process it further
    })
    .catch(error => console.log('Error fetching data:', error));
      
  const handleScroll = () => {
        tableRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  //Room Filtering
  const handleFilterOptions = (roomType, formatString, today) => {
    if (roomType != 'Tümü'){
      setRoomTypeFilter(roomType ? [roomType] : []);
    }
    else{
      setRoomTypeFilter(['Tek', 'Çift', 'Aile'])
    }
    setSearchClicked(true);
    setDates([formatString, today]);
    setTimeout(handleScroll, 1);
  }

  //Apply filter options and return filtered datas
  const originalHotelData = JSON.parse(JSON.stringify(hotel_data)); // Save original data to somewhere else to make sure filtering applies just once!
  const filteredData = originalHotelData.filter(data => {

    var roomFilter = roomTypeFilter.length === 0 || roomTypeFilter.includes(data.room_type);
    var emptyFilter = !showEveryRoom ? data.is_available === 1 : true;
    if(searchClicked && !emptyFilter && data.available_after < dates[0][0]){      
      emptyFilter = true;
      data.available_after = '';
      data.is_available = 'Empty';
    }
    return roomFilter && emptyFilter;
  });

  return (
    <ConfigProvider 
      theme={{
        components: {
            
          Table: {
            bodySortBg: '#F0F0F0',
            borderColor: '#DFDFDF',
            headerBg: '#3965D2',
            headerColor: '#f0f0f0',
            headerFontWeight: 'bold',
            headerSortActiveBg: '#1541AB',
            headerSortHoverBg: '#0D2C76',
            rowHoverBg: '#DFE8FF',
            fixedHeaderSortActiveBg: '#202020',
          },
          Pagination: { 
            itemActiveBg: '#ffffff', // Background color of active page button
            itemHoverBg: '#cccccc', // Background color of hover state on pagination items
            itemDisabledBg: '#ffffff', // Background color of disabled pagination items
            colorBgContainerDisabled: '#ffffff'
          }
          
        },
      }}
      >
      <CustomNavbar></CustomNavbar>
          <Content className='antt-content'>
            <div className='Home'>
              <h1>AVAILABLE ROOMS</h1>
              <span id='home-container'>
                <SearchContainer onFilterOptions={handleFilterOptions}/>
              </span>
            </div>
            <div id='data-table' ref={tableRef}>
              <span id='filter-buttons'>
                <Switch
                  checked={showEveryRoom}
                  onChange={() => setShowEveryRoom(!showEveryRoom)}
                  checkedChildren="All"
                  unCheckedChildren="Empty"
                  style={{ background: showEveryRoom ? '#188DF4' : '#808080'}}
                  
                />
                <Switch
                  checked={showDetails}
                  onChange={() => setShowDetails(!showDetails)}
                  checkedChildren="Details"
                  unCheckedChildren="Details"
                  style={{ background: showDetails ? '#188DF4' : '#808080'}}
                  
                />
              </span>
              <Table dataSource={searchClicked ? filteredData : ''} columns={columns(dates)}/>
            </div>
          </Content>
        </ConfigProvider>
    )
}

export default HomePage;
