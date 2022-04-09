import React, { Component } from 'react'
import "./Sidebar.css";

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
            {className}
        </div>
        )
    }
}