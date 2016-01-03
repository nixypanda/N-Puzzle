"use strict";

import React, {Component, PropTypes} from 'react';
import MUI, {RaisedButton, Paper, Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui';

import Colors from 'material-ui/lib/styles/colors';


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
            width: this.props.N * this.props.cellWidth + 80,
            margin: 'auto',
            backgroundColor: Colors.grey50 
        }
    }

    /**
     * Returns the styling for the counter.
     */
    __counterStyle__() {
        return {
            display: 'inline-block',
            width: 100,
            height: 40,
            textAlign: 'center',
        }
    }

    /**
     * Returns the markup for the whole component (i.e. the counter and the 
     * reset button).
     */
    render() {

        return (
            <Toolbar style={this.__topFrameStyle__()} > 
                <ToolbarGroup firstChild={true} float="left">
                    <RaisedButton label={'Moves: ' + this.props.count} />
                </ToolbarGroup>
                <ToolbarGroup lastChild={true} float="right">
                    <RaisedButton onClick={this.props.reset} label='Reset' primary={true}/>
                </ToolbarGroup>
            </Toolbar>
        );
    }

}
