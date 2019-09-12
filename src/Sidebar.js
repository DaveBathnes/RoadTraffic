// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

// Material UI
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { fade } from '@material-ui/core/styles/colorManipulator';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';

// Chart JS
import { HorizontalBar } from 'react-chartjs-2';

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

    render() {
        const { classes, selected_year, selected_authority, changeYear, changeAuthority, traffic_points, theme, percentages } = this.props;
        const data_setup = {
            labels: ['HGVs', 'Buses and coaches', 'Cars and taxis', 'Pedal cycles'],
            datasets: [
                {
                    backgroundColor: fade(theme.palette.primary.main, 0.6),
                    data: [percentages.all_hgvs, percentages.buses_and_coaches, percentages.cars_and_taxis, percentages.pedal_cycles],
                }
            ]
        };
        return (
            <div>
                <Typography variant="h5" component="h5" gutterBottom>Traffic Data</Typography>
                <ListSubheader>Filters: Annual Average Daily Flow By Direction</ListSubheader>
                <Divider />
                <br />
                <Typography variant="body2">Choose a year to see traffic flow data for that year.</Typography>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="sel-year">Year</InputLabel>
                    <Select
                        value={selected_year}
                        onChange={(e) => changeYear(e.target.value)}
                        input={<BootstrapInput name="year" id="sel-year" />}
                    >
                        <MenuItem value="2016">2016</MenuItem>
                        <MenuItem value="2017">2017</MenuItem>
                        <MenuItem value="2018">2018</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <Divider />
                <br />
                <Typography variant="body2">Choose an authority to look at traffic flow data for that area. Map data shown is the tarffic count for all motor vehicles.</Typography>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="sel-authority">Authority</InputLabel>
                    <Select
                        value={selected_authority}
                        onChange={(e) => changeAuthority(e.target.value)}
                        input={<BootstrapInput name="authority" id="sel-authority" />}
                    >
                        <MenuItem value="">Choose authority</MenuItem>
                        {this.props.authorities.sort((a, b) => { return a.name.localeCompare(b.name) })
                            .map(a => {
                                return <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>
                            })}
                    </Select>
                </FormControl>
                <br />
                <Divider />
                <br />
                <Typography variant="body2">To do: add vehicle type filters</Typography>
                <Typography variant="body2">To do: add direction filters and map indicators for direction</Typography>
                <Typography variant="body2">To do: check data source paging to ensure all data shown</Typography>
                <br />
                <Button color="primary" variant="outlined" onClick={() => this.props.getAverageDailyFlow()}>Refresh data</Button>
                <br />
                {
                    traffic_points.length > 0 ?
                        <React.Fragment>
                            <ListSubheader>Charts: Annual Average Daily Flow By Direction</ListSubheader>
                            <Divider />
                            <HorizontalBar
                                data={data_setup}
                                height={200}
                                options={{
                                    maintainAspectRatio: true,
                                    legend: {
                                        display: false
                                    },
                                    scales: {
                                        xAxes: [{
                                            ticks: {
                                                beginAtZero: true
                                            },
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Percentage %'
                                            }
                                        }]
                                    }
                                }}
                            />
                        </React.Fragment> : null
                }
            </div>
        );
    }
}

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(Sidebar);