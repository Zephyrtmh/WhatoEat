import React, { Component } from 'react'

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        const filter = this.props.filter

        return (
        <div>{filter}</div>
        )
    }
}
