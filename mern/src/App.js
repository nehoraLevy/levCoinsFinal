import Slider from './client/Slider.js';
import './App.css';
import ResponsiveAppBar from "./client/ResponsiveAppBar.js";
import ContactUs from './client/ContactUs.js';
import LoginForm from './client/Login.js';
import CollapsibleTable from './client/BankLoans'
import { Routes, Route } from 'react-router';
import Converters from './client/converters.js';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Converters></Converters>
      
      </header>
    </div>
  );
}
export default App;