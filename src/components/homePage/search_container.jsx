import "./search_container.css"
import {React, useState} from "react";
import { Radio, Col, Row, DatePicker, Space, Button } from 'antd';
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const dateFormat = 'YYYY-MM-DD';
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate() + 1).padStart(2, '0');

const formattedDate = `${year}/${month}/${day}`;

const { RangePicker } = DatePicker;
export default function SearchContainer ({onFilterOptions}) {
    const [dates, setDates] = useState(null);
    const [roomType, setRoomType] = useState('Tek');
    const placementChange = (e) => {
        setRoomType(e.target.value);
    };

    const handleDateSelection = (formatString) => {
        setDates(formatString);
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
                                
                            <Radio.Button value="Tek">Tek</Radio.Button>
                            <Radio.Button value="Çift">Çift</Radio.Button>
                            <Radio.Button value="Aile">Aile</Radio.Button>
                            <Radio.Button value="Tümü">Tümü</Radio.Button>
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
                            <RangePicker  size="large"  
                                minDate={dayjs(formattedDate, dateFormat)}
                                maxDate={dayjs('2024-08-31', dateFormat)}
                                onChange={handleDateSelection}/>
                        </Space>
                    </Col>
                </Row>
                <br /> <br /> <br />
                <Row>
                    <Col span={10}></Col>
                    <Col span={8}>
                        <Button size="large" onClick={() => onFilterOptions(roomType, dates, formattedDate)}>Listele</Button>
                    </Col>
                </Row>
            </>
        </>
    );
}
