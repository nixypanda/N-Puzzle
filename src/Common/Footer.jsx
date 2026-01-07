/* @flow */

import React from "react";

/**
* Returns render information of the footer component.
* @return {Reac.Element<*>} render info of footer
*/
const Footer = (): React.Element<*> => (
  <footer id="footer">
    <div className="container flex">
      <div className="left-flex">N-Puzzle</div>
      <div className="right-flex">by <a href="https://github.com/nixypanda" >nixypanda</a></div>
    </div>
  </footer>
);

export default Footer;
