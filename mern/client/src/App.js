import Slider from './views/Slider.js';
import './App.css';
import ResponsiveAppBar from "./views/ResponsiveAppBar.js";
import ContactUs from './views/ContactUs.js';
import LoginForm from './views/Login.js';
import { Routes, Route } from 'react-router';
import Chat from './views/chat.js';
import FormPage from './views/contact.js';
import React from "react";

import WarpTransfer from "./views/money transfer/WarpTransfer";
import CollapsibleTable from "./views/BankLoans.js";
import ManagerEmail from "./views/ManagerEmail.js"

import WrapLoan from "./views/money transfer/WarpLoan.js";
import CurrentAccount from './views/CurrentAccount.js';

/*
<FormPage/> not work

      <ResponsiveAppBar></ResponsiveAppBar>
      <Routes>
      <Route path="/" element={<Slider/>}/>
        <Route path="/Home" element={<Slider/>}/>
        <Route path="/Contact us" element={<ContactUs/>}/>
        <Route path="/Login" element={<LoginForm/>}/>
      </Routes>
*/

function App() {
  return (
    
    <div className="App">
      <header className="App-header">
      <ResponsiveAppBar></ResponsiveAppBar>
      <Routes>
        <Route path="/" element={<Slider/>}/>
          <Route path="/Home" element={<Slider/>}/>
          <Route path="/Contact%20us" element={<ContactUs/>}/>
          <Route path="/Login" element={<LoginForm/>}/>
          <Route path="/MangerHome" element={<ManagerEmail/>}/>
          <Route path="/UserHome" element={<CurrentAccount/>}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;