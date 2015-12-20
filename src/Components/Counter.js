"use strict";

import React, {Component} from 'react';

import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

/**
 * This class displays the counter and the reset button at the top of the
 * board.
 */
export default class Counter extends Component {
    /**
     * Returns the styling for the div enclosing the counter and the reset
     * button
     */
    __topFrameStyle__() {
        return {
            width: this.props.N * 100,
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
            marginRight: this.props.N * 100 - 200,
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
                <div className='center' style={this.__resetButtonStyle__()} >
                    <RaisedButton style={this.__resetButtonStyle__()} 
                        onClick={this.props.reset} label='Reset' primary={true}/>
                </div>
            </div>
        );
    }

}
