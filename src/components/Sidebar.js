import React, { Component } from 'react'
import ListFilters from './ListFilters';

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let className = 'sidebar-hidden'
        if (this.props.extended === true) {
            className = 'sidebar-extended';
        }
        let something = "something";

        return (
        <div className={className}>
            <div id="logo-img-container">
                <img id="logo-img"src={require("../resources/images/whatoeat-logo.png")} alt="Logo"/>
            </div>
    
            <ListFilters getFoodItem={this.props.getFoodItem} sonmething={something}/>
        </div>
        )
    }
}