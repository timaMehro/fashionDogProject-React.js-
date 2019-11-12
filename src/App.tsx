import { createStyles, IconButton, SnackbarContent, Theme, withStyles } from "@material-ui/core";
import { amber, blue, green, grey, red } from "@material-ui/core/colors";
import Snackbar from "@material-ui/core/Snackbar";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import classNames = require("classnames");
import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import * as React from "react";
import { connect } from "react-redux";
import { hideNotification } from "./redux/actions/app/notificationActions";
import routes from "./routes";

interface AppProps {
    dispatch?: any;
    notificationConfig?: any;
    notificationMessage?: string;
    openNotification?: boolean;
    history: History;
}


const variantIcon = {
    default: InfoIcon,
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const styles1 = (theme: Theme) => ({
    default: {
        backgroundColor: grey[600],
    },
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: "flex",
        alignItems: "center",
    },
});
const App = ({ history, dispatch, openNotification, notificationConfig, notificationMessage }: AppProps) => {


    function MySnackbarContent(props: any) {
        const { classes, className, message, onClose, variant, ...other } = props;
        const Icon: any = (variantIcon as any)[variant];

        return (
            <SnackbarContent
                className={classNames(classes[variant], className)}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={classes.message}>
                        <Icon className={classNames(classes.icon, classes.iconVariant)} />
                        {message}
                    </span>
                }
                action={[
                    onClose && (<IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={onClose}
                    >
                        <CloseIcon className={classes.icon} />
                    </IconButton>),
                ]}
                {...other}
            />
        );
    }

    const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);
    return (
        <ConnectedRouter history={history}>
            <Snackbar
                anchorOrigin={(notificationConfig && notificationConfig.anchorOrigin) || {
                    vertical: "bottom",
                    horizontal: "right",
                }}
                open={openNotification}
                autoHideDuration={6000}
                ContentProps={{
                    "aria-describedby": "message-id",
                }}
            >
                <MySnackbarContentWrapper
                    onClose={() => { dispatch(hideNotification()); }}
                    variant={(notificationConfig && notificationConfig.type) || "default"}
                    message={<span id="message-id">{notificationMessage}</span>}
                />
            </Snackbar>
            {routes}
        </ConnectedRouter>
    );
};
const mapStatesToProps = (state: any) => {
    return {
        notificationMessage: state.app.notification.message,
        openNotification: state.app.notification.open,
        notificationConfig: state.app.notification.config,
    };
};
export default connect(mapStatesToProps)(App);
