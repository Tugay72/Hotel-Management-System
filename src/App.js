import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./components/loginPage/login_page";
import HomePage from './components/homePage/home_page';
import EditPage from './components/pricesPage/edit_rooms';
import ReportPage from './components/reportPage/report_page';
import AddRooms from './components/newRoom/add_rooms';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/editPage" element={<EditPage />} />
          <Route path="/reportPage" element={<ReportPage />} />
          <Route path="/addRooms" element={<AddRooms />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
    </Router>
  );
}

export default App;
