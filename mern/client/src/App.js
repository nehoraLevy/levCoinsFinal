import Slider from './views/Slider.js';
import './App.css';
import ResponsiveAppBar from "./views/ResponsiveAppBar.js";
import ContactUs from './views/ContactUs.js';
import LoginForm from './views/Login.js';
import { Routes, Route } from 'react-router';
import Chat from './views/chat.js';
import React from "react";
import ClientAppBar from './views/ClientAppBar.js';
import WarpTransfer from "./views/money transfer/WarpTransfer";
import CollapsibleTable from "./views/BankLoans.js";
import ManagerEmail from "./views/ManagerEmail.js"
import RegisterForm from './views/Register.js';
import WrapLoan from "./views/money transfer/WarpLoan.js";
import CurrentAccount from './views/CurrentAccount.js';
import UpdateDetails from './views/updatePersonalDetails.js';

function App() {
  return (
    
    <div className="App">
      <header className="App-header">
      <Routes>
          <Route  path="/" element={<ResponsiveAppBar/>}/>
          <Route path="/Home" element={<ResponsiveAppBar/>}/>
          <Route path="/Contact%20us" element={<ResponsiveAppBar/>}/>
          <Route path="/Login" element={<ResponsiveAppBar/>}/>
          <Route path="/Register" element={<ResponsiveAppBar/>}/>
          <Route  path="/client" element={<ClientAppBar/>}/>
          <Route  path="/client/Current" element={<ClientAppBar/>}/>
          <Route  path="/client/Loans" element={<ClientAppBar/>}/>
          <Route  path="/client/New%20Transfer" element={<ClientAppBar/>}/>
          <Route  path="/client/Update%20Details" element={<ClientAppBar/>}/>
          <Route  path="/client/New%20Loan" element={<ClientAppBar/>}/>
      </Routes>
      <Routes>
          <Route path="/" element={<Slider/>}/>
          <Route path="/Home" element={<Slider/>}/>
          <Route path="/Contact%20us" element={<ContactUs/>}/>
          <Route path="/Login" element={<LoginForm/>}/>
          <Route path="/Register" element={<RegisterForm/>}/>
          <Route  path="/client" element={<CurrentAccount/>}/>
          <Route  path="/client/Current" element={<CurrentAccount/>}/>
          <Route  path="/client/Loans" element={<CollapsibleTable/>}/>
          <Route  path="/client/New%20Transfer" element={<WarpTransfer/>}/>
          <Route  path="/client/Update%20Details" element={<UpdateDetails/>}/>
          <Route  path="/client/New%20Loan" element={<WrapLoan/>}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;