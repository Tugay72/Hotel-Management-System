import './home_page.css';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import hotel_data from '../hotel_data';
import allColumns from './table_columns';

import SearchContainer from "./search_container";
import {
  DesktopOutlined,
  UserOutlined,
  LogoutOutlined,
  EditOutlined,
  SafetyOutlined,
  SolutionOutlined
} from '@ant-design/icons';
import { Table, Layout, Menu, ConfigProvider, Switch } from 'antd';
import CustomNavbar from './navbar';

const { Content, Footer, Sider } = Layout;


const HomePage = () => {
  const [searchClicked, setSearchClicked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [roomTypeFilter, setRoomTypeFilter] = useState([]);
  const [showEveryRoom, setShowEveryRoom] = useState(false);
  const [dates, setDates] = useState(['2024/06/17', '2024/07/31']['2024/06/17']);

  const tableRef = useRef(null);
  const navigate = useNavigate();


  // Hide some of the columns 
  const columns = showDetails
    ? allColumns
    : allColumns.filter(column => column.key !== 'number_of_adults' && column.key !== 'number_of_children' && column.key !== 'available_after');

  const get_data = () => {
    axios({
      method: 'get',
      url: 'https://v1.nocodeapi.com/tugay/google_sheets/kDgprCZSJERfriRJ?tabId=Hotel Reservations', 
      params: {},
    }).then(function (response) {
            // handle success
            
    }).catch(function (error) {
            // handle error
            console.log(error);
    })
  }
    
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
    handleScroll();
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
    <div>
      <CustomNavbar></CustomNavbar>
          <Content>
            <div className='Home'>
              
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
                  
                />
                <Switch
                  checked={showDetails}
                  onChange={() => setShowDetails(!showDetails)}
                  checkedChildren="Details"
                  unCheckedChildren="Details"
                  
                />
              </span>
              <Table dataSource={searchClicked ? filteredData : ''} columns={columns}/>;
            </div>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </div>
    );
};

export default HomePage;
