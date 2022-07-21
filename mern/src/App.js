import Slider from './client/Slider.js';
import './App.css';
import ResponsiveAppBar from "./client/ResponsiveAppBar.js";
import ContactUs from './client/ContactUs.js';
import LoginForm from './client/Login.js';
import { Routes, Route } from 'react-router';
import ManagerEmail from './client/ManagerEmail.js';

/*function App() {
  return (
    
    <div className="App">
      <header className="App-header">
      <ResponsiveAppBar></ResponsiveAppBar>
      
      </header>
      <body>
        <Routes>
        <Route path="/" element={<Slider/>}/>
          <Route path="/Home" element={<Slider/>}/>
          <Route path="/Contact" element={<ContactUs/>}/>
          <Route path="/Login" element={<LoginForm/>}/>
        </Routes>
      </body>
    </div>
  );
}*/

function App() {
  return (
    
    <div className="App">
      <header className="App-header">
      <ManagerEmail></ManagerEmail>
      
      </header>
      
    </div>
  );
}


export default App;