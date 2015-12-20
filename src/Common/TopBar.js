"use strict";

import React, {Component, PropTypes} from 'react'

/** Importing the appbar from material-ui */
import AppBar from 'material-ui/lib/app-bar';

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
        let N = this.props.N;
        return <AppBar title={N + '-Puzzle'} />
    }
}
