import {React, useState} from "react";
import './edit_rooms.css';
import hotel_data from '../hotel_data';
import allColumns from "./table_columns";
import CustomNavbar from './navbar';
import { Layout, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import EditPrice from "./edit_price";


const EditPage = () => {
    const [roomType, setRoomTypeFilter] = useState([]);

    const handleFilterOptions = (roomType, formatString, today) => {
        if (roomType != 'Tümü'){
          setRoomTypeFilter(roomType ? [roomType] : []);
        }
        else{
          setRoomTypeFilter(['Tek', 'Çift', 'Aile'])
        }
        
      }
    return(
        <>
        <div className='Content'>
              
              <span id='filters-container'>
                <EditPrice onFilterOptions={handleFilterOptions}/>
              </span>
            </div>
        <div id="data-table">
            <CustomNavbar></CustomNavbar>
            <Content>
                <Table dataSource={hotel_data} columns={allColumns}/>
            </Content>
        </div>
        </>
    )
}

export default EditPage;