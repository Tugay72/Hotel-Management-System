import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./components/login_page/login_page";
import HomePage from './components/home_page'
import Navigation from './navigation';

function App() {
  return (
    <Router>
      <Navigation></Navigation>
        <Routes>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/loginpage" element={<LoginPage />} />
        </Routes>
    </Router>
  );
}

export default App;
