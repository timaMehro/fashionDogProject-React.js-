import { Avatar, ClickAwayListener, Divider, Grid, Grow, Link, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Paper, Popper, Switch, withStyles } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import * as React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { getUserNotification } from "../../../redux/actions/app/userNotificationActions";
import { hasNotifications } from "../../../redux/actions/app/userNotificationActions";



const styles = (theme: any) => ({
    notifList: {
        "width": 350,
        "position": "relative",
        "overflow": "auto",
        "maxHeight": 250,
        "& .error i": {
            backgroundColor: "#ff1f5b",
        },
        "& .warning i": {
            backgroundColor: "#ffca00",
        },
        "& .info i": {
            backgroundColor: "#00c2ff",
        },
        "& i": {
            padding: theme.spacing(5),
        },
        "& div": {
            backgroundColor: theme.palette.background.paper,
        },
    },
    more: {
        "justifyContent": "center",
        "& i": {
            padding: 0,
        },
        "& span": {
            paddingLeft: theme.spacing(2),
            fontFamily: theme.typography.fontFamily,
        },
    },

});

export interface AppNotificationProps {
    open?: boolean;
    anchorEl?: any;
    dispatch?: any;
    data?: any[];
    classes?: any;
    hasNotifications?: boolean;
}

class _AppNotification extends React.Component<AppNotificationProps, any> {

    public componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getUserNotification());
    }
    public handleNotificationOff = () => (value: any) => {

        const vv = !this.props.hasNotifications;
        this.props.dispatch(hasNotifications(vv));

    }
    public render() {
        const { open, anchorEl, data, classes } = this.props;
        return open === false ? null : (
            <Popper open={open} anchorEl={anchorEl} keepMounted transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={() => { !open; }}>
                                <List className={classes.notifList} subheader={<li />}>
                                    <ListSubheader component="div" key="header">
                                        <Grid container justify="space-between">
                                            هشدارهای سیستم
                                        <Switch
                                                color="secondary"
                                                checked={this.props.hasNotifications === true}
                                                onChange={this.handleNotificationOff().bind(this)}
                                                value="checkedA"
                                                inputProps={{ "aria-label": "secondary checkbox" }}
                                            />
                                        </Grid>
                                    </ListSubheader>
                                    {
                                        data && data.map((item, ix) => {
                                            const cls = item.type === "E" ? "error" :
                                                item.type === "W" ? "warning" : "info";
                                            const icon = item.type === "E" ? "icon-circledelete" :
                                                item.type === "W" ? "icon-question-sign" : "icon-issue";
                                            return (
                                                <Zoom key={ix} in={true}
                                                    style={{ transitionDelay: `${(ix + 1) * 200}ms` }}>
                                                    <ListItem key={ix} className={cls}>
                                                        <ListItemAvatar>
                                                            <Avatar>
                                                                <i className={icon}></i>
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary={item.message}
                                                            secondary={<Moment unit="seconds" locale="fa"
                                                                fromNow>{item.date}</Moment>} />
                                                        <Divider variant="middle" />
                                                    </ListItem>
                                                </Zoom>
                                            );
                                        })
                                    }
                                    <ListItem key="footer" className={classes.more}>
                                        <Link href="#" color="inherit" className={classes.link}>
                                            <i className="icon-maximize"></i>
                                            <span>بیشتر ...</span>
                                        </Link>
                                    </ListItem>
                                </List>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        );
    }
}
const mapStatesToProps = (states: any) => {
    return {
        open: states.app.userNotification.open,
        data: states.app.userNotification.payload && states.app.userNotification.payload.data,
        hasNotifications: states.app.userNotification.enable,
    };
};
export const AppNotification = withStyles(styles as any)(connect(mapStatesToProps)(_AppNotification));
