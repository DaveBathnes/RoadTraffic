// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

// Material UI
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
});

const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

class Sidebar extends Component {
    state = {

    };

    componentDidMount = () => {
        this.setState({});
    }

    openDetails = () => this.setState({ info_dialog_open: true })
    closeDetails = () => this.setState({ info_dialog_open: false })

    changeYear = (id) => { this.props.changeYear(id) }
    changeAuthority = (id) => { this.props.changeAuthority(id) }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Typography variant="h4" component="h2" gutterBottom>Road Traffic Data</Typography>

                <Typography variant="body1">Choose a year for which data to return</Typography>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="sel-year">Year</InputLabel>
                    <Select
                        native
                        value={this.props.selected_year}
                        onChange={(e) => this.changeYear(e.target.value)}
                        input={<BootstrapInput name="year" id="sel-year" />}
                    >
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2018">2019</option>
                    </Select>
                </FormControl>

                <Typography variant="body1">Select an authority to retrieve data for that authority.</Typography>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="sel-authority">Authority</InputLabel>
                    <Select
                        native
                        value={this.props.selected_authority}
                        onChange={(e) => this.changeAuthority(e.target.value)}
                        input={<BootstrapInput name="authority" id="sel-authority" />}
                    >
                        <option value="">Choose authority</option>
                        {this.props.authorities.sort((a, b) => { return a.name.localeCompare(b.name) })
                        .map(a => {
                            return <option value={a.id}>{a.name}</option>
                        })}
                    </Select>
                </FormControl>

                <br />
                <Button color="primary" onClick={() => this.props.getAverageDailyFlow(71)}>Refresh data</Button>

            </div>
        );
    }
}

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Sidebar);