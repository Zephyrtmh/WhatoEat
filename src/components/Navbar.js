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
    }

    handleSubmit(food) {
        this.setState({food: food});
    }

    render() {
        return (
        <div className="navbar">
            <button className="menu-button"> 
                <img className="menu-img" src={require("../resources/images/menu.png")} alt="menu" onClick={this.props.onClick}/>
            </button>
            <Searchbox placeholder={this.state.placeholder} handleSubmit = {this.handleSubmit}/>
            <button className="dice-button"> 
                <img className="dice-img" src={require("../resources/images/dice.png")} alt="menu"/>
            </button>
        </div>
        )
    }
}
