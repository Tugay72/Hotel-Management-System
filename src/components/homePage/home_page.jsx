import './home_page.css';
import React, { useState } from 'react';
import SearchContainer from "./search_container";
import {
  DesktopOutlined,
  UserOutlined,
  LogoutOutlined,
  EditOutlined,
  SafetyOutlined,
  SolutionOutlined
} from '@ant-design/icons';
import { Layout, Menu, ConfigProvider } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

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
