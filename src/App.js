import logo from './logo.svg';
import { Component } from 'react';
import './App.css';
import Map from './components/Map.js';
import Shoplist from './components/Shoplist.js';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extended: false
    };

    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick() {
    this.setState({extended: !this.state.extended});
  }

  render() {
    console.log("app rendered")
    const shops = ["moshi store", "good food", "best food", "shit store", "another store", "food store", "running out of names"];
    return (
      <body className="body-container">
        {/* <div>
          <Map food={this.state.food != ''? this.state.food : this.state.placeholder}/>
        </div> */}
        <div className="sidebar-navbar">
          <div className = "sidebar-container">
            <Sidebar extended={this.state.extended} />
          </div>
          <Navbar onClick={this.handleMenuClick}/>
        </div>
          
        <Shoplist shops={shops} extended={this.state.extended}/>
        
        
      </body>
    );
  }
}

export default App;
