/* @flow */

import React from "react";
import { Motion, spring } from "react-motion";
import Paper from "material-ui/Paper";


type BoardLayoutPropsType = {
  N: number,
  board: Array<number>,
  width: number,
  height: number,
  padding: number,
  margin: number,
  fontSize: number,
  onMouseClick: (n: number) => void
};


/**
 * Based on height width margin calculate the location of the tile.
 *
 * @param {number} value The location of the cell on the array.
 * @param {number} width The width of the cell.
 * @param {number} height The height of the cell.
 * @param {number} margin The marign of the cell.
 * @param {number} N The size of the puzzle board.
 * @return {{ x: number, y: number }} Location on screen where the cell should be placed
 */
const layout = (value, { width, height, margin, N }) => ({
  // area of single tile X x-axis location of the value
  x: (width + 2 * margin + 2) * (value % N),
  // area of single tile X y-axis location of the value
  y: (height + 2 * margin + 2) * Math.floor(value / N)
});


// css for the grid (n-by-n)
const __gridStyle__ = ({ N, padding, width, height, margin }) => ({
  margin: "auto",
  position: "relative",
  boxSizing: "border-box",
  cursor: "default",
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
  cursor: "pointer",
  position: "absolute"
});


// css for the cell with 0 in it
const __emptyCellStyle__ = ({ width, height, margin, fontSize }) => ({
  width: width,
  height: height,
  margin: margin,
  fontSize: fontSize,
  position: "absolute",
  opacity: 0
});


/**
 * Layouts the n-puzzle board on the viewport.
 *
 * @param {BoardLayoutPropsType} props The props object.
 * @return {React.Element<*>} The render information for the board.
 */
const BoardLayout = (props: BoardLayoutPropsType): React.Element<*> => {
  // Generating the layout for the board
  const board = props.board.map((tile, index) => {
    // 0: nothing else number on paper(material-ui)
    const cellStyle = (tile === 0) ? __emptyCellStyle__(props) : __cellStyle__(props);
    // location of tile
    const { x, y } = layout(index, props);
    const style = { tX: spring(x), tY: spring(y) };

    return (
      <Motion key={tile} style={style}>
        { ({ tX, tY }: { tX: number, tY: number }) =>
        <div
          style={{
            width: props.width + 2 * props.margin,
            transform: `translate3d(${tX}px,${tY}px,0) scale(1.1)`
          }}
        >
          <Paper
            className="text-center"
            onClick={props.onMouseClick.bind(null, index)}
            style={cellStyle}
          >
            <p className="center">{tile}</p>
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

export default BoardLayout;
