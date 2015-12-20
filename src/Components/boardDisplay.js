"use strict";

import React, {Component} from 'react';
import Paper from 'material-ui/lib/paper';

class CellLayout extends Component {
    constructor(props) {
        super(props);
    }

    cellStyle() {
        return {
            width: 90,
            height: 90,
            margin: 5,
            float: 'left',
            fontSize: 30,
            textAlign: 'center'
        }
    }

    render() {
        if (this.props.element !== 0) {
            return (
                <Paper zDepth={1} style={this.cellStyle()}>
                    <p className='center' >{this.props.element}</p>
                </Paper>
            );
        }
        else {
            return (<div style={this.cellStyle()}></div>);
        }

    }
}

class RowLayout extends Component {
    constructor(props) {
        super(props);
    }

    rowStyle() {
        return {
            width: this.props.N * 100,
            height: 100,
            position: 'relative',
            display: 'block'
        }
    }

    render() {
        var rowMarkup = this.props.row.map(function (element) {
            return (<CellLayout key={element} element={element} />);
        });
        return (<row style={this.rowStyle()}>{rowMarkup}</row>);
    }

}

export default class BoardLayout extends Component {
    constructor(props) {
        super(props);
    }

    gridStyle() {
        return {
            margin: 'auto',
            position: 'relative',
            boxSizing: 'border-box',
            cursor: 'default',
            padding: 10,
            width: this.props.N * 100 + 20,
            height: this.props.N * 100 + 20
        }
    }

    render() {
        let N = this.props.N;

        // conversion of the 1-d array to 2-d
        var oldBoard = this.props.board.slice(0);
        var newBoard = [];
        while(oldBoard.length) {
            newBoard.push(oldBoard.splice(0, this.props.N));
        }

        // generating the markup for the 2-d array
        var board = newBoard.map(function boardMarkup(row) {
            return (<RowLayout row={row} key={row} N={N} />);
        });

        return (
            <div style={this.gridStyle()} >{board}</div>
        );
    }
}
