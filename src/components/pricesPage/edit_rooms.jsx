import {React, useState} from "react";
import './edit_rooms.css';
import CustomNavbar from '../navbar';
import EditPrice from "./edit_price";


const EditPage = () => {
    const [roomType, setRoomTypeFilter] = useState([]);

    const handleFilterOptions = (roomType, formatString, today) => { //Not used!
      if (roomType != 'Tümü'){
        setRoomTypeFilter(roomType ? [roomType] : []);
      }
      else{
        setRoomTypeFilter(['Tek', 'Çift', 'Aile'])
      }
      
    }

    return(
        <>
        <CustomNavbar></CustomNavbar>
        <div className='Content'>
          <h1>EDIT PRICES</h1>
              <span id='filters-container'>
                <EditPrice onFilterOptions={handleFilterOptions}/>
              </span>
            </div>
        </>
    )
}

export default EditPage;