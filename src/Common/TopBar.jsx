/* @flow */

import React from 'react';
import R from 'ramda';

import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import { grey50 } from 'material-ui/styles/colors';

type TopBarProps = {
  N: number,
  changeGame: (n: number) => void
};


/**
 * The bar to display at the top.
 * @param {TopBarProps} props The props passed to our top bar.
 * @return {React.Element<*>} Render information of the top bar.
 */
const TopBar = ({ N, changeGame }: TopBarProps): React.Element<*> => {
  const iconMenu = (
    <IconMenu
      iconButtonElement={<IconButton><NavigationMenu color={grey50} /></IconButton>}
      openDirection={'bottom-right'}
    >
      {
        R.range(2, 7).map((value) =>
          <MenuItem
            key={value}
            onClick={changeGame.bind(N, value)}
            primaryText={ (value * value - 1) + '-Puzzle' }
          />
        )
      }
    </IconMenu>
  );

  return (
    <AppBar
      iconElementLeft={iconMenu}
      title={(N * N - 1) + '-Puzzle'}
    />
  );
};

export default TopBar;
