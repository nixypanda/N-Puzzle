import React, { PropTypes } from 'react';
import MUI, { AppBar, IconMenu, IconButton, MenuItem } from 'material-ui';

import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu';
const Colors = MUI.Styles.Colors;


const TopBar = ({ N, changeGame }) => {
  let icon = (<IconButton><NavigationMenu color={Colors.grey50} /></IconButton>);

  let menuItems = [ ...Array(6).keys() ].map(index => index + 2).map((value) =>
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
