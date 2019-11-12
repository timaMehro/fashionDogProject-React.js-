import { Grid, withStyles } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";

const styles = (theme: any) => ({

})

export interface DashboardProps {
    myApps?: any;
    classes?: any;
    dispatch?: any;
}
export interface DashboardState {

}

class _Dashboard extends React.Component<DashboardProps, DashboardState> {
    public componentDidMount() {
        const { dispatch } = this.props;
    }
    public render() {
        const { classes, myApps } = this.props;
        return (
            <React.Fragment>
            </React.Fragment>
        );
    }
}
const mapStatesToProps = (states: any) => {
    return {

        // myApps: states.app.userApps.payload && states.app.userApps.payload.data,

    };
};
export const Dashboard = withStyles(styles as any)(connect(mapStatesToProps)(_Dashboard));

