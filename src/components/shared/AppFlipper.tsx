import * as React from "react";
import { withStyles } from "@material-ui/core";
import clsx from "clsx";

const styles = (theme: any) => ({
    flipperContainer: {
        float: "left",
        width: 250,
        height: 250,
        marginRight: 15,
        display: "block",
        "& :span": {
            color: "white",
        },
        "& :>div.flipper": {
            float:"left",
            width:"100%",
            height:"100%",
            position:"relative",
        
            ".front, .back": {
              float:"left",
              display:"block",
              width:"100%",
              height:"100%",
              position:"absolute",
              top:0,
              left:0,
            },
                  
            ".front": {
              zIndex:2,
              background:"#19489E",
            },
                  
            ".back": {
              background:"#9E1919",
            }
          }
    }
})
export interface appFlipperProps {
    classes: any;
    orientation: any;
    flipped: string;
}
export class _AppFlipper extends React.Component<appFlipperProps, any> {
    public render() {
        const { classes, orientation, flipped } = this.props
        function Front() {
            return (<div className={clsx(classes.front, classes.tile)}>{this.props.children}</div>);
        }
        function Back() {
            return <div className={clsx(classes.back, classes.tile)}>{this.props.children}</div>;
        }
        return (
            <div className={classes.flipperContainer + orientation}>
                <div className={classes.flipped + (flipped ? " flipped" : "")}>
                    <Front></Front>
                    <Back></Back>
                </div>
            </div>
        )
    }
}

export const AppFlipper = withStyles(styles as any)(_AppFlipper as any)