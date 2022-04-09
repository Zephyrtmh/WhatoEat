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
    console.log("state is changed " + this.state.extended);
  }

  render() {
    console.log("app rendered")
    const shops = ["moshi store", "good food", "best food", "shit store", "another store", "food store", "running out of names"];
    return (
      <div className="App">
        <Navbar onClick={this.handleMenuClick}/> 
        <body className="body-container">
         
          {/* <div className="shoplist-container">
            <Shoplist shops={shops}/>
          </div> */}
          {/* <div>
            <Map food={this.state.food != ''? this.state.food : this.state.placeholder}/>
          </div> */}
          
          <Sidebar extended={this.state.extended} />
          
        </body>
        
      </div>
    );
  }
}

export default App;
