import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    dialog: {
        border: '1px solid #e5e5e5'
    },
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
});

class Details extends React.Component {
    state = {}

    close = () => { this.props.close() }

    render() {
        const { classes, width, traffic_point } = this.props;
        const fullScreen = isWidthDown('sm', width);
        return (
            <Dialog
                fullScreen={fullScreen}
                disableBackdropClick={true}
                open={this.props.open}
                onClose={this.close}
                aria-labelledby="responsive-dialog-title"
                BackdropProps={
                    {
                        invisible: true
                    }
                }
                PaperProps={
                    {
                        elevation: 0,
                        className: classes.dialog
                    }
                }
            >
                <DialogTitle id="responsive-dialog-title">Details</DialogTitle>
                <DialogContent>
                    <List className={classes.root}>
                        <ListItem>
                            <ListItemText primary="Road type" secondary={traffic_point.road_type} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Road name" secondary={traffic_point.road_name} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="To do" secondary="Full information about the traffic point" />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.close()} color="secondary">Close</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

Details.propTypes = {
    classes: PropTypes.object.isRequired
};

export default compose(withWidth(), withStyles(styles, { withTheme: true }))(Details);