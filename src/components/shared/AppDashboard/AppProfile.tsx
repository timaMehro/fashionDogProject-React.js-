import * as React from "react";
import { Grid, Avatar, withStyles, IconButton } from "@material-ui/core";
import Fingerprint from "@material-ui/icons/Fingerprint";
import clsx from "clsx";
import { connect } from "react-redux";
import { getAll } from "../../../redux/actions/app/drawerActions";
import { userProfile } from "../../../redux/actions/app/appProfileActions";
import { appbar } from "../../../redux/actions/app/appBarActions";
import { push } from "react-router-redux";

const styles = (theme: any) => ({
    profile: {
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center",
        "marginTop": theme.spacing(8),
        "padding": theme.spacing(3),
        "backgroundColor": theme.palette.secondary.main,
        "& .profclass": {
            display: "none",
        },

    },
    profileBig: {
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center",
        "marginTop": theme.spacing(8),
        "padding": theme.spacing(3),
        "backgroundColor": theme.palette.secondary.main,
        "& .profileName": {
            fontFamily: theme.typography.fontFamily,
            paddingTop: theme.spacing(2),
            color: theme.palette.primary.contrastText,
        },
    },
    fingerprint: {
        color: theme.palette.primary.light,
        marginRight: theme.spacing(1),
    },
    avatar: {
        width: 100,
        height: 100,
    },
    "drawerSlogan": {
        height: 64,
        position: "fixed",
        zIndex: 9999,
        color: theme.palette.primary.contrastText,
        fontFamily: theme.typography.fontFamily,
        backgroundColor: theme.palette.secondary.dark,
        borderBottom: "1px solid rgb(100,100,100,0.5)",
    },
    slogan: {
        left: 0,
        width: 300,
        position: "inherit",
        textAlign: "center"
    },
})

export interface AppProfileProps {
    classes?: any;
    drawer?: any;
    dispatch?: any;
    profiles?: any;
    title?: any
}

export class _AppProfile extends React.Component<AppProfileProps, any> {
    public componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getAll());
        dispatch(userProfile());
        dispatch(appbar());
    }
    public render() {
        const { classes, drawer, profiles, title,dispatch } = this.props;
        return (
            <React.Fragment>
                <Grid container justify="center" alignItems="center" className={classes.drawerSlogan}>
                    <div className={classes.slogan}>
                        <h3>
                            {title && title.title}
                        </h3>
                    </div>

                </Grid>
                <Grid
                    className={clsx({
                        [classes.profileBig]: drawer.open,
                        [classes.profile]: !drawer.open,
                    })}
                >
                    <Avatar
                        className={clsx({ [classes.avatar]: drawer.open })}
                        alt="avatar" src={profiles && profiles.avatar} />
                    <div className="profclass">
                        <IconButton
                            onClick={() => {
                                dispatch(push(`/admin/configurations/profile`))
                            }}
                            size="small" className={classes.fingerprint}>
                            <Fingerprint />
                        </IconButton>
                        <span className="profileName">
                            {profiles && profiles.name}
                        </span>
                    </div>
                </Grid>
            </React.Fragment>
        )
    }
}
const mapStatesToProps = (states: any) => {
    return {
        drawer: states.app.drawer,
        title: states.app.appbar.payload && states.app.appbar.payload.data,
        profiles: states.app.appProfile.payload && states.app.appProfile.payload.data,

    }
}
export const AppProfile = withStyles(styles as any)(connect(mapStatesToProps)(_AppProfile as any))