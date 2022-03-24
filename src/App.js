import logo from './logo.svg';
import { Component } from 'react';
import './App.css';
import Map from './components/Map.js';
import Shoplist from './components/Shoplist.js';
import Searchbox from './components/Searchbox.js';
import { random_food } from './utils/utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {placeholder: random_food(), food: ''};
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(food) {
    console.log("onSubmit is ran");
    this.setState({food: food});
    console.log(this.state.food);
  }

  render() {
    const shops = ["moshi store", "good food", "best food", "shit store", "another store", "food store", "running out of names"];
    
    return (
      <div className="App">
        <header className="navbar">
          <h1>WhatoEat</h1>
          <Searchbox placeholder={this.state.placeholder} handleSubmit = {this.handleSubmit}/>
        </header>
        <body className="body-container">
          <div className="shoplist-container">
            <Shoplist shops={shops}/>
          </div>
          <div>
            <Map food={this.state.food != ''? this.state.food : this.state.placeholder}/>
          </div>
          
        </body>
        
      </div>
    );
  }
}

export default App;
