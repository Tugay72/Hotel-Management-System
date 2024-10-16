import {React, useState} from "react";
import { useNavigate } from 'react-router-dom';

import { ConfigProvider, Layout, Menu } from "antd";
import {
    DesktopOutlined,
    UserOutlined,
    LogoutOutlined,
    EditOutlined,
    SafetyOutlined,
    SolutionOutlined,
    FileExclamationOutlined,
    AppstoreAddOutlined
  } from '@ant-design/icons';
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
      getItem('Edit Prices', '3', <EditOutlined />),
      getItem('Add Room', '4', <AppstoreAddOutlined />),
      getItem('Report', '5', <FileExclamationOutlined />),
    ]),
    getItem('User', 'sub2', <UserOutlined />, [
      getItem('Profile', '6', <EditOutlined />),
      getItem('Security', '7', <SafetyOutlined />),
      getItem('Logout', '8', <LogoutOutlined />),
    ]),
];

const CustomNavbar = () => {
    const [collapsed, setCollapsed] = useState(true);
    const navigate = useNavigate();


    const handleMenuClick = (e) => {
        if(e.key === '8'){
          navigate('/');
          console.log("Logout Successful!");
        }
        else if(e.key === '2'){
            navigate('/homepage');
          }
        else if(e.key === '3'){
          navigate('/editPage');
        }
        else if(e.key === '4'){
          navigate('/addRooms ');
        }
        else if(e.key === '5'){
          navigate('/reportPage');
        }
    };

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
          <Layout>
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
              }}>
              <div className="demo-logo-vertical" />
              <Menu mode="inline" items={items} onClick={handleMenuClick}/>
              
            </Sider>
          </Layout>
        </ConfigProvider>
    )
}

export default CustomNavbar;