import React, { Component } from 'react';
import { random_food } from '../utils/utils';
import { render } from '@testing-library/react';

class Searchbox extends Component {
    constructor(props) {
        super(props);
        this.state = {searchboxValue: ''};

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({searchboxValue: event.target.value});
    }

    handleSubmit(event) {
        this.props.handleSubmit(this.state.searchboxValue);
        event.preventDefault();
    }

    render() {
        return (
            <div className="searchbox">
                <form  onSubmit={this.handleSubmit}>
                    <input className="searchbox-submit" type="text" value={this.state.searchboxValue} onChange={this.handleChange} placeholder={`${this.props.placeholder}?`} />
                    {/* <input type="submit" value="Submit" /> */}
                </form>
            </div>
        );
    }
}

export default Searchbox;



