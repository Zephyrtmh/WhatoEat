import React, { Component } from 'react'

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: 'undefined',
            yes: false,
            no: false,
            either: true,
            noFilterClicked: false,
            selection: 'either'
        }

        this.handleClickYes = this.handleClickYes.bind(this);
        this.handleClickNo = this.handleClickNo.bind(this);
        this.handleClickEither = this.handleClickEither.bind(this);
    }

    componentDidMount() {
        this.setState({ filterName: this.props.filterName });
    }

    componentDidUpdate() {
        this.props.handleFilterSelection(this.state.filterName, this.state.selection);
        console.log(this.state.filterName, this.state.selection);
        console.log("selection updated")
    }

    handleClickYes() {
        if (!this.state.yes) {
            this.setState({yes: !this.state.yes, noFilterClicked: false});
            this.setState({no: false});
            this.setState({either: false});
            this.setState({selection: true})
            // this.props.handleFilterSelection(this.state.filterName, this.state.selection)
        }
    }

    handleClickNo() {
        if (this.state.no == false) {
            this.setState({no: !this.state.no, noFilterClicked: false});
            this.setState({yes: false});
            this.setState({either: false});
            this.setState({selection: false})
            // this.props.handleFilterSelection({selection: 'no'})
        }
    }

    handleClickEither() {
        if (!this.state.either) {
            this.setState({either: !this.state.either, noFilterClicked: false});
            this.setState({yes: false});
            this.setState({no: false});
            this.setState({selection: 'either'})
            // this.props.handleFilterSelection({selection: 'either'})
        }
    }

    render() {
        
        if (this.props.toFilter == false && this.state.noFilterClicked == false) {
            this.setState({yes: false, no: false, either: true, noFilterClicked: true})
    
        }
        let classNameYes = this.state.yes ? "filter-button-selected" : "filter-button-unselected";
        let classNameNo = this.state.no ? "filter-button-selected" : "filter-button-unselected";
        let classNameEither = this.state.either ? "filter-button-selected" : "filter-button-unselected";
        return (
        
        <div className="filter-list">
            <p className="filter-title">{this.state.filterName}</p>
            <div className="filter-buttons">
                <button className={classNameYes} onClick={this.handleClickYes}>Yes</button>
                <button className={classNameNo} onClick={this.handleClickNo}>No</button>
                <button className={classNameEither} onClick={this.handleClickEither}>Either</button>
            </div>
        </div>
        )
    }
}
