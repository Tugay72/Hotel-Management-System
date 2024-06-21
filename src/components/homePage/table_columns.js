import {Tag} from 'antd';
import prices from '../room_prices'

const allColumns = (dates) => [
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
          <p style={{
            fontSize : '0.8rem',
            color : 'black',
            margin: '0.5rem',
            color : record.is_available ? 'green' : 'red',
            fontWeight: record.is_available ? '400' : '600',
            }}>
            {record.is_available ? '$' + calculatePrice(record.room_type, dates[0][0], dates[0][1]) : 'Satıldı!' }</p>
        </span>
      ),
      //render: (text) => `$${text}`,
    },
];

const calculatePrice = (roomType, startDate, endDate) => {
  const room = prices.find(room => room.key === roomType);
  var totalPrice = 0;
  const newStartDate = new Date(startDate) / (1000 * 60 * 60 * 24);
  const newEndDate = new Date(endDate) / (1000 * 60 * 60 * 24);
  const days = newEndDate - newStartDate;
  var calculatedDays = days;

  if (room) {
    if (room.priceByDate.length !== 0) {
      

        room.priceByDate.some(data => {
          const dataStartDate = new Date(data.startDate) / (1000 * 60 * 60 * 24);
          const dataEndDate = new Date(data.endDate) / (1000 * 60 * 60 * 24);
          
          const filteredPrice = data.price
          //console.log("Starting Here", days, 'D:', dataStartDate, dataEndDate, '--N:', newStartDate, newEndDate);
          if (newStartDate < dataStartDate && newEndDate > dataStartDate){
            if(newEndDate <= dataEndDate){
              totalPrice += filteredPrice * (newEndDate - dataStartDate);
              calculatedDays -= (newEndDate - dataStartDate);
              //console.log("Stage 1", "C:",calculatedDays, "T:", totalPrice)
            }
            else if (newEndDate > dataEndDate){
              totalPrice += filteredPrice * (dataEndDate - dataStartDate);
              calculatedDays -= dataEndDate - dataStartDate;
              //console.log("Stage 2", "C:",calculatedDays, "T:", totalPrice)
            }
          }
          else if(newStartDate >= dataStartDate && newStartDate < dataEndDate){
            if(newEndDate > dataEndDate){
              totalPrice += filteredPrice * (dataEndDate - newStartDate);
              calculatedDays -= (dataEndDate - newStartDate)
              //console.log("Stage 3", "C:",calculatedDays, "T:", totalPrice)
            }
            else if(newEndDate <= dataEndDate){
              totalPrice += filteredPrice * (newEndDate - newStartDate);
              calculatedDays = 0;

              //console.log("Stage 4", "C:",calculatedDays, "T:", totalPrice)
            }
          }
          // else if(newEndDate < dataStartDate || newStartDate > dataEndDate){
          //   console.log("Stage 5", "C:",calculatedDays, "T:", totalPrice)
          //   totalPrice += calculatedDays * room.basePrice;
          //   calculatedDays = 0;
          // }
          if (calculatedDays === 0) return;

          // if (new Date(startDate) <= dataStartDate && new Date(endDate) >= dataStartDate && new Date(endDate) <= dataEndDate) {
          //   totalPrice += data.price * (1 + ((new Date(endDate) - dataStartDate) / (1000 * 60 * 60 * 24)));
          //   calculatedDays -= ((new Date(endDate) - dataStartDate) / (1000 * 60 * 60 * 24)) + 1;
          //   console.log("Stage 1", calculatedDays)

          // } 
          // else if (new Date(startDate) >= dataStartDate && new Date(endDate) <= dataEndDate) {
          //   totalPrice += data.price * days;
          //   calculatedDays = 0;
          //   console.log("Stage 2", calculatedDays)
          // } 
          // else if (new Date(startDate) <= dataEndDate && &&new Date(endDate) >= dataEndDate) {
          //   totalPrice += data.price * +((dataEndDate - new Date(startDate)) / (1000 * 60 * 60 * 24));
          //   calculatedDays -= ((dataEndDate - new Date(startDate)) / (1000 * 60 * 60 * 24));
          //   console.log("Stage 3", calculatedDays)
          // } 
          // else if (new Date(startDate) <= dataStartDate && new Date(endDate) >= dataEndDate) {
          //   totalPrice += data.price * ((dataEndDate - dataStartDate) / (1000 * 60 * 60 * 24));
          //   calculatedDays -= ((dataEndDate - dataStartDate) / (1000 * 60 * 60 * 24));
          //   console.log("Stage 4", calculatedDays)
          // }
          
        });
        if (calculatedDays > 0) {
          //console.log("Base Price added")
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