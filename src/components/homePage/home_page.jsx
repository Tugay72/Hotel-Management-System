import './home_page.css'
import React from "react";
import SearchContainer from "./search_container";

export default function HomePage () {
    return (
        <div className='Home'>
            <span id='home-container'>
                <SearchContainer></SearchContainer>
            </span>
        </div>
    );
}