import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';


const BottomText = ({ N }) => {
  let msg = 'On clicking solve you will get the solution in shortest number of moves.';
  msg = N < 5 ? msg : null;
  let instructions = (<p><b>Instructions:</b> Use the arrow keys to move tiles. {msg} </p>);

  return (
    <div className='container'>
      <div className='span12'>
        {instructions}
      </div>
    </div>
  );
};

BottomText.propTypes = {
  N: PropTypes.number.isRequired
};

const BottomFrame = (props) => {
  if (!props.won) {
    let solver = (
      <div className='col-sm-12'>
        <RaisedButton
          disabled={props.autosolve || !props.solvable}
          label='Solve'
          onClick={props.activateAI.bind(null, true)}
          primary={true} />
      </div>
    );

    let button = props.N < 5 ? solver : (<div></div>);
    let m = (!props.solvable ? 'This puzzle is not solvable' : <BottomText N={props.N} />);

    return (
      <div className='centered text-center'>
        {m}
        {button}
      </div>
    );
  }

  let m = props.autosolve ? 'And That\'s how you solve it.' : 'YOU WON!';
  return (<h2 className='centered text-center'>{m}</h2>);
};

BottomFrame.propTypes = {
  N: PropTypes.number.isRequired,
  won: PropTypes.bool.isRequired,
  autosolve: PropTypes.bool.isRequired,
  activateAI: PropTypes.func.isRequired,
  solvable: PropTypes.bool.isRequired
};

export default BottomFrame;
