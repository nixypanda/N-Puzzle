"use strict";
import React, {Component, PropTypes} from 'react';
import RaisedButton from 'material-ui/lib/raised-button'; 
import CircularProgress from 'material-ui/lib/circular-progress';

class BottomText extends Component {
    render() {
        return (
            <div className='centered text-center'>
                <div className='col-sm-3'></div>
                <div className='col-sm-6'>
                    <p>
                        <b>Instructions:</b> Use the arrow keys to move
                        tiles. Space to reset. On clicking solve you
                        will get the solution in shortest number of
                        moves. Which can be accessed move-by-move
                        using the space key.
                    </p>
                    <p>
                        Hitting the button bellow will make
                        the computer to automaticaly solve the
                        problem and find the lowest number of moves
                        that are required to solve the puzzle. In
                        some cases the computer will find it hard to
                        solve the problem, it will respond by
                        not-responding.
                    </p>
                    <h5><b>You have been warned!!</b></h5>
                </div>
                <div className='col-sm-3'></div>
            </div>
        );
    }
}

/**
 *  This class handles the button that the app displays
 */
export default class BottomFrame extends Component {

    static propTypes = {
        autosolve: PropTypes.bool.isRequired,
        processing: PropTypes.bool.isRequired,
        activateAI: PropTypes.func.isRequired
    }

    /**
     * Handles the rendering of the button.
     * @return button The markup for the button
     */
    render() {
        if (this.props.processing) {
            return (<CircularProgress mode="indeterminate" />);
        }
        else if (! this.props.won) {
            return (
                <div className='centered text-center'>
                    <BottomText />
                    <div className='col-sm-12'>
                        <RaisedButton label='Solve' primary={true}
                            disabled={this.props.autosolve}
                            onClick={this.props.activateAI.bind(null, true)} />
                    </div>
                </div>

            );
        }

        else {
            let msg = this.props.autosolve ? 'And That\'s how you solve it..' : 'YOU WON!!';
            return (<h2 className='centered text-center'>{msg}</h2>);
        }
    }
}
