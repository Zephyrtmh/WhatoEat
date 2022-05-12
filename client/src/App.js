import logo from './logo.svg';
import { Component, useEffect } from 'react';
import './App.css';
import GoogleMap from './components/GoogleMap.js';
import Shoplist from './components/Shoplist.js';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { FoodContext } from './Context/FoodContext';
import { filterShops, getCurrLocation, getPlaces, random_food } from './utils/utils';


class App extends Component {

  static contextType = FoodContext;

  constructor(props) {
    super(props);
    this.state = {
      extended: false,
      foodItem: '',
      setFoodItem: this.setFoodItem,
      location: {"lat": '1.3521', "lng": '103.8198'},
      places: [],
      activePlace: ''
    };

    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.setFoodItem = this.setFoodItem(this);
    this.handleSortButton = this.handleSortButton.bind(this);
    this.handleRandomButtonClick = this.handleRandomButtonClick.bind(this); 
    this.handleShopGridClick = this.handleShopGridClick.bind(this);
    this.setCurrLoc = this.setCurrLoc.bind(this);
  }

  handleMenuClick() {
    this.setState({extended: !this.state.extended});
  }

  handleSortButton(choice) {
    // choice -> "distance" or "rating"
    const sortedShops = filterShops(choice, this.state.places, this.state.location)
    this.setState({places: sortedShops})
    console.log("shoplist sorted", sortedShops)
  }

  async handleRandomButtonClick() {
    //randomise places
    random_food([]).then((selectFood) => {
      this.state.setFoodItem(selectFood.food_name);
    });    
  }

  handleShopGridClick(activePlace) {
    this.setState({ activePlace: activePlace })
    console.log("activePlace: ", activePlace)
  }

  setCurrLoc = async (location) => {
    this.setState({ location: { "lat": location.lat, "lng": location.lng }})
    console.log("new location: ", this.state.location)
    let places = await getPlaces(this.state.foodItem, this.state.location.lat, this.state.location.lng)
    this.setState({places: places})
  }

  setFoodItem = async (food) => {
    
    this.setState({foodItem: food});
    console.log(food)
    
    if (this.state.foodItem != '') {
      let places = await getPlaces(this.state.foodItem, this.state.location.lat, this.state.location.lng)
      this.setState({places: places});
    }
  }

  componentDidMount() {
    console.log("location updated")
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        this.setState({location: { "lat": lat, "lng": lng }});
        console.log(this.state.location)
      });
    } else {
      console.log("geolocation not available");
    }
  }

  

  render() {
    console.log("app rendered");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        this.setState({location: { "lat": lat, "lng": lng }});
        console.log(this.state.location)
      });
    } else {
      console.log("geolocation not available");
    }
    
    return (
      <FoodContext.Provider value={this.state}>
        <body className="body-container">
          <div>
            <GoogleMap 
            foodItem={this.state.foodItem != ''? this.state.foodItem : this.state.placeholder} 
            location={this.state.location} 
            places={this.state.places}
            activePlace={this.state.activePlace}
            setCurrLoc={this.setCurrLoc}/>
            
          </div>
          <div className="sidebar-navbar">
            <div className = "sidebar-container">
              <Sidebar extended={this.state.extended} setFoodItem={this.setFoodItem}/>
            </div>
            <Navbar onMenuClick={this.handleMenuClick} onRandomClick={this.handleRandomButtonClick} />
          </div>

          <Shoplist shops={this.state.places} extended={this.state.extended} location={this.state.location} handleSortButton={this.handleSortButton} onShopGridClick={this.handleShopGridClick}/>
        
          
        </body>
      </FoodContext.Provider>
    );
  }
}

export default App;
