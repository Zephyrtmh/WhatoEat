import React, { Component } from 'react'
import "./Sidebar.css";

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {extended : props.extended}
    }

    
    

    render() {
        
        return (
        <div className="sidebar-container">
            something
        </div>
        )
    }
}