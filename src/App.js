import logo from './logo.svg';
import { Component } from 'react';
import './App.css';
import Map from './components/Map.js';
import Shoplist from './components/Shoplist.js';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { FoodContext } from './Context/FoodContext';
import { getCurrLocation } from './utils/utils';


class App extends Component {

  static contextType = FoodContext;

  constructor(props) {
    super(props);
    this.state = {
      extended: false,
      foodItem: '',
      setFoodItem: this.setFoodItem,
      location: {"lat": '', "lon": ''}
    };

    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.setFoodItem = this.setFoodItem(this);
  }

  handleMenuClick() {
    this.setState({extended: !this.state.extended});
  }

  setFoodItem = (food) => {
    this.setState({foodItem: food});
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        this.setState({location: { "lat": lat, "lon": lon }});
      });
    } else {
      console.log("geolocation not available")
    }
  }

  render() {
    console.log("app rendered")
    console.log(this.state.foodItem)
    const shops = ["moshi store", "good food", "best food", "shit store", "another store", "food store", "running out of names"];
    
    return (
      <FoodContext.Provider value={this.state}>
        <body className="body-container">
          <p>{this.state.location.lat+', '+this.state.location.lon}</p>
          <div>
            <Map foodItem={this.state.foodItem != ''? this.state.foodItem : this.state.placeholder}/>
          </div>
          <div className="sidebar-navbar">
            <div className = "sidebar-container">
              <Sidebar extended={this.state.extended} setFoodItem={this.setFoodItem}/>
            </div>
            <Navbar onClick={this.handleMenuClick}/>
          </div>

          <Shoplist shops={shops} extended={this.state.extended}/>
        
          
        </body>
      </FoodContext.Provider>
    );
  }
}

export default App;
