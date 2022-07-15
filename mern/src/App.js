import Slider from './client/slider.js';
import './App.css';
import ResponsiveAppBar from "./client/ResponsiveAppBar.js";
//import ContactUs from './client/contactUs.js';
import RegisterForm from './client/Register.js';
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <ResponsiveAppBar></ResponsiveAppBar>
      </header>
      <Slider></Slider>
    </div>
  );
}




export default App;
