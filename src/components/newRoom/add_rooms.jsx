import {React, useState} from "react";
import hotel_data from '../hotel_data';
import './add_rooms.css';
import CustomNavbar from '../navbar'
import { Input, ConfigProvider, Row, Col, Button, message } from "antd";

import { UserOutlined } from '@ant-design/icons';

const AddRooms = () => {
    const [guests, setGuests] = useState([0,0]);
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Yeni oda eklendi!',
        });
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Hata!',
        });
    };

    const handleClick = () => {

        if(guests[0] === 0){
            error()
            return;
        }

        const nextRoomId = hotel_data.length > 0 ? Math.max(...hotel_data.map(room => room.room_id)) + 1 : 1;
        var totalGuests = guests[0] + guests[1];
        var roomType;

        if(totalGuests == 1){
            roomType = 'Tek';
        }
        else if(totalGuests == 2){
            roomType = 'Çift';
        }
        else{
            roomType = 'Aile';
        }
        success()


        hotel_data.push({
            "room_id": nextRoomId,
            "number_of_adults": guests[0],
            "number_of_children": guests[1],
            "total_guests": totalGuests,
            "room_type": roomType,
            "is_available": 1,
            "available_after": 0,
            "price": 100
        })
    }

    return(
        <ConfigProvider
            theme={{
                components: {
                    
                    Button : {
                        defaultHoverBg : '#f2f2f2',
                        defaultHoverColor: '#010E26',
                        defaultColor : '#f2f2f2',
                        defaultBg : '#1857f4',
                        defaultBorderColor: '#010E26',
                        defaultHoverBorderColor: '#f2f2f2'
                    }
                },
            }}>

            {contextHolder}
            <CustomNavbar></CustomNavbar>
            <div className="add-room-page">
                <h1>ODA EKLE</h1>
                <div id="add-room-container">
                    <Row>
                        <UserOutlined  
                            style={{
                                color : "white", 
                                fontSize : "2rem"
                            }}/>
                    </Row>
                    <hr />
                    <br />

                    <Row>
                        <Col span={10}>
                            <p>Number of adults:</p>
                        </Col>
                        <Col span={10}/>
                        <Col span={4}>
                            <Input 
                                type="number" 
                                placeholder="0" 
                                min={0} max={5} 
                                onChange={(e) => setGuests(prevGuests => [parseInt(e.target.value), prevGuests[1]])}>
                            </Input>

                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <p>Number of children:</p>
                        </Col>
                        <Col span={8}/>
                        <Col span={4}>
                            <Input 
                                type="number" 
                                placeholder="0" 
                                min={0} max={5} 
                                onChange={(e) => setGuests(prevGuests => [prevGuests[0], parseInt(e.target.value)])}>
                            </Input>

                        </Col>
                    </Row>
                    <Button onClick={handleClick}>Add</Button>
                </div>
            </div>
            
        </ConfigProvider>
    )
}





export default AddRooms;