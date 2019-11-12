import { Avatar, ClickAwayListener, Divider, Grid, Grow, Link, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Paper, Popper, Switch, withStyles } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import * as React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { getUserMail } from "../../../redux/actions/app/userEmailActions";
import { hasMail } from "../../../redux/actions/app/userEmailActions";



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

export interface AppDropDownMenuProps {
    open: boolean;
    anchorEl?: any;
    dispatch?: any;
    items?: any;
    data?: any[];
    classes?: any;
    hasMail?: boolean;
}

class _AppDropDownMenu extends React.Component<AppDropDownMenuProps, any> {

    public componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getUserMail());
    }
    public handleNotificationOff = () => (value: any) => {

        const vv = !this.props.hasMail;
        this.props.dispatch(hasMail(vv));

    }
    public render() {
        const that = this;
        const { open, anchorEl, data, classes, items } = this.props;
        const listItems: any = items;
        const listRenderer = (listData: any) => {
            const litems: any[] = listData.items;
            const innerList =
            listItems && litems.map((item, ix) => {
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
                return innerList;

        };
        return open === false ? null : (
            <Popper open={open} anchorEl={anchorEl} keepMounted transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={() => { open; }}>
                                <List className={classes.notifList} subheader={<li />}>
                                    <ListSubheader component="div" key="header">
                                        <Grid container justify="space-between">
                                            پیام های من
                                        <Switch
                                                color="secondary"
                                                checked={this.props.hasMail === true}
                                                onChange={this.handleNotificationOff().bind(this)}
                                                value="checkedA"
                                                inputProps={{ "aria-label": "secondary checkbox" }}
                                            />
                                        </Grid>
                                    </ListSubheader>
                                 {listRenderer(listItems)}
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
export const AppDropDownMenu = withStyles(styles as any)(_AppDropDownMenu);
