import "./edit_price.css";
import prices from "../room_prices";
import React, { useState } from "react";
import { Radio, Col, Row, DatePicker, Space, Button, Input, ConfigProvider, message } from 'antd';
import { UserOutlined, CalendarOutlined, DollarOutlined } from "@ant-design/icons";
import ErrorModal from '../modals/error_modal';

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

export default function EditPrice({ onFilterOptions }) {
  const [dates, setDates] = useState(null);
  const [roomType, setRoomType] = useState('Tek');
  const [basePrice, setBasePrice] = useState(0);
  const [price, setPrices] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  const placementChange = (e) => {
    setRoomType(e.target.value);
  };

  const selectedRoomBasePrice = (() => {
    const room = prices.find(room => room.key === roomType);
    return room ? room.basePrice : 'Enter price';
  })();

  const handleDateSelection = (values, formatString) => {
    setDates(formatString);
  };

  const showModal = (message) => {
    setErrorMessage(message);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const success = () => {
    messageApi.open({
        type: 'success',
        content: 'Success!',
    });
};

  function addPriceByDate(roomKey, startDate, endDate, basePrice, price) {
    const room = prices.find(room => room.key === roomKey);

    if (room) {
      basePrice ? room.basePrice = basePrice : console.log('Null entry');
      console.log("First:",room.priceByDate);
      console.log("Dates", startDate, endDate)
      if (room.priceByDate.length !== 0) {
        const overlappingDate = room.priceByDate.find(date => {
          return (startDate >= date.startDate && startDate <= date.endDate) ||
                 (endDate >= date.startDate && endDate <= date.endDate) ||
                 (startDate <= date.startDate && endDate >= date.endDate);
        });

        console.log("Overlapping :", overlappingDate);
        
        if(overlappingDate){
          showModal('The selected date range overlaps with existing dates. Do you want to delete existing data?')
        }
        else{
          room.priceByDate.push({ startDate, endDate, price });
          success();
        }
    } 
      else {
        room.priceByDate.push({ startDate, endDate, price });
        success()
      }
    }
    else {
      console.log(`Room with key ${roomKey} not found`);
      return;
    }
  }


  return (
    <ConfigProvider 
            theme={{
                components: {
                    
                    Radio: {
                        buttonCheckedBg: '#010E26',
                    },
                    Button : {
                        defaultHoverBg : '#f2f2f2',
                        defaultHoverColor: '#010E26',
                        defaultColor : '#f2f2f2',
                        defaultBg : '#1857f4',
                        defaultBorderColor: '#010E26',
                        defaultHoverBorderColor: '#f2f2f2'
                    }
                },
            }}
        >
      <br />
      {contextHolder}
      <Row>
        <Col span={12}>
          <UserOutlined style={{ color: "white", fontSize: "2rem" }} />
        </Col>
        <Col span={10}></Col>
      </Row>
      <hr />
      <br />

      <Row>
        <Col span={12}>
          <p>Room Type:</p>
        </Col>
        <Col span={12}>
          <Radio.Group size="large" value={roomType} onChange={placementChange}>
            <Radio.Button value="Tek">Single</Radio.Button>
            <Radio.Button value="Çift">Double</Radio.Button>
            <Radio.Button value="Aile">Family</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <br /><br />

      <Row>
        <Col span={24}>
          <CalendarOutlined style={{ color: "white", fontSize: "2rem" }} />
        </Col>
      </Row>
      <hr />
      <br />

      <Row>
        <Col span={8}>
          <p>Date:</p>
        </Col>
        <Col span={16}>
          <Space direction="vertical" size={24}>
            <RangePicker
              size="large"
              minDate={dayjs(formattedDate, dateFormat)}
              maxDate={dayjs('2024-09-31', dateFormat)}
              onChange={handleDateSelection}
            />
          </Space>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={12}>
          <DollarOutlined style={{ color: "white", fontSize: "2rem" }} />
        </Col>
        <Col span={10}></Col>
      </Row>
      <hr />
      <br />

      <Row>
        <Col span={10}>
          <p>Price:</p>
        </Col>
        <Col span={8}></Col>
        <Col span={5}>
        <Input
            size="large"
            type="number"
            placeholder={selectedRoomBasePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            />

        </Col>
      </Row>
      <br />
      <Row>
        <Col span={18}>
          <p>Price for selected date range:</p>
        </Col>
        <Col span={5}>
          <Input size={"large"} type="number" onChange={(e) => setPrices(e.target.value)}/>
        </Col>
      </Row>
      <Row>
        <Col span={10}></Col>
        <Col span={8}>
          <Button
            size="large"
            onClick={() => dates 
                ? addPriceByDate(roomType, dates[0], dates[1], basePrice,price) 
                : showModal('Be sure to enter your entry and exit dates!')}
          >
            Update
          </Button>
        </Col>
      </Row>

      <ErrorModal isModalOpen={isModalOpen} handleOk={handleOk} errorMessage={errorMessage} />
    </ConfigProvider>
  );
}
