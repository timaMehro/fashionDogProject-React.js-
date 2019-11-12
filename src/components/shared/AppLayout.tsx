import {
    AppBar, Avatar, Badge, Drawer, Grid, Icon,
    IconButton, Slide, Toolbar, withStyles, Tabs, Tab,
} from "@material-ui/core";
import clsx from "clsx";
import * as React from "react";
import { connect } from "react-redux";
import { drawer, getAll } from "../../redux/actions/app/drawerActions";
import { changeMode } from "../../redux/actions/app/themeActions";
import { notifications } from "../../redux/actions/app/userNotificationActions";
import { AppBreadcrumb } from "./AppBreadcrumb";
import { AppMenu } from "./AppDashboard/AppMenu";
import { AppDrawer } from "./AppDashboard/AppDrawer";
import { AppProfile } from "./AppDashboard/AppProfile";
import { AppBarView } from "./AppDashboard/AppBar";
import { appbar } from "../../redux/actions/app/appBarActions";

const styles = (theme: any) => ({
    "@global": {
        "*::-webkit-scrollbar": {
            width: 4,
        },
        "*::-webkit-scrollbar-track": {
            borderRadius: "15px",
            backgroundColor: theme.palette.primary.light,

        },
        "*::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.primary.main,
            outline: "1px solid slategrey",
        },
    },
    "root": {
        display: "flex",
        flex: 1,
        justifyContent: "stretch",
        alignItem: "stretch",
        height: "100vh",
    },
    tabs: {
        backgroundColor: theme.palette.secondary.dark,
        "& .MuiTab-root": {
            minWidth: 50,
            color: theme.palette.primary.contrastText,
        },
        "& .Mui-selected": {
            "& .MuiTab-wrapper": {
                flexDirection: "row"
            },
        }
    },
    "content": {
        flexGrow: 1,
        padding: theme.spacing(8, 3, 3),
        [theme.breakpoints.up("sm")]: {
            padding: theme.spacing(11, 3, 3),
        },
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.default,
        justifyContent: "stretch",
        overflow: "hidden",
        overflowY: "auto",

    },
});

export interface AppLayoutProps {
    classes?: any;
    theme?: any;
    dispatch?: any;
    drawer?: any;
    navigation?: any;
    buttons?: React.ReactNode;
    notifications?: any;
    enableNotification: any;
    status?: boolean;
}
function TabContainer(props: any) {
    return (
        <Grid component="div" style={{ padding: 0 }}>
            {props.children}
        </Grid>
    );
}
export class _AppLayout extends React.Component<AppLayoutProps, any> {
    constructor(props: any, states: any) {
        super(props, states);
    }
    public componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getAll());
        dispatch(appbar());

    }
    public state = {
        value: 0,
    };
    public handleChange = (event: any, value: any) => {
        this.setState({ value });
    }
    public render() {
        const { classes, navigation,buttons } = this.props;
        const { value } = this.state;
        return (
            <div className={classes.root}>
                {buttons && <AppBarView  icons={buttons}/>}
                <AppDrawer variant="permanent">
                    <AppProfile />
{navigation && <AppMenu items={navigation}></AppMenu>}


                </AppDrawer>
                <Slide direction="down" mountOnEnter unmountOnExit in={true} timeout={{ enter: 550, exit: 350 }}>
                    <main className={classes.content}>
                        <AppBreadcrumb />
                        {this.props.children}
                    </main>
                </Slide>
            </div>
        );
    }
}
const mapStatesToProps = (states: any) => {
    return {
        drawer: states.app.drawer,
        navigation: states.app.drawer.payload && states.app.drawer.payload.data,
        buttons: states.app.appbar.payload && states.app.appbar.payload.data,
    };
};
export const AppLayout = withStyles(styles as any)(connect(mapStatesToProps)(_AppLayout as any) as any);
