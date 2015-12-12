"use strict";

var React = require('react');
const Paper = require('material-ui/lib/paper');

/**
* This class handles the markup for the board class.
*/
var BoardDisplay = React.createClass({
    /**
    * Return the markup of the board class
    * @return {<div className='board'>{board}</div>}
    * The markup for a N by N board
    */
    render: function() {
        var makeMove = this.props.makeMove;
        // conversion of the 1-d array to 2-d
        var oldBoard = this.props.board.slice(0);
        var newBoard = [];
        while(oldBoard.length) {
            newBoard.push(oldBoard.splice(0, this.props.N));
        }

        // generating the markup for the 2-d array
        var board = newBoard.map(function boardMarkup(row) {
            var rowMarkup = row.map(function (element) {
                if (element !== 0) {
                    return (
                        <Paper zDepth={1} className='board-cell' key={element}>
                            <p>{element}</p>
                        </Paper>
                    );
                }
                else {
                    return (<div className='board-cell' key={element}></div>);
                }
            });
            return (<row className='board-row' key={row}>{rowMarkup}</row>);
        });

        // returning the markup
        return (
            <div className='board'>
                {board}
            </div>
        );
    }
});

module.exports = BoardDisplay;
