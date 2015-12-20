"use strict";

import React, {Component, PropTypes} from 'react'

/** Importing the appbar from material-ui */
import AppBar from 'material-ui/lib/app-bar';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import MenuItem from 'material-ui/lib/menus/menu-item';
import NavigationMenu from'material-ui/lib/svg-icons/navigation/menu';
import Colors from 'material-ui/lib/styles/colors';


/**
 * React class to display a top bar that at the moment only displays the name 
 * of the application.
 */
export default class TopBar extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        N: PropTypes.number.isRequired
    }

    /**
     * The required function for every react class it returns how
     * the top bar will look like.
     * @return {AppBar} A react class form material-ui theme
     */
    render() {
        let N = this.props.N * this.props.N - 1;
        return (
            <AppBar
                title={N + '-Puzzle'}
                iconElementLeft = {
                    <IconMenu openDirection={'bottom-right'} iconButtonElement={<IconButton><NavigationMenu color={Colors.grey50} /></IconButton>} >
                        <MenuItem primaryText="3-Puzzle" onClick={this.props.changeGame.bind(N, 2)} />
                        <MenuItem primaryText="8-Puzzle" onClick={this.props.changeGame.bind(N, 3)}/>
                        <MenuItem primaryText="15-Puzzle" onClick={this.props.changeGame.bind(N, 4)}/>
                        <MenuItem primaryText="24-Puzzle" onClick={this.props.changeGame.bind(N, 5)}/>
                        <MenuItem primaryText="35-Puzzle" onClick={this.props.changeGame.bind(N, 6)}/>
                        <MenuItem primaryText="48-Puzzle" onClick={this.props.changeGame.bind(N, 7)}/>
                    </IconMenu>
                    } />                
        );
    }
}
