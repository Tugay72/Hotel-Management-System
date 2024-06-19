import "./edit_price.css"
import prices from "../room_prices"
import {React, useState} from "react";
import { Radio, Col, Row, DatePicker, Space, Button, Modal, Input } from 'antd';
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
export default function EditPrice ({onFilterOptions}) {
    
    const [dates, setDates] = useState(null);
    const [roomType, setRoomType] = useState('Tek');
    const [price, setPrice] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const placementChange = (e) => {
        setRoomType(e.target.value);
    };

    const handleDateSelection = (values,formatString) => {
        setDates(formatString);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    
      const handleOk = () => {
        setIsModalOpen(false);
    };



    function addPriceByDate(roomKey, date, price) {
        const room = prices.find(room => room.key === roomKey);
        if (room) {
            room.priceByDate.push({ date, price });
        } else {
            console.log(`Room with key ${roomKey} not found`);
        }
    }

    return (
        <>
            <br />
            <Row>
                <Col span={11}>
                    <Row>
                        <Col span={12}>
                            <UserOutlined  
                                style={{
                                    color : "white", 
                                    fontSize : "2rem"
                                }}/>
                        </Col>
                        <Col span={10}></Col>
                    </Row>
                    <hr />
                    <br />

                    <Row>
                        <Col span={10}>
                            <p>Oda Tipi:</p>
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
                    <br /> <br /> <br /> <br /> <br /> <br /> <br />
                
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
                                    maxDate={dayjs('2024-09-31', dateFormat)}
                                    onChange={handleDateSelection}/>
                            </Space>
                        </Col>
                    </Row>  
                </Col>

                <Col span={2}></Col>

                <Col span={11}>
                    <Row>
                        <Col span={12}>
                            <UserOutlined  
                                style={{
                                    color : "white", 
                                    fontSize : "2rem"
                                }}/>
                        </Col>
                        <Col span={10}></Col>
                    </Row>
                    <hr />
                    <br />

                    <Row>
                        <Col span={10}>
                            <p>Taban Fiyat:</p>
                        </Col>
                        <Col span={8}></Col>
                        <Col span={5}>
                            <Input size={"large"} type="number"></Input>

                        </Col>
                    </Row>
                    <br />
                    <Row>   
                        <Col span={14}>
                            <p>Seçilen Tarihler için Fiyat:</p>
                        </Col>
                        <Col span={4}></Col>
                        <Col span={5}>
                            <Input size={"large"} type="number"></Input>

                        </Col>
                    </Row>
                    <br /> <br /> <br /> <br /> <br /> <br /> <br />
                    <Row>
                        <Col span={18}></Col>
                        <Col span={6}>
                            <Button type="primary" size="large" onClick={() => dates 
                                ? addPriceByDate(roomType, dates, price)
                                : showModal()}>Güncelle</Button>
                        </Col>
                    </Row>
                    
                </Col>
            </Row>

            <Modal title="Error!" 
                open={isModalOpen} onOk={handleOk} onCancel={handleOk} 
                closable={false} 
                cancelButtonProps={{
                    disabled : true
                }}>
                <p id="modal-text">Be sure to enter your entry and exit dates!</p>
            </Modal>
        </>
    );
}
