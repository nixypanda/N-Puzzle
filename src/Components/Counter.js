"use strict";

import React, {Component} from 'react';

import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

export default class Counter extends Component {
    __topFrameStyle__() {
        return {
            width: this.props.N * 100,
            height: 50,
            margin: 'auto'
        }
    }

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

    __resetButtonStyle__() {
        return {
            marginTop: 0,
            display: 'inline-block',
            width: 100
        }
    }

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
