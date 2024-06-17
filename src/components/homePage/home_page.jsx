import './home_page.css';
import React, { useState } from 'react';
import axios from 'axios'; 
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

const { Content, Footer, Sider } = Layout;


function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

//Navbar menu items
const items = [
  getItem('Rooms', 'sub1', <DesktopOutlined />, [
    getItem('Available Rooms', '2', <SolutionOutlined />),
    getItem('Edit Rooms', '3', <EditOutlined />),
  ]),
  getItem('User', 'sub2', <UserOutlined />, [
    getItem('Profile', '5', <EditOutlined />),
    getItem('Security', '6', <SafetyOutlined />),
    getItem('Logout', '7', <LogoutOutlined />),
  ]),
];


const HomePage = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [searchClicked, setSearchClicked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [roomTypeFilter, setRoomTypeFilter] = useState([]);
  const [showEveryRoom, setShowEveryRoom] = useState(false);
  const [dates, setDates] = useState(['2024/06/17', '2024/07/31']['2024/06/17']);

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
  }

  //Apply filter options and return filtered datas
  const filteredData = hotel_data.filter(data => {

    var roomFilter = roomTypeFilter.length === 0 || roomTypeFilter.includes(data.room_type);
    var emptyFilter = !showEveryRoom ? data.is_available === 1 : data;
    if(searchClicked && emptyFilter === false && data.available_after <= dates[0][0]){
      emptyFilter = true;
    }
    return roomFilter && emptyFilter;
  });

  
  return (
    <ConfigProvider
      theme={{
        components: {
           
            Layout: {
                colorBgSider: '#151515',
                siderBg : '#151515',
                triggerBg : '#202020',
                triggerColor : '#ffffff',
            },
            Menu: {
                colorItemBg: '#202020',
                colorSubMenuBg: '#151515',
                colorBgElevated: '#202020',

                borderColor: "#151515",

                colorText : '#ffffff',
                itemSelectedColor : "#AC63D8",
                itemSelectedBg : "#251C27"
            }
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{ 
            position: 'fixed', 
            height: '100vh', 
            left: 0, 
            top: 0, 
            bottom: 0,
            zIndex: 1000,
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu mode="inline" items={items}/>
          
        </Sider>
        <Layout>

          <Content>
            <div className='Home'>
              <span id='home-container'>
                <SearchContainer onFilterOptions={handleFilterOptions}/>
              </span>
            </div>
            <div id='data-table'>
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
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default HomePage;
