import { Breadcrumbs, Icon, Link, Paper, Typography, withStyles } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import Moment from 'react-moment';
import 'moment/locale/fa';


const styles = (theme: any) => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: theme.spacing(2),

    },
    paper: {
        padding: theme.spacing(1, 2),
    },

});

export interface AppBreadcrumbProps {
    classes?: any;
    routes?: any;
}
export interface AppBreadcrumbStates { }
export class _AppBreadcrumb extends React.Component<AppBreadcrumbProps, AppBreadcrumbStates> {
    public render() {
        const { classes, routes } = this.props;
        const routesName = routes.split("/").splice(2, routes.length);
        const dateToFormat:any = new Date();
        return (
            <div className={classes.root}>
                    <Breadcrumbs separator={<Icon>remove</Icon>} >
                        <Link color="textSecondary" href={"/admin/dashboard"}>
                            فشن داگ
                                </Link>
                        {routesName.map((item: any, ix: any) => {
                            return (
                                <Link color="textPrimary" href={item} key={ix} >
                                    {item}
                                </Link>
                            );
                        })}
                    </Breadcrumbs>
                    <Typography>
                    <Moment format="HH:mm MM/DD" withTitle locale="fa">{dateToFormat}</Moment>
                    </Typography>
            </div>
        );
    }
}
const mapStatesToProps = ((state: any) => {
    return {
        routes: state.router.location.pathname,
    };
});
export const AppBreadcrumb = withStyles(styles as any)(connect(mapStatesToProps)(_AppBreadcrumb));
