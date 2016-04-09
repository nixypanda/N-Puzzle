import React, { PropTypes } from 'react';
import { Motion, spring } from 'react-motion';
import { Paper } from 'material-ui';


const layout = (value, { width, height, margin, N }) => ({
  // area of single tile X x-axis location of the value
  x: (width + 2 * margin + 2) * (value % N),
  // area of single tile X y-axis location of the value
  y: (height + 2 * margin + 2) * Math.floor(value / N)
});

// css for the grid (n-by-n)
const __gridStyle__ = ({ N, padding, width, height, margin }) => ({
  margin: 'auto',
  position: 'relative',
  boxSizing: 'border-box',
  cursor: 'default',
  padding: padding,
  width: N * (width + 2 * margin) + 2 * (padding),
  height: N * (height + 10 + 2 * margin) + 2 * (padding)
});

// css for the individual grids (non-zero)
const __cellStyle__ = ({ width, height, margin, fontSize }) => ({
  width: width,
  height: height,
  margin: margin,
  fontSize: fontSize,
  cursor: 'pointer',
  position: 'absolute'
});

// css for the cell with 0 in it
const __emptyCellStyle__ = ({ width, height, margin, fontSize }) => ({
  width: width,
  height: height,
  margin: margin,
  fontSize: fontSize,
  position: 'absolute',
  opacity: 0
});

const BoardLayout = (props) => {
  // Generating the layout for the board
  let board = props.board.map((tile, index) => {
    // 0: nothing else number on paper(material-ui)
    let cellStyle = (tile === 0) ? __emptyCellStyle__(props) : __cellStyle__(props);
    // location of tile
    let { x, y } = layout(index, props);
    let style = { tX: spring(x), tY: spring(y) };

    return (
      <Motion key={tile} style={style}>
        { ({ tX, tY }) =>
        <div
          style={{
            width: props.width + 2 * props.margin,
            transform: `translate3d(${tX}px,${tY}px,0) scale(1.1)`
          }}>
          <Paper
            className='text-center'
            onClick={props.onMouseClick.bind(null, index)}
            style={cellStyle}>
            <p className='center'>{tile}</p>
          </Paper>
        </div>}
      </Motion>
    );
  });

  return (
    <div style={__gridStyle__(props)}>
      {board}
    </div>
  );
};

// The default setup for the grid layout
BoardLayout.defaultProps = {
  width: 90,
  height: 90,
  margin: 5,
  padding: 10,
  fontSize: 30
};

// Just checking what was sent here
BoardLayout.propTypes = {
  N: PropTypes.number.isRequired,
  board: PropTypes.array.isRequired,

  width: PropTypes.number,
  height: PropTypes.number,
  padding: PropTypes.number,
  margin: PropTypes.number,
  fontSize: PropTypes.number,
  onMouseClick: PropTypes.func.isRequired
};

export default BoardLayout;
