import "./search_container.css"
import {React, useState} from "react";
import { Radio, Grid, Col, Row, DatePicker, Space } from 'antd';
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

export default function SearchContainer () {

    const [roomType, setRoomType] = useState('onePerson');
    const placementChange = (e) => {
        setRoomType(e.target.value);
    };

    return (
        <>
            <br />
            <>
                <Row>
                    <Col span={24}>
                        <UserOutlined  
                            style={{
                                color : "white", 
                                fontSize : "2rem"
                            }}/>
                    </Col>
                </Row>
                <hr />
                <br />

                <Row>
                    <Col span={10}>
                        <p>Kişi Sayisi:</p>
                    </Col>
                    <Col span={14}>
                        <Radio.Group
                            size="large"
                            value={roomType} onChange={placementChange}>
                                
                            <Radio.Button value="onePerson">Tek</Radio.Button>
                            <Radio.Button value="twoPerson">Çift</Radio.Button>
                            <Radio.Button value="family">Aile</Radio.Button>
                            <Radio.Button value="all">Tümü</Radio.Button>
                        </Radio.Group>

                    </Col>
                </Row>
            </>
            <br /> <br /> <br />
            <>
                <Row>
                    <Col span={24}>
                        <CalendarOutlined
                            style={{
                                color : "white", 
                                fontSize : "2rem"
                            }}/>
                    </Col>
                </Row>
                <hr />
                <br />

                <Row>
                    <Col span={8}>
                        <p>Tarih:</p>
                    </Col>
                    <Col span={16}>
                        <Space direction="vertical" size={24}>
                            <RangePicker  size="large"/>
    
                        </Space>
                    </Col>
                </Row>
            </>
        </>
    );
}
