import React, { Component } from 'react'

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yes: false,
            no: false,
            either: false
        }

        this.handleClickYes = this.handleClickYes.bind(this);
        this.handleClickNo = this.handleClickNo.bind(this);
        this.handleClickEither = this.handleClickEither.bind(this);
    }

    handleClickYes() {
        console.log(this.state.yes)
        this.setState({yes: !this.state.yes});
        console.log(this.state.yes)
        if (!this.state.yes) {
            this.setState({no: false});
            this.setState({either: false});
        }
    }

    handleClickNo() {
        this.setState({no: !this.state.no});
        if (!this.state.no) {
            this.setState({yes: false});
            this.setState({either: false});
        }
    }

    handleClickEither() {
        this.setState({either: !this.state.either});
        if (!this.state.either) {
            this.setState({yes: false});
            this.setState({no: false});
        }
    }

    render() {
        const filter = this.props.filter
        // console.log(filter)

        let classNameYes = this.state.yes ? "filter-button-selected" : "filter-button-unselected";
        let classNameNo = this.state.no ? "filter-button-selected" : "filter-button-unselected";
        let classNameEither = this.state.either ? "filter-button-selected" : "filter-button-unselected";


        return (
        
        <div className="filter-list">
            <p>{filter}</p>
            <div className="filter-buttons">
                <button className={classNameYes} onClick={this.handleClickYes}>Yes</button>
                <button className={classNameNo} onClick={this.handleClickNo}>No</button>
                <button className={classNameEither} onClick={this.handleClickEither}>Either</button>
            </div>
        </div>
        )
    }
}
