import {Tag} from 'antd';

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
      dataIndex: 'price',
      key: 'price',
      align : 'center',
      width : 196,
      defaultSortOrder: '',
      sorter: (a, b) => a.price - b.price,
      render: (text) => `$${text}`,
    },
  ];

export default allColumns;