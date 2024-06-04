import './home_page.css'
import React from "react";
import SearchContainer from "./search_container";

export default function HomePage () {
    return (
        <div className='App'>
            <span id='container'>
                <SearchContainer></SearchContainer>
            </span>
        </div>
    );
}