import React, { Component } from 'react';
import { random_food } from '../utils/utils';
import { render } from '@testing-library/react';

class Searchbox extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.props.handleSubmit(this.state.value);
        event.preventDefault();
        console.log(this.state.value);
    }

    render() {
        return (
            <div className="searchbox">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} onChange={this.handleChange} placeholder={`${this.props.placeholder}?`} />
                    {/* <input type="submit" value="Submit" /> */}
                </form>
            </div>
        );
    }
}

export default Searchbox;



