import React, {PropTypes} from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

class BottomText extends React.Component {
  render() {
    let msg = 'On clicking solve you will get the solution in shortest number of moves.';
    msg = this.props.N < 5 ? msg : null;
    let instructions = ( <p><b>Instructions:</b> Use the arrow keys to move tiles. {msg} </p> );

    return (
      <div className='centered text-center'>
        <div className='col-sm-3'></div>
        <div className='col-sm-6'>
          {instructions}
        </div>
        <div className='col-sm-3'></div>
      </div>
    );
  }
}

/**
*  This class handles the button that the app displays
*/
export default class BottomFrame extends React.Component {

  static propTypes = {
    autosolve: PropTypes.bool.isRequired,
    activateAI: PropTypes.func.isRequired
  };

  /**
  * Handles the rendering of the button.
  * @return button The markup for the button
  */
  render() {

    if (! this.props.won) {
      let solver = (
        <div className='col-sm-12'>
          <RaisedButton label='Solve' primary={true}
            disabled={this.props.autosolve || !this.props.solvable}
            onClick={this.props.activateAI.bind(null, true)} />
        </div>
      );

      let button = this.props.N < 5 ? solver : (<div></div>);
      let m = ( !this.props.solvable? 'This puzzle is not solvable' : <BottomText N={this.props.N} /> );

      return (
        <div className='centered text-center'>
          {m}
          {button}
        </div>
      );
    }

    else {
      let m = this.props.autosolve ? 'And That\'s how you solve it.' : 'YOU WON!';
      return (<h2 className='centered text-center'>{m}</h2>);
    }
  }
}
