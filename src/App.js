import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./components/loginPage/login_page";
import HomePage from './components//homePage/home_page'

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
    </Router>
  );
}

export default App;
