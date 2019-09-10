// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';

// MUI Style
import blue from '@material-ui/core/colors/blue';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';

import Details from './Details';
import TrafficMap from './TrafficMap';

const theme = createMuiTheme({
	palette: {
		primary: blue,
		secondary: blueGrey
	},
	overrides: {
		MuiButton: {
			text: {
				textTransform: 'inherit'
			}
		}
	}
});

const styles = theme => ({
	root: {
		display: 'flex'
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	}
});

class App extends Component {
	state = {
		info_dialog_open: false,
		// map data
		fit_bounds: null,
		position: [-2.1000, 53.6138],
		zoom: [7],
		pitch: [0],
		bearing: [0],
		distance: 1609,
		current_position: []
	};

	componentDidMount = () => {
		this.setState({});
	}

	openDetails = () => this.setState({ info_dialog_open: true })
	closeDetails = () => this.setState({ info_dialog_open: false })

	render() {
		const { classes } = this.props;
		return (
			<MuiThemeProvider theme={theme}>
				<div className={classes.root}>
					<CssBaseline />
					<main className={classes.content}>
						<div className={classes.toolbar} />
						<TrafficMap
							bearing={this.state.bearing}
							fit_bounds={this.state.fit_bounds}
							pitch={this.state.pitch}
							position={this.state.position}
							current_position={this.state.current_position}
							zoom={this.state.zoom}
						/>
					</main>
					<Details
						open={this.state.info_dialog_open}
						close={() => this.closeDetails()}
					/>
				</div>
			</MuiThemeProvider>
		);
	}
}

App.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(App);