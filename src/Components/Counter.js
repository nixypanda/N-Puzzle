"use strict";

import React, {Component, PropTypes} from 'react';
import MUI, {RaisedButton, Paper} from 'material-ui';
import {Motion, spring} from 'react-motion';

/**
 * This class displays the counter and the reset button at the top of the
 * board.
 */
export default class Counter extends Component {
    static porpTypes = {
        cellWidth: PropTypes.number
    }

    static defaultProps = {
        cellWidth: 100
    }

    /**
     * Returns the styling for the div enclosing the counter and the reset
     * button
     */
    __topFrameStyle__() {
        return {
            width: this.props.N * this.props.cellWidth + 20,
            height: 50,
            margin: 'auto'
        }
    }

    /**
     * Returns the styling for the counter.
     */
    __counterStyle__() {
        return {
            width: 100,
            height: 40,
            textAlign: 'center',
            marginRight: (this.props.N - 2) * this.props.cellWidth + 20,
            position: 'relative',
            display: 'inline-block'
        }
    }

    /**
     * Returns the styling fo the reset-button.
     */
    __resetButtonStyle__() {
        return {
            marginTop: 0,
            display: 'inline-block',
            width: 100
        }
    }

    /**
     * Returns the markup for the whole component (i.e. the counter and the 
     * reset button).
     */
    render() {
        return (
            <div style={this.__topFrameStyle__()}> 
                <Paper style={this.__counterStyle__()} zDepth={1}>
                    <p className='center'>Moves: {this.props.count}</p>
                </Paper>
                <div className='center' style={this.__resetButtonStyle__()}>
                    <RaisedButton style={this.__resetButtonStyle__()} 
                        onClick={this.props.reset} label='Reset' primary={true}/>
                </div>
            </div>
        );
    }

}
