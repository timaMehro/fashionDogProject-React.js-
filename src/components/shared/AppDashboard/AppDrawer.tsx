import * as React from "react";
import { connect } from "react-redux";
import { withStyles, Drawer, Grid, Avatar, Typography, Divider } from "@material-ui/core";
import clsx from "clsx";
import { AppMenu } from "./AppMenu";
import { getAll } from "../../../redux/actions/app/drawerActions";
import { push } from "connected-react-router";
const drawerWidth = 300;
const styles = (theme: any) => ({
    "drawer": {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
    },
    "drawerOpen": {
        "width": drawerWidth,
        "transition": theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        "backgroundColor": theme.palette.background.default,
        "overflow": "auto",
        "& ::-webkit-scrollbar": {
            width: 2,
            backgroundColor: "transparent",
        },

    },
    "drawerClose": {
        "transition": theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        "overflowX": "hidden",
        "width": theme.spacing(6) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(7) + 1,
        },
        "backgroundColor": theme.palette.background.default,
        "& .MuiListSubheader-root": {
            display: "none"
        },
        "& .collapse": {
            display: "none",
        },
    },
    copyright: {
        position: "absolute",
        bottom: 10,
        "& span": {
            fontSize: 12,
        }
    }
})
export interface AppDrawerProps {
    classes?: any;
    theme?: any;
    dispatch?: any;
    open?: any;
    variant: any;
    drawer?: any;
    navigation?: any;
}
class _AppDrawer extends React.Component<AppDrawerProps, any>{
    public componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getAll());
    }
    public handleCloseUserMenu(name: any) {
        this.setState(() => ({ [name]: false } as any));
    }
    public handelCpllapseClick(name: any) {
        this.setState((state: any) => ({ [name]: !state[name] } as any));
    }
    public render() {
        const { classes, variant, open } = this.props;
        return (

            <Drawer
                variant={variant || "permanent"}
                open={open}
                className={this.props.variant === "variant" ?
                    classes.test :
                    clsx(classes.drawer, {
                        [classes.drawerOpen]: this.props.drawer.open,
                        [classes.drawerClose]: !this.props.drawer.open,
                    })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: this.props.drawer.open,
                        [classes.drawerClose]: !this.props.drawer.open,
                    }),
                }}
            >
                {this.props.children}

                <Grid container direction="row"
                    alignItems="center" justify="space-around" className={classes.copyright}>
                    <Grid style={{ flexDirection:"column",textAlign: "center" }}>
                        <Avatar src="/static/img/bg/qlogin.jpg" />
                        <Typography component="span">
                            نسخه 1
                    </Typography>
                    </Grid>
                    {this.props.drawer.open && <Grid item>
                        <Typography component="h6">
                            کلیه حقوق محفوظ است.
                    </Typography>
                    </Grid>}
                </Grid>
                <Grid container justify="center" style={{ marginTop: 32 }}>
                </Grid>
            </Drawer>

        )
    }
}
const mapStatesToProps = (states: any) => {
    return {
        drawer: states.app.drawer,
    }
}
export const AppDrawer = withStyles(styles as any)(connect(mapStatesToProps)(_AppDrawer))