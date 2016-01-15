import React, {PropTypes} from 'react';
import {AppBar, IconMenu, IconButton, MenuItem} from 'material-ui';

import NavigationMenu from'material-ui/lib/svg-icons/navigation/menu';
import Colors from 'material-ui/lib/styles/colors';


/**
* React class to display a top bar that at the moment only displays the name
* of the application.
*/
export default class TopBar extends React.Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    N: PropTypes.number.isRequired
  };

  /**
  * The required function for every react class it returns how
  * the top bar will look like.
  * @return {AppBar} A react class form material-ui theme
  */
  render() {
    let N = this.props.N * this.props.N - 1;
    let icon = ( <IconButton><NavigationMenu color={Colors.grey50} /></IconButton> );
    let iconMenu = (
      <IconMenu openDirection={'bottom-right'} iconButtonElement={icon} >
        <MenuItem primaryText="3-Puzzle" onClick={this.props.changeGame.bind(N, 2)} />
        <MenuItem primaryText="8-Puzzle" onClick={this.props.changeGame.bind(N, 3)} />
        <MenuItem primaryText="15-Puzzle" onClick={this.props.changeGame.bind(N, 4)} />
        <MenuItem primaryText="24-Puzzle" onClick={this.props.changeGame.bind(N, 5)} />
        <MenuItem primaryText="35-Puzzle" onClick={this.props.changeGame.bind(N, 6)} />
        <MenuItem primaryText="48-Puzzle" onClick={this.props.changeGame.bind(N, 7)} />
      </IconMenu>
    );

    return (
      <AppBar
        title={ N + '-Puzzle' }
        iconElementLeft={ iconMenu } />
    );
  }
}
