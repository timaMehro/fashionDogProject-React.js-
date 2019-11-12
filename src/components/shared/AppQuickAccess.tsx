import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Switch from "@material-ui/core/Switch";
import { capitalize } from "@material-ui/core/utils";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import SaveIcon from "@material-ui/icons/Save";
import PrintIcon from "@material-ui/icons/Print";
import ShareIcon from "@material-ui/icons/Share";
import DeleteIcon from "@material-ui/icons/Delete";
import clsx from "clsx";
import { Icon } from "@material-ui/core";
import { push } from "react-router-redux";
import { connect } from "react-redux";

const styles = (theme: any) => ({
    root: {
        width: "100%",
    },
    exampleWrapper: {
        position: "relative",
        minHeight: 100,
    },
    speedDial: {
        position: "absolute",
        "&$directionUp, &$directionLeft": {
            top: theme.spacing(0),
            right: theme.spacing(3),
        },
        "&$directionDown, &$directionRight": {
            top: theme.spacing(0),
            left: theme.spacing(3),
        },
    },
    directionUp: {},
    directionRight: {},
    directionDown: {},
    directionLeft: {},
})

export interface AppQuickAccessProps {
    classes?: any;
    dispatch?: any;
    history?:any;
}
const actions = [
    { icon: <Icon>add_circle_outline</Icon>, name: "افزودن حساب", target: "/admin/addaccount" },
    { icon: <Icon>receipt</Icon>, name: "پشتیبانی", target: "/admin/support/add" },
    { icon: <Icon>payment</Icon>, name: "خرید شارژ", target: "/admin/charge" },
    { icon: <Icon>settings</Icon>, name: "تنظیمات", target: "/admin/configurations/settings" },
    { icon: <Icon>power_off</Icon>, name: "خاموش", target: "#" },
];
export class _AppQuickAccess extends React.Component<AppQuickAccessProps, any> {
    public state = {
        direction: "up",
        open: false,
        hidden: false,
    };
    handleClick = () => {
        this.setState((state: any) => ({
            open: !state.open,
        }));
    };

    handleDirectionChange = (event: any, value: any) => {
        this.setState({
            direction: value,
        });
    };

    handleHiddenChange = (event: any, hidden: any) => {
        this.setState((state: any) => ({
            hidden,
            open: hidden ? false : state.open,
        }));
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };
    public handlePowerOff = () => {
        const data = { ...this.state };
        const history = this.props.history;
        fetch("/api/configurations/settings", {
            method: "post",
            body: JSON.stringify(data),
        }).finally(() => {
            history.push("/admin/dashboard");
        });
    }
    public render() {
        const { classes, dispatch } = this.props;
        const { direction, hidden, open } = this.state;
        const that = this;
        const speedDialClassName = clsx(
            classes.speedDial,
            classes[`direction${capitalize(direction)}`],
        );
        return (
            <div className={classes.root}>
                <div className={classes.exampleWrapper}>
                    <SpeedDial
                        ariaLabel="SpeedDial example"
                        className={speedDialClassName}
                        hidden={false}
                        icon={<SpeedDialIcon />}
                        onBlur={this.handleClose}
                        onClick={this.handleClick}
                        onClose={this.handleClose}
                        onFocus={this.handleOpen}
                        onMouseEnter={this.handleOpen}
                        onMouseLeave={this.handleClose}
                        open={open}
                        direction="left"
                    >
                        {actions.map(action => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipPlacement="bottom"
                                tooltipTitle={action.name}
                                onClick={() => {
                                    if (action.name === "خاموش") {
                                        {that.handlePowerOff.bind(that)}
                                    }
                                    else { dispatch(push(action.target)) }
                                }}

                                ButtonProps={{ size: "small" }}
                            />
                        ))}
                    </SpeedDial>
                </div>
            </div>
        )
    }
}
export const AppQuickAccess = withStyles(styles as any)(connect()(_AppQuickAccess)); 