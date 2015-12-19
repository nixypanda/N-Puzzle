"use strict";

import React, {Component} from 'react';

import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

export default class Counter extends Component {

    render() {
        return (
            <div className='misc'>
                <Paper className='counter' zDepth={1}>
                    <p >Moves: {this.props.count}</p>
                </Paper>
                <RaisedButton className='reset-button'
                    onClick={this.props.reset} label='Reset' primary={true}/>
            </div>
        );
    }

}
