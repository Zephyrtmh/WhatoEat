import Searchbox from './Searchbox.js';
import React, { Component } from 'react';
import { random_food } from '../utils/utils';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          placeholder: random_food(),
          food: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRandom = this.handleRandom.bind(this);
    }

    handleSubmit(food) {
        this.setState({food: food});
    }

    handleRandom() {
        this.setState({placeholder: random_food()});
        this.setState({food: ''});
    }

    render() {
        return (
        <div className="navbar">
            <button className="menu-button"> 
                <img className="menu-img" src={require("../resources/images/menu.png")} alt="menu" onClick={this.props.onClick}/>
            </button>
            <Searchbox placeholder={this.state.placeholder} handleSubmit = {this.handleSubmit}/>
            <button className="dice-button" onClick={this.handleRandom}> 
                <img className="dice-img" src={require("../resources/images/dice.png")} alt="menu"/>
            </button>
        </div>
        )
    }
}
