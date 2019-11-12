import * as React from "react";
import { withStyles, AppBar, Toolbar, Grid, IconButton, Icon, Badge } from "@material-ui/core";
import { connect } from "react-redux";
import clsx from "clsx";
import { AppNotification } from "./AppNotification";
import { changeMode } from "../../../redux/actions/app/themeActions";
import { drawer, getAll } from "../../../redux/actions/app/drawerActions";
import { notifications } from "../../../redux/actions/app/userNotificationActions";
import { AppDropDownMenu } from "./AppDropDownMenu";
import { getUserMail, mails } from "../../../redux/actions/app/userEmailActions";


const drawerWidth = 300;
const styles = (theme: any) => ({
    "appBar": {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: theme.palette.secondary.main,
    },
    "appBarShift": {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    "toolbarIcon": {
        "marginLeft": theme.spacing(1),
        "& i": {
            fontSize: "1.2rem",
            padding: "0 2px",
            color: theme.palette.primary.contrastText,
        },
        "& img": {
            maxWidth: 48,

        },
    },
    "appBarIcon": {
        color: theme.palette.primary.contrastText,
    },
})

export interface AppBarProps {
    theme?: any;
    classes?: any;
    dispatch?: any;
    drawer?: any;
    icons?: any;
    enableNotification?: any;
    notifications?: any;
    buttons?: any;
    mail?: any;
    openMail?: any;
}

export class _AppBar extends React.Component<AppBarProps, any>{
    public componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getAll());
        dispatch(getUserMail())

    }
    public handleToggleSettings = (value: any) => () => {
        if (value === "darkMode") {
            this.props.dispatch(changeMode(!this.props.theme.isDark));
        }
        if (value === "drawer") {
            this.props.dispatch(drawer(!this.props.drawer.open));
        }
        if (value === "notification") {
            this.props.dispatch(notifications(!this.props.notifications.open));
        }
        if (value === "mail") {
        this.props.dispatch(mails(!this.props.mail.open));
        }

    }
    public render() {
        const that = this;
        const { classes, dispatch, drawer, enableNotification, icons, mail,openMail } = this.props;
        const iconItems: any = icons;
        const listRenderer = (iconData: any) => {
            const mitems: any[] = iconData.items;
            const List =
                iconItems && mitems.map((item, ix) => {
                    if (item.badge) {
                        return (
                            <IconButton color="inherit" className={classes.toolbarIcon} key={ix}
                                onClick={that.handleToggleSettings(item.id).bind(that)}
                            >
                                <Badge
                                    color="primary" badgeContent={12}>
                                    <Icon className={classes.appBarIcon}>{item.icon}</Icon>
                                </Badge>
                            </IconButton>
                        )
                    }
                    if (item.icon2) {
                        return (
                            <IconButton ref={item.id as any} color="inherit" className={classes.toolbarIcon}
                                key={ix}
                                onClick={that.handleToggleSettings(item.id).bind(that)}
                            >
                                <Icon className={classes.appBarIcon}>
                                    {enableNotification
                                        ? item.icon2
                                        : item.icon}
                                </Icon>
                            </IconButton>
                        )
                    } else {
                        return (
                            <IconButton ref={item.id as any} color="inherit" className={classes.toolbarIcon}
                                key={ix}
                                onClick={that.handleToggleSettings(item.id).bind(that)}
                            >
                                <Icon className={classes.appBarIcon}>{item.icon}</Icon>
                            </IconButton>
                        );
                    }
                });
            return List;
        };
        return (
            <AppBar
                color="inherit"
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: this.props.drawer.open,
                })}>
                <Toolbar>
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>
                            <IconButton
                                color="inherit"
                                style={{ marginRight: "-16px" }}
                                className={clsx(classes.toolbarIcon, {
                                    [classes.toolbarIcon]: drawer.open,
                                })}
                                onClick={
                                    this.handleToggleSettings("drawer").bind(this)}>
                                <Icon className={classes.appBarIcon}>
                                    {drawer.open
                                        ? "close"
                                        : "menu"}</Icon>

                            </IconButton>
                        </Grid>
                        <Grid item>
                            {listRenderer(iconItems)}
                            <AppNotification anchorEl={this.refs.notification} />
                            {/* {mail && mail.payload && <AppDropDownMenu items={mail.payload.data} open={!mail.open}/>} */}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    }
}
const mapStateToProps = (states: any) => {
    return {
        theme: states.app.theme,
        drawer: states.app.drawer,
        notifications: states.app.userNotification,
        enableNotification: !states.app.userNotification.enable,
        mail: states.app.userMail, 
    }
}
export const AppBarView = withStyles(styles)(connect(mapStateToProps)(_AppBar as any) as any);
