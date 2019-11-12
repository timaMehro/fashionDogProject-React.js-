import { Theme, withStyles } from "@material-ui/core";
import * as React from "react";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import NotFound from "../NotFound";
import SignIn from "./authentication/SignIn";


export interface AppPublicProps {
    theme?: any;
    classes?: any;
}
export class AppPublic extends React.Component<AppPublicProps, any> {
    public render() {
        const { classes } = this.props;
        return (
                <Route >
                    <Switch>
                        <Route exact path="/" component={SignIn} />
                        <Route component={NotFound} />

                    </Switch>
                </Route>
        );
    }
}
export default (AppPublic);
