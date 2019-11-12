import * as React from "react";
import { ClickAwayListener, MenuItem, Icon, ListItemText, Collapse, List, withStyles, Divider, ListSubheader } from "@material-ui/core";
import { connect } from "react-redux";
import { push } from "react-router-redux";

const styles = (theme: any) => ({
    root: {
        width: "100%",
        maxWidth: 360,
    },
    listTextActive: {
        "width": "auto",
        "backgroundColor": theme.palette.secondary.light,
        "color": theme.palette.primary.contrastText,
        "marginRight": 0,
        "& span": {
            color: theme.palette.primary.contrastText,
            fontSize: 15,
        },
        "& svg": {
            color: theme.palette.primary.contrastText,
            fontSize: 20,
        },
    },
    listText: {
        "width": "auto",
        "color": theme.palette.text.secondary,
        "marginRight": 0,
        "&:hover": {
            backgroundColor: "transparent",
        },
        "& span": {
            "color": theme.palette.text.secondary,
            "fontSize": 15,
            "&:hover": {
                color: theme.palette.primary.light,
            },
        },
        "& i": {
            color: theme.palette.text.secondary,
            fontSize: 20,
        },
    },
    menuItem: {
        "& $primary": {
            color: theme.palette.text.secondary,
            fontSize: 18,
            paddingLeft: theme.spacing(3),

        },
        "& i": {
            color: theme.palette.text.primary,
            fontSize: 20,
            paddingBottom: theme.spacing(.5),
        },
        "&:focus": {
            "backgroundColor": theme.palette.primary.light,
            "& $primary, & i": {
                color: theme.palette.common.white,
            },

        },
        "&:hover": {
            "& $primary, i": {
                color: theme.palette.secondary.main,
            },

        },
        "& .collapse": {
            fontSize: ".8rem",
        },
        "&.MuiListItem-button:hover":{
            backgroundColor: theme.palette.primary.main,
        }
    },
    nested: {
        "& span, i": {
            fontSize: ".9em !important",
        },
        "& li": {
            paddingLeft: theme.spacing(3),
        },
    },
    primary: {},
    icon: {},
});

export interface AppMenuProps {
    items?: any;
    dispatch?: any;
    classes?: any;
    submenu?: string;
}
export interface AppMenuStates {

}

export class _AppMenu extends React.Component<AppMenuProps, AppMenuStates> {
    public state = {
        open: true,
    };
    public handleCloseUserMenu(name: any) {
        this.setState(() => ({ [name]: false } as any));
    }
    public handelCpllapseClick(name: any) {
        this.setState((state: any) => ({ [name]: !state[name] } as any));
    }
    public render() {
        const that = this;
        const { items, dispatch, classes, submenu } = this.props;
        const menuItems: any = items;
        const listRenderer = (menuData: any) => {
            const mitems: any[] = menuData.items;
            const innerList =
                menuItems && mitems.map((item, ix) => {
                    const kk = item.id || ix;
                    if (item.items) {
                        return (
                            <ClickAwayListener key={`menu-item-${kk}`}
                                onClickAway={() => {
                                    that.handleCloseUserMenu(kk)
                                }
                                }>
                                <React.Fragment key={`rf-${kk}`}>
                                    <MenuItem key={`mi-${kk}`} button
                                        onClick={() => { that.handelCpllapseClick(kk) }}
                                        className={classes.menuItem}>
                                        <i className={item.icon} key={`i-${kk}`}></i>
                                        <ListItemText key={`li-${kk}`} classes={{ primary: classes.primary }}
                                            primary={item.title || ""} />
                                        {(that.state as any)[kk] ?
                                            <i key={`lii-${kk}`} className="icon-chevron-up collapse"></i> :
                                            <i key={`lid-${kk}`} className="icon-chevron-left collapse"></i>}
                                    </MenuItem>
                                    <Divider component="li" key={`d-${kk}`}/>
                                    <Collapse key={"Collapsed" + kk} in={(that.state as any)[kk]}
                                        timeout="auto" unmountOnExit>
                                        <List key={`l-${kk}`} className={classes.nested}>{listRenderer(item)}</List>
                                    </Collapse>
                                </React.Fragment>
                            </ClickAwayListener>
                        );
                    } else {
                        return (
                            <React.Fragment>
                                <MenuItem className={classes.menuItem} key={kk} button
                                    onClick={() => { dispatch(push(item.target || "/")) }}>
                                    <Icon component="i">{item.icon}</Icon>
                                    <ListItemText primary={item.title || ""} classes={{ primary: classes.primary }} />
                                </MenuItem>
                                <Divider component="li" />
                            </React.Fragment>
                        );
                    }
                });
            return innerList;
        };

        return (
            <List
                subheader={
                    <ListSubheader component="div" key={`ls`}>
                        {submenu}
                    </ListSubheader>
                } key={`mi-${submenu}`}>
                {listRenderer(menuItems)}
            </List>

        );
    }
}
export const AppMenu = withStyles(styles)(connect()(_AppMenu as any) as any);