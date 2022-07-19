import Slider from './client/Slider.js';
import './App.css';
import ResponsiveAppBar from "./client/ResponsiveAppBar.js";
import ContactUs from './client/ContactUs.js';
import LoginForm from './client/Login.js';
import { Routes, Route } from 'react-router';
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
      </Routes>
      </header>
    </div>
  );
}




export default App;