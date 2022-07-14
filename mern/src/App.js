import logo from './logo.svg';
//
import Slider from './client/slider.js';
import './App.css';
import ResponsiveAppBar from "./client/ResponsiveAppBar.js";
import LoginWithGoogle from "./client/LoginWithGoogle";
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <ResponsiveAppBar></ResponsiveAppBar>
      </header>
      <Slider></Slider>
      <LoginWithGoogle></LoginWithGoogle>
    </div>
  );
}

export default App;
