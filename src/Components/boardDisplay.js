"use strict";

import React, {Component, PropTypes} from 'react';
import MUI, {Paper} from 'material-ui';

/**
 * CellLayout handles the layout of every cell.
 */
class CellLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {hover: false}

        this.__handleMouseOver__ = this.__handleMouseOver__.bind(this);
        this.__handleMouseOut__ = this.__handleMouseOut__.bind(this);
    }

    // Every prop is required to maintain consistency (grid, row and cell)
    static propTypes = {
        element: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        margin: PropTypes.number.isRequired,
        fontSize: PropTypes.number.isRequired 
    }

    // When mouse enters a cell increase it's shadow so it pops
    __handleMouseOver__() {
        this.setState({hover: true});
    }

    // When mouse exits a cell decreace it's shadow so it flattens
    __handleMouseOut__() {
        this.setState({hover: false});
    }

    // css of every cell
    __cellStyle__() {
        return {
            width: this.props.width,
            height: this.props.height,
            margin: this.props.margin,
            fontSize: this.props.fontSize,
            float: 'left',
            textAlign: 'center'
        }
    }

    render() {
        // how much shadow based on mousing is hovering over it or not
        let zDepth = (this.state.hover) ? 2 : 1;

        // Display every number on a paper except 0
        if (this.props.element !== 0) {
            return (
                <Paper 
                    onMouseOver={this.__handleMouseOver__}
                    onMouseOut={this.__handleMouseOut__}
                    onClick={this.props.onMouseClick.bind(null, this.props.element)}
                    zDepth={zDepth}
                    style={this.__cellStyle__()}>
                    <p className='center' >{this.props.element}</p>
                </Paper>
            );
        }
        // show nothing if 0
        else {
            return (<div style={this.__cellStyle__()}></div>);
        }

    }
}


/**
 * This class handles the markup for a given row
 */
class RowLayout extends Component {
    constructor(props) {
        super(props);
    }

    // every prop is required so consistency is maintained on all
    // levels of (i.e. grid > row > cell)
    static propTypes = {
        N: PropTypes.number.isRequired,
        row: PropTypes.array.isRequired,

        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        fontSize: PropTypes.number.isRequired,
        margin: PropTypes.number.isRequired

    }

    // css for every row ()
    __rowStyle__() {
        return {
            width: this.props.N * (this.props.width + 2 * this.props.margin),
            height: this.props.height + 2 * this.props.margin,
            position: 'relative',
            display: 'block'
        }
    }

    // Markup for the row
    render() {
        // this is stupid
        let width = this.props.width, height = this.props.height, margin = this.props.margin, fontSize = this.props.fontSize;
        let onMouseClick = this.props.onMouseClick;
        let rowMarkup = this.props.row.map(function (element) {
            return (
                <CellLayout
                    key={element} element={element} 
                    onMouseClick={onMouseClick}
                    width={width} height={height} margin={margin} fontSize={fontSize} />
            );
        });
        return (<row style={this.__rowStyle__()}>{rowMarkup}</row>);
    }

}


/**
 * The markup for the the entire grid
 */
export default class BoardLayout extends Component {
    constructor(props) {
        super(props);
    }

    // The default setup for the grid layout
    static defaultProps = {
        width: 90,
        height: 90,
        margin: 5,
        padding: 10,
        fontSize: 30
    }

    // Just checking what was sent here
    static propTypes = {
        N: PropTypes.number.isRequired,
        board: PropTypes.array.isRequired,

        width: PropTypes.number,
        height: PropTypes.number,
        padding: PropTypes.number,
        margin: PropTypes.number,
        fontSize: PropTypes.number
    }

    // css for the grid (n-by-n)
    __gridStyle__() {
        return {
            margin: 'auto',
            position: 'relative',
            boxSizing: 'border-box',
            cursor: 'default',
            padding: this.props.padding,
            width: this.props.N * (this.props.width + 2 * this.props.margin) + 2 * (this.props.padding),
            height: this.props.N * (this.props.height + 2 * this.props.margin) + 2 * (this.props.padding)
        }
    }

    render() {
        let N = this.props.N;

        // this is stupid
        let width = this.props.width, height = this.props.height, margin = this.props.margin, fontSize = this.props.fontSize;
        let onMouseClick = this.props.onMouseClick;

        // conversion of the 1-d array to 2-d
        let oldBoard = this.props.board.slice(0);
        let newBoard = [];
        while(oldBoard.length) {
            newBoard.push(oldBoard.splice(0, this.props.N));
        }

        // generating the markup for the 2-d array
        let board = newBoard.map(function boardMarkup(row) {
            return (
                <RowLayout 
                    row={row} key={row} N={N} 
                    onMouseClick={onMouseClick}
                    width={width} height={height} margin={margin} fontSize={fontSize} />
            );
        });

        return (
            <div style={this.__gridStyle__()} >{board}</div>
        );
    }
}
