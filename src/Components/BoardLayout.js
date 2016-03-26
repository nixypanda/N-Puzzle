import React, { PropTypes } from 'react';
import { Motion, spring } from 'react-motion';
import { Paper } from 'material-ui';


export default class BoardLayout extends React.Component {

  layout = (value) => {
    const row = Math.floor(value / this.props.N);
    const col = value % this.props.N;
    return [
      (this.props.width + 2 * this.props.margin + 2) * col,
      (this.props.height + 2 * this.props.margin + 2) * row
    ];
  };

  // The default setup for the grid layout
  static defaultProps = {
    width: 90,
    height: 90,
    margin: 5,
    padding: 10,
    fontSize: 30
  };

  // Just checking what was sent here
  static propTypes = {
    N: PropTypes.number.isRequired,
    board: PropTypes.array.isRequired,

    width: PropTypes.number,
    height: PropTypes.number,
    padding: PropTypes.number,
    margin: PropTypes.number,
    fontSize: PropTypes.number,
    onMouseClick: PropTypes.func.isRequired
  };

  // css for the grid (n-by-n)
  __gridStyle__() {
    return {
      margin: 'auto',
      position: 'relative',
      boxSizing: 'border-box',
      cursor: 'default',
      padding: this.props.padding,
      width: this.props.N * (this.props.width + 2 * this.props.margin) + 2 * (this.props.padding),
      height: this.props.N * (this.props.height + 10 + 2 * this.props.margin) + 2 * (this.props.padding) + 20
    };
  }

  // css for the individual grids (non-zero)
  __cellStyle__() {
    return {
      width: this.props.width,
      height: this.props.height,
      margin: this.props.margin,
      fontSize: this.props.fontSize,
      cursor: 'pointer',
      position: 'absolute'
    };
  }

  // css for the cell with 0 in it
  __emptyCellStyle__ = () => ({ opacity: 0 })

  render() {
    // Generating the layout for the board
    let board = this.props.board.map((tile, index) => {
      let cellStyle = (index === 0) ? this.__emptyCellStyle__() : this.__cellStyle__();
      let x;
      let y;


      [ x, y ] = this.layout(this.props.board.indexOf(index));
      let style = { tX: spring(x), tY: spring(y) };

      return (
        <Motion key={index} style={style}>
          { ({ tX, tY }) =>
          <div
            style={{
              width: this.props.width + 2 * this.props.margin,
              transform: `translate3d(${tX}px,${tY}px,0) scale(1.1)`
            }}>
            <Paper
              className='text-center'
              onClick={this.props.onMouseClick.bind(null, index)}
              style={cellStyle}>
              <p className='center'>{index}</p>
            </Paper>
          </div>}
        </Motion>
      );
    });

    return (<div style={this.__gridStyle__()}>{board}</div>);
  }
}
