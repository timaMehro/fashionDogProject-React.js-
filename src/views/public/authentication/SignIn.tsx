import { Card, Theme, Grid, Paper, Icon, LinearProgress, Fade, Link, Typography, Fab } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import Slider from "react-slick";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { loginUser } from "../../../redux/actions/app/authActions";
import { green } from "@material-ui/core/colors";

const styles = (theme: Theme) => ({
    main: {
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing(2),
        position: "relative",
        background: "rgb(1, 47, 79)",
        // background: "-webkit-linear-gradient(-135deg, rgba(1, 47, 79, 1) 33%, rgba(8, 1, 43, 1) 95%)",
        // background: "-o-linear-gradient(-135deg, rgba(1, 47, 79, 1) 33%, rgba(8, 1, 43, 1) 95%)",
        // background: "-moz-linear-gradient(-135deg, rgba(1, 47, 79, 1) 33%, rgba(8, 1, 43, 1) 95%)",
        backgroundImage: "linear-gradient(-135deg, rgba(1, 47, 79, 1) 33%, rgba(8, 1, 43, 1) 95%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    card: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: theme.typography.fontFamily,
        padding: theme.spacing(10, 5, 10, 10),
        height: "100%"

    },
    title: {
        "alignSelf": "baseline",
        "position": "relative",
        "marginBottom": theme.spacing(5),
    },
    grid: {
        width: 960,
    },
    second: {
        padding: theme.spacing(3),
        borderRadius: "100%",
        height: "100%",
        backgroundColor: "#fff",
        minHeight: 500,
    },
    content: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    logo: {
        width: 350,
        MaxWidth: 350,
        height: 350,
        maxHeight: 350,
        position: "absolute",
        top: 210,
        left: 250,
    },
    animate: {
        width: 250,
        height: 250,
        position: "absolute",
        top: 180,
        left: 250,
        borderRadius: "50%",
        // border: "1px solid #fff",
        "-webkit-animation": "pulse 1s infinite",
        animation: "pulse 1s infinite",
    },
    hintBox: {
        margin: theme.spacing(3, 0, 0, 3),
        "& li": {
            marginBottom: theme.spacing(2),
            // listStyle: "none"
        }
    },
    checked: {},
    help: {
        marginTop: theme.spacing(1),
        "& a": {
            color: theme.palette.primary.contrastText,
        }
    },
    form: {
        width: "100%", // Fix IE 11 issue.
    },
    submit: {
        margin: theme.spacing(3,0,3),
        color: "#fff",
        width: "100%",
    },
});
export interface SignInFormProps {
    pending?: boolean;
    dispatch?: any;
    style?: any;
    history?: any;
    classes?: any;
}
export interface SignInFormStates {
    username: string;
    password: string;
    usernameInValid: boolean;
}
class SignInForm extends React.Component<SignInFormProps, SignInFormStates> {
    constructor(props: SignInFormProps, states: SignInFormStates) {
        super(props, states);
        this.state = {
            username: "",
            password: "",
            usernameInValid: false,
        };
    }
    public handleChange = (name: string) => (event: any) => {
        this.setState({ [name]: event.target.value } as any);
        if (name = "username") {
            this.setState({ usernameInValid: !(/^[a-zA-Z0-9]{5,15}$/.test(this.state.username)) });
        }
    }

    public render() {
        const { classes, history, dispatch } = this.props;
        const settings = {
            dots: true,
            infinite: true,
            arrows: false,
            adaptiveHeight: true,
            rtl: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <main className={classes.main}>

                <CssBaseline />
                <Fade in={true} mountOnEnter timeout={{ enter: 3000 }} >
                    <Paper className={classes.grid} elevation={24}>
                        <Grid container justify="center">
                            <Grid item xs={12} sm={6}>
                                <div className={classes.second}>
                                    <div className={classes.content}>
                                        <img src="./static/img/bg/login.png" alt="" />
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6} className={classes.cardOverlay}>
                                <div className={classes.card}>
                                    <div className={classes.title}>
                                        <h2><span>ورود اعضا</span></h2>
                                    </div>
                                    <form className={classes.form} onKeyDown={(e) => {
                                        if (e.keyCode === 13) {
                                            this.handleSigninClick(dispatch);
                                        }
                                    }}>
                                        <Grid container spacing={1} alignItems="flex-end">
                                            <Grid item>
                                                <Icon>phone_android</Icon>
                                            </Grid>
                                            <Grid item>
                                                <FormControl margin="normal" fullWidth className={classes.input}>

                                                    <InputLabel htmlFor="username" className={classes.label}>کد ملی</InputLabel>
                                                    <Input id="username" color="secondary" name="username"
                                                        autoComplete="username" autoFocus
                                                        onChange={this.handleChange("username").bind(this)}
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1} alignItems="flex-end">
                                            <Grid item>
                                                <Icon>lock</Icon>
                                            </Grid>
                                            <Grid item>
                                                <FormControl margin="normal" fullWidth className={classes.input}>

                                                    <InputLabel htmlFor="username" className={classes.label}>رمز عبور</InputLabel>
                                                    <Input id="username" color="secondary" name="username"
                                                        autoComplete="username" autoFocus
                                                        onChange={this.handleChange("username").bind(this)}
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <Fab
                                            variant="extended"
                                            size="large"
                                            color="primary"
                                            className={classes.submit}
                                            onClick={() => {
                                                this.handleSigninClick(dispatch);
                                            }}
                                        >
                                            ورود
                        </Fab>
                                        <Link
                                        color="primary"
                                            component="button"
                                            variant="body2"
                                        >
                                            بازیابی نام کاربری / رمز عبور
                                        </Link>
                                    </form>

                                </div>
                            </Grid>

                        </Grid>
                    </Paper>
                </Fade>
            </main>
        );
    }

    private handleSigninClick(dispatch: any) {
        const cred = { username: this.state.username, password: this.state.password };
        dispatch(loginUser(cred));
    }
}
const mapStatesToProps = (state: any) => {
    return { pending: state.pending };
};
export default withStyles(styles as any)(connect(mapStatesToProps)(SignInForm as any));
