import Searchbox from './Searchbox.js';
import React, { Component } from 'react';
import { getPlaces, random_food } from '../utils/utils';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          placeholder: random_food(),
          food: '',
        };
        
    }


    render() {
        return (
        <div className="navbar">
            <button className="menu-button"> 
                <img className="menu-img" src={require("../resources/images/burger-menu-2.png")} alt="menu" onClick={this.props.onMenuClick}/>
            </button>
            <button className="random-button" onClick={this.props.onRandomClick}>WHAT TO EAT?!</button>
        </div>
        )
    }
}
