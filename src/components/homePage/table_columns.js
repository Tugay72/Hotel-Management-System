import {Tag} from 'antd';
import prices from '../room_prices'
import { useState } from 'react';


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
      dataIndex: "price",
      key: 'price',
      align : 'center',
      width : 196,
      defaultSortOrder: '',
      sorter: (a, b) => a.price - b.price,
      render: (text, record) => (
        <span>
          <p style={{fontSize : '0.75rem', color : 'black'}}>{calculatePrice(record.room_type, '2024-07-01', '2024-07-04')}</p>
        </span>
      ),
      //render: (text) => `$${text}`,
    },
];

const calculatePrice = (roomType, startDate, endDate) => {
  const room = prices.find(room => room.key === roomType);
  let totalPrice = 0;
  const days = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);

  if (room) {
    if (room.priceByDate.length !== 0) {
      var calculatedDays = days;
      console.log(days, calculatedDays)
      while (calculatedDays > 0) {


        room.priceByDate.some(data => {
          const dataStartDate = new Date(data.startDate);
          const dataEndDate = new Date(data.endDate);
          if (new Date(startDate) <= dataStartDate && new Date(endDate) >= dataStartDate && new Date(endDate) <= dataEndDate) {
            totalPrice += data.price * (1 + ((new Date(endDate) - dataStartDate) / (1000 * 60 * 60 * 24)));
            calculatedDays -= ((new Date(endDate) - dataStartDate) / (1000 * 60 * 60 * 24)) + 1;
          } 
          else if (new Date(startDate) >= dataStartDate && new Date(endDate) <= dataEndDate) {
            totalPrice += data.price * days;
            calculatedDays = 0;
          } 
          else if (new Date(startDate) <= dataEndDate && new Date(endDate) >= dataEndDate) {
            totalPrice += data.price * +((dataEndDate - new Date(startDate)) / (1000 * 60 * 60 * 24));
            calculatedDays -= ((dataEndDate - new Date(startDate)) / (1000 * 60 * 60 * 24));
          } 
          else if (new Date(startDate) <= dataStartDate && new Date(endDate) >= dataEndDate) {
            totalPrice += data.price * ((dataEndDate - dataStartDate) / (1000 * 60 * 60 * 24));
            calculatedDays -= ((dataEndDate - dataStartDate) / (1000 * 60 * 60 * 24));
          }
          else{
            totalPrice += calculatedDays * room.basePrice;
            return;
            
          }
        });
        
      }
      if (calculatedDays > 0) {
        totalPrice += calculatedDays * room.basePrice;
      }
    } 
    else {
      totalPrice = room.basePrice * days;
    }
  }
  return totalPrice;
};




export default allColumns;