"use strict";
import React, {Component} from 'react';
import RaisedButton from 'material-ui/lib/raised-button'; 

/**
 *  This class handles the button that the app displays
 */
export default class BottomFrame extends Component {
    /**
     * Handles the rendering of the button.
     * @return button The markup for the button
     */
    render() {
        // permanently disable the solve button if the user clicks it
        let disabled = false;
        if (this.props.autosolve) {
            disabled = true;
        }

        // TODO: display text processing when the computer is figuring out
        // minimal number of moves to solve the puzzle.
        if (this.props.processing) {
            return (<p>processing</p>);
        }

        // If the board is not in won state then display instructions and a
        // warning message to the user.
        else {
            if (! this.props.won) {
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

                            <RaisedButton label='Solve' primary={true}
                                disabled={disabled}
                                onClick={this.props.activateAI.bind(null, true)} />
                        </div>
                        <div className='col-sm-3'></div>
                    </div>
                );
            }

            else {
                if (this.props.autosolve) {
                    return (
                        <h2 className='centered text-center'>
                            And That's how you solve it..
                        </h2>
                    );
                }
                else {
                    return (
                        <h1 className='centered text-center'>YOU WON!!</h1>
                    );
                }
            }
        }
    }
}
