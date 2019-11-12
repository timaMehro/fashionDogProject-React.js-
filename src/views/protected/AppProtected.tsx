import { createStyles, Grid, Theme, withStyles } from "@material-ui/core";
import * as React from "react";
import { Switch } from "react-router";
import { AppLayout } from "../../components/shared/AppLayout";
import AppRoute from "../../components/shared/AppRoute";
import { Dashboard } from "./dashboard/dashboard";
import FactorFormVeiw  from "./factors/FactorFormVeiw";
import FactorListVeiw  from "./factors/FactorListVeiw";
import ProductListVeiw  from "./products/ProductListVeiw";



export interface AppProtectedPrpops {
    theme?: any;
    classes?: any;
}
export interface AppProtectedStates {

    rightDrawer: boolean;
    leftDrawer: boolean;
}

const styles = (theme: Theme) => createStyles({
    avatarPlace: {
        borderRadius: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        color: "#fff",
        textAlign: "center",
        backgroundColor: "#607D8B",
        padding: "20px 0",
    },
    list: {
        width: 250,
    },
    fullList: {
        width: "auto",
    },
    dashboard: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});
class _AppProtected extends React.Component<AppProtectedPrpops, AppProtectedStates> {

    constructor(props: any, states: any) {
        super(props, states);
        this.state = {
            rightDrawer: false,
            leftDrawer: true,
        };
    }


    public toggleDrawer = (self: any, open: boolean) => () => {

        self.setState({
            rightDrawer: open,
            leftDrawer: open,
        });
    }
    public onDrawerToggle() {

        this.toggleDrawer(this, true)();
    }

    public render() {
        return (
            <Grid color="primary">
                <AppRoute authorize={["ccr_admin,ccr_user"]} >
                    <Switch>
                        <AppRoute path="/admin/dashboard" layout={AppLayout} component={Dashboard} />
                        <AppRoute exact path="/admin/factors/add" layout={AppLayout} component={FactorFormVeiw} />
                        <AppRoute path="/admin/factors" layout={AppLayout} component={FactorListVeiw} />
                        <AppRoute path="/admin/products" layout={AppLayout} component={ProductListVeiw} />
                    </Switch>
                </AppRoute>


            </Grid>

        );
    }
}
export const AppProtected = withStyles(styles)(_AppProtected as any);
