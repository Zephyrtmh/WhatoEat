import React, { Component, useEffect } from 'react'
import Filter from './Filter';
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

        return (
        <div className={className}>
            <img id="logo-img"src={require("../resources/images/whatoeat-logo.png")}/>
            <ListFilters />
        </div>
        )
    }
}