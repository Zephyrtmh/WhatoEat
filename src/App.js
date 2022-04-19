import logo from './logo.svg';
import { Component } from 'react';
import './App.css';
import Map from './components/Map.js';
import Shoplist from './components/Shoplist.js';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { FoodContext } from './Context/FoodContext';
import { getCurrLocation, getPlaces } from './utils/utils';


class App extends Component {

  static contextType = FoodContext;

  constructor(props) {
    super(props);
    this.state = {
      extended: false,
      foodItem: '',
      setFoodItem: this.setFoodItem,
      location: {"lat": '', "lon": ''},
      places: []
    };

    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.setFoodItem = this.setFoodItem(this);
  }

  handleMenuClick() {
    this.setState({extended: !this.state.extended});
  }

  setFoodItem = async (food) => {
    this.setState({foodItem: food});
    
    if (this.state.foodItem != '') {
      // let req = { "search": this.state.foodItem, "lat": this.state.location.lat, "lon": this.state.location.lon };
      // const response = await fetch("http://localhost:5000/places", {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(req)});
      // const places = await response.json()
      // this.setState({places: places})
      let places = await getPlaces(this.state.foodItem, this.state.location.lat, this.state.location.lon)
      this.setState({places: places})

      // console.log("reponse done")
      // console.log(response)
    }
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
    // const shops = ["moshi store", "good food", "best food", "shit store", "another store", "food store", "running out of names"];
    
    
    
    return (
      <FoodContext.Provider value={this.state}>
        <body className="body-container">
          <div>
            <Map foodItem={this.state.foodItem != ''? this.state.foodItem : this.state.placeholder}/>
          </div>
          <div className="sidebar-navbar">
            <div className = "sidebar-container">
              <Sidebar extended={this.state.extended} setFoodItem={this.setFoodItem}/>
            </div>
            <Navbar onClick={this.handleMenuClick}/>
          </div>

          <Shoplist shops={this.state.places} extended={this.state.extended}/>
        
          
        </body>
      </FoodContext.Provider>
    );
  }
}

export default App;
