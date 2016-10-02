import React, { PropTypes } from 'react';

import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import { grey50 } from 'material-ui/styles/colors';


const TopBar = ({ N, changeGame }) => {
  let icon = (<IconButton><NavigationMenu color={grey50} /></IconButton>);

  let menuItems = [ ...Array(5).keys() ].map(index => index + 2).map((value) =>
    <MenuItem
      key={ value }
      onClick={ changeGame.bind(N, value) }
      primaryText={ (value * value - 1) + '-Puzzle' } />
  );

  let iconMenu = (
    <IconMenu iconButtonElement={icon} openDirection={'bottom-right'} >
      {menuItems}
    </IconMenu>
  );

  return (<AppBar iconElementLeft={ iconMenu } title={ (N * N - 1) + '-Puzzle' } />);
};

TopBar.propTypes = {
  N: PropTypes.number.isRequired,
  changeGame: PropTypes.func.isRequired
};

export default TopBar;
