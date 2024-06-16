import './home_page.css';
import React, { useState } from 'react';
import axios from 'axios'; 
import hotel_data from '../hotel_data';

import SearchContainer from "./search_container";
import {
  DesktopOutlined,
  UserOutlined,
  LogoutOutlined,
  EditOutlined,
  SafetyOutlined,
  SolutionOutlined
} from '@ant-design/icons';
import { Table, Layout, Menu, ConfigProvider, Tag, Switch } from 'antd';

const { Content, Footer, Sider } = Layout;
const [filters, setFilters] = useState('');
const allColumns = [
  {
    title: 'Door Number',
    dataIndex: 'room_id',
    key: 'room_id',
    align : 'left',
    width : 128,
  },
  {
    title: 'Number of Adults',
    dataIndex: 'number_of_adults',
    key: 'number_of_adults',
    align : 'center',
    width : 196,
  },
  {
    title: 'Number of Children',
    dataIndex: 'number_of_children',
    key: 'number_of_children',
    align : 'center',
    width : 196,
  },
  {
    title: 'Total Guests',
    dataIndex: 'total_guests',
    key: 'total_guests',
    align : 'center',
    width : 196,
  },
  {
    title: 'Room Type',
    dataIndex: 'room_type',
    key: 'room_type',
    align: 'center',
    width: 196,
    filters: [
      {
        text: 'Tek',
        value: 'Tek',
      },
      {
        text: 'Çift',
        value: 'Çift',
      },
      {
        text: 'Aile',
        value: 'Aile',
      },
    ],
    filteredValue : filters,
    onFilter: (value, record) => record.room_type === value,
  },
  {
    title: 'Status',
    dataIndex: 'is_available',
    key: 'is_available',
    align : 'center',
    width : 196, 
    render: (is_available) => (
      <span>
        <Tag color={is_available ? "green" : "volcano"}  key={is_available}>
          {is_available ? "Empty" : "Full"}
        </Tag>
      </span>
    ),
    filters: [
      {
        text: 'Empty',
        value: 'Empty',
      },
      {
        text: 'Full',
        value: 'Full',
      },
    ],
    defaultFilteredValue : ['Empty'],
    onFilter: (value, record) => (value === 'Empty' && record.is_available) || (value === 'Full' && !record.is_available),
  },
  {
    title: 'Available After',
    dataIndex: 'available_after',
    key: 'available_after',
    align : 'center',
    width : 196,
    render :(available_after) => (
      <span>
        {available_after != 0 ? available_after : ""}
      </span>
    )
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    align : 'center',
    width : 196,
    defaultSortOrder: '',
    sorter: (a, b) => a.price - b.price,
    render: (text) => `$${text}`,
  },
];


function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

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
  const [searchClicked, setSearchClicked] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

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

  const handleFilterOptions = (roomType) => {
     setFilters(roomType);
  }

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
              <Switch
                checked={showDetails}
                onChange={() => setShowDetails(!showDetails)}
                checkedChildren="Details"
                unCheckedChildren="Details"
                
              />
              <Table dataSource={searchClicked ? hotel_data : ''} columns={columns}/>;
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
