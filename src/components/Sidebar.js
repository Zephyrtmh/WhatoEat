import React, { Component } from 'react'
import Filter from './Filter';

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let className = 'sidebar-hidden'
        if (this.props.extended === true) {
            className = 'sidebar-extended';
        }

        //temp array with filters
        const filters = ["spicy", "soup", "halal", "spicy"]

        const filterList = filters.map((filter) => {
            <li id={filter}><Filter filter={filter}/></li>
        })

        return (
        <div className={className}>
            <img id="logo-img"src={require("../resources/images/whatoeat-logo.png")}/>
            <ul id="filter-list">
                {filterList}
            </ul>
        </div>
        )
    }
}