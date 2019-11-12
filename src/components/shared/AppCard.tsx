import * as React from "react";
import {
    withStyles, Card, CardHeader, CardContent, Divider,
    IconButton, Icon, Popper, Fade, List, ListItem, Paper, ListItemText, ListSubheader
} from "@material-ui/core";
import { connect } from "react-redux";
import { appCardFilter } from "../../redux/actions/app/appCardActions";

const styles = (theme: any) => ({
    header: {
        "& i, & button": {
            color: theme.palette.primary.light,
        },
        "& .MuiCardHeader-title": {
            fontSize: "1.1rem",
        },

    },
});

export interface AppCardProps {
    classes?: any;
    title?: string;
    icon?: string;
    component?: any;
    dispatch?: any;
    filter?: any;
    filterOptions?: any[];
    hasfilter?: boolean;
    hasChart?: boolean;
    anchorEl?: any;
}
export interface AppCardState {
    open: boolean;
}
class _AppCard extends React.Component<AppCardProps, AppCardState> {

    private achor: any;
    constructor(props: AppCardProps) {
        super(props);
        this.state = {
            open: false,
        }

    }


    componentDidMount() {
        this.achor = this.refs.achor;
    }
    public handleToggleFilter = (value?: any) => () => {
        this.setState((state) => { return { open: !state.open } })
    }
    public render() {
        const { classes, title, icon, filterOptions } = this.props;
        return (
            <React.Fragment>
                <Card>
                    <CardHeader
                        className={classes.header}
                        title={title} avatar={<i className={icon}></i>}
                        action={
                            <React.Fragment>
                                {this.props.hasChart && <IconButton>
                                    <Icon>bubble_chart</Icon>
                                </IconButton>}
                                {this.props.hasfilter && <IconButton ref={"achor" as any}
                                    onClick={this.handleToggleFilter().bind(this)}
                                >
                                    <Icon>filter_list</Icon>
                                </IconButton>}
                            </React.Fragment>
                        } />
                    <Popper open={this.state.open} anchorEl={this.achor} placement={"bottom-end"} transition>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper>
                                    <List >
                                        <ListSubheader>
                                            مرتب سازی
                                        </ListSubheader>
                                        <Divider variant="fullWidth"/>
                                        {
                                            filterOptions.map((item, xx) => {
                                                return (
                                                    <ListItem key={xx} button dense>
                                                        <ListItemText >
                                                            {item.lable}
                                                        </ListItemText>
                                                    </ListItem>
                                                );
                                            })
                                        }

                                    </List>
                                </Paper>
                            </Fade>
                        )}
                    </Popper>
                    <Divider />
                    <CardContent>
                        {this.props.children}
                    </CardContent>
                </Card>

            </React.Fragment>
        );
    }
}
const mapStatesToProps = (states: any) => {
    return {
        // filter: states.app.appCardFilter.open,

    };
};
export const AppCard = withStyles(styles)(connect(mapStatesToProps)(_AppCard));

