import logo from './logo.svg';
import { Component } from 'react';
import './App.css';
import GoogleMap from './components/GoogleMap.js';
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
      location: {"lat": '', "lng": ''},
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
      let places = await getPlaces(this.state.foodItem, this.state.location.lat, this.state.location.lng)
      
      this.setState({places: places})
      this.state.places.map((place) => {
        console.log(place)
      })
      

      // console.log("reponse done")
      // console.log(response)
    }
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        this.setState({location: { "lat": lat, "lng": lng }});
      });
    } else {
      console.log("geolocation not available");
    }
  }

  render() {
    console.log("app rendered");
    
    return (
      <FoodContext.Provider value={this.state}>
        <body className="body-container">
          <div>
            <GoogleMap foodItem={this.state.foodItem != ''? this.state.foodItem : this.state.placeholder} location={this.state.location} places={this.state.places}/>
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
