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
import { Table, Layout, Menu, ConfigProvider, Tag } from 'antd';

const { Content, Footer, Sider } = Layout;
const data = [
  {
    key: '1',
    name: 'Alice',
    age: 28,
    address: '123 Maple Street',
    email: 'alice@example.com',
    phone: '555-1234',
    occupation: 'Software Engineer',
    company: 'Tech Solutions',
    department: 'Development',
    salary: 85000,
  },
  {
    key: '2',
    name: 'Bob',
    age: 35,
    address: '456 Oak Avenue',
    email: 'bob@example.com',
    phone: '555-5678',
    occupation: 'Product Manager',
    company: 'Innovatech',
    department: 'Product Management',
    salary: 95000,
  },
  {
    key: '3',
    name: 'Charlie',
    age: 40,
    address: '789 Pine Road',
    email: 'charlie@example.com',
    phone: '555-8765',
    occupation: 'Data Scientist',
    company: 'Data Insights',
    department: 'Analytics',
    salary: 105000,
  },
  {
    key: '4',
    name: 'Diana',
    age: 30,
    address: '101 Birch Boulevard',
    email: 'diana@example.com',
    phone: '555-4321',
    occupation: 'UX Designer',
    company: 'Creative Designs',
    department: 'Design',
    salary: 78000,
  },
  {
    key: '5',
    name: 'Ethan',
    age: 45,
    address: '202 Cedar Lane',
    email: 'ethan@example.com',
    phone: '555-3456',
    occupation: 'Marketing Director',
    company: 'Brand Masters',
    department: 'Marketing',
    salary: 115000,
  },
  {
    key: '6',
    name: 'Fiona',
    age: 33,
    address: '303 Elm Street',
    email: 'fiona@example.com',
    phone: '555-6543',
    occupation: 'HR Manager',
    company: 'People First',
    department: 'Human Resources',
    salary: 72000,
  },
  {
    key: '7',
    name: 'George',
    age: 50,
    address: '404 Walnut Way',
    email: 'george@example.com',
    phone: '555-7890',
    occupation: 'Chief Financial Officer',
    company: 'Financial Experts',
    department: 'Finance',
    salary: 135000,
  },
  {
    key: '8',
    name: 'Hannah',
    age: 27,
    address: '505 Spruce Drive',
    email: 'hannah@example.com',
    phone: '555-0987',
    occupation: 'Sales Representative',
    company: 'Salesforce Inc.',
    department: 'Sales',
    salary: 68000,
  },
  {
    key: '9',
    name: 'Ivan',
    age: 36,
    address: '606 Fir Court',
    email: 'ivan@example.com',
    phone: '555-3210',
    occupation: 'Network Administrator',
    company: 'IT Solutions',
    department: 'IT',
    salary: 79000,
  },
  {
    key: '10',
    name: 'Julia',
    age: 29,
    address: '707 Willow Avenue',
    email: 'julia@example.com',
    phone: '555-2109',
    occupation: 'Business Analyst',
    company: 'Business Insights',
    department: 'Business Analysis',
    salary: 84000,
  }
];

const columns = [
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
    align : 'center',
    width : 196,
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
    render: (text) => `$${text}`, // Assuming price is numeric and you want to display it as currency
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

  const get_data = () => {
    axios({
      method: 'get',
      url: 'https://v1.nocodeapi.com/tugay/google_sheets/kDgprCZSJERfriRJ?tabId=Hotel Reservations', 
      params: {},
    }).then(function (response) {
            // handle success
            data = response.data;
    }).catch(function (error) {
            // handle error
            console.log(error);
    })
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
            zIndex: 1000,  // Adjust as needed to ensure it stays above other elements
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu mode="inline" items={items}/>
          
        </Sider>
        <Layout>

          <Content>
            <div className='Home'>
              <span id='home-container'>
                <SearchContainer />
              </span>
            </div>
            <div className='data-table'>
              <Table dataSource={hotel_data} columns={columns}
              style={
                { 
                  margin: '7rem',
                  marginLeft: '12rem',
                  }}/>;
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
