import { Grid, Typography, TextField, Button, Box } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from '@mui/material/Divider';
import React, { useEffect, useState } from "react";
import { usehistory, withRouter } from "react-router-dom"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import axios from "axios";
import cogoToast from 'cogo-toast';
import apiUrl from "../config/apiUrl"



const HomePage = (props) => {
    const [email, setEmail] = useState()
    const [password, setPssword] = useState();
    const dispatch = useDispatch();
    const theme = useTheme();
    const isWidth350 = useMediaQuery("(max-width:350px)");
    const windowheight = window.innerHeight;
    const classes = styles(theme, windowheight);
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem("user")) ;

    useEffect(()=>{
        if(user){
            props.history.push("/user-profile");
        }
    },[]);

    // setting axios credentials 
    axios.defaults.withCredentials = true;

    // handlers
    const login = async (email, password) => {
        try {
            const body = { email, password }
            const res = await axios.post(apiUrl+"/api/user/login", body);
            localStorage.setItem("user", JSON.stringify(res.data));
            // dispatch(addUser(res.data));
            props.history.push("/user-profile");
            cogoToast.success(<h4>Logged in Successfuh3y</h4>);
        }
        catch (err) {
            console.log(err?.response);
            cogoToast.error(<h4>{err?.response?.data?.errorMsg}</h4>);
        }
    };

    return (<>
        <Grid container direction="row" sx={{ ...classes.mainContainer }}>

            {/* 1ST GRID */}
            <Grid
                item
                container
                flexDirection="column"
                justifyContent='center'
                alignItems="start"
                sx={{ ...classes.headingsContainer }}
                xs={12} sm={12} md={6} lg={6} xl={6}
            >

                <Typography variant="h2" align="center" sx={classes.headingsGeneral}>
                    ABC... Company
                </Typography>

                <Typography variant="h4" align="center" sx={classes.headingsGeneral}>
                    FeedBack Portal
                </Typography>

                <Typography variant="subtitle1" align="center" sx={classes.headingsGeneral}>
                    Want to share your point of view? We value your feedback
                </Typography>

                <Box sx={{ ...classes.starimage }}>
                    <img
                        width="100%"
                        src="assets/feedbackstars.png"
                    />
                </Box>

                {/* PUBLIC FEEDBACKS PAGE BUTTON */}
                <Button
                    endIcon={<ArrowForwardIosIcon />}
                    sx={{ ...classes.headingsGeneral, padding: "20px", color: "#4d79ff", fontWeight: "bold", background: "white", borderRadius: "30px", marginTop: "10px" }}
                    onClick={() => props.history.push("/public-reviews")}
                >
                    <Typography variant="h6">
                        See Feedbacks
                    </Typography>
                </Button>


            </Grid>

            {/* 2ND GRID */}
            <Grid
                item
                container
                justifyContent="center"
                alignItems="center"
                xs={12} sm={12} md={6} lg={6} xl={6}
                sx={{ ...classes.secondContainer }}
            >

                {/* SIGN IN CONTAINER */}
                <Grid
                    item
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={classes.signInContainer}
                    xs={isWidth350 ? 11 : 10.5} sm={8} md={8} lg={7} xl={7}
                >

                    {/* SIGN UP HEADING */}
                    <Grid item xs={10} sm={10} md={8} lg={10} xl={10} sx={{ ...classes.itemGridmargin }}>
                        <Typography variant="h4" fontWeight="bold" align="center" >Sign In</Typography>
                    </Grid>

                    {/* EMAIL TXT FIELD */}
                    <Grid
                        item
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="end"
                        sx={{ ...classes.itemGridmargin }}
                    >
                        <Grid item xs={isWidth350 ? 1.5 : 1} sm={1} md={1} lg={1} xl={1}>
                            <EmailIcon sx={{ ...classes.iconsGeneral }} />
                        </Grid>

                        <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                            <TextField onChange={(e) => setEmail(e.target.value)} type="email" variant="standard" fullWidth label="E-mail" />
                        </Grid>

                    </Grid>

                    {/* PASSWORD TXT FIELD */}
                    <Grid
                        item
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="end"
                        sx={{ ...classes.itemGridmargin }}
                    >
                        <Grid item xs={isWidth350 ? 1.5 : 1} sm={1} md={1} lg={1} xl={1}>
                            <LockIcon sx={{ ...classes.iconsGeneral }} />
                        </Grid>

                        <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                            <TextField
                                type="password"
                                variant="standard"
                                fullWidth
                                label="Password"
                                onChange={(e) => setPssword(e.target.value)}
                            />
                        </Grid>

                    </Grid>

                    <Grid item xs={10} sm={10} md={8} lg={10} xl={10} sx={{ ...classes.itemGridmargin }}>
                        <Button onClick={() => login(email, password)} variant="contained" fullWidth>Sign In</Button>
                    </Grid>

                    <Grid item xs={10} sm={10} md={8} lg={10} xl={10} sx={{ ...classes.itemGridmargin }}>
                        <Divider
                            sx={classes.divider}
                        >Register</Divider>
                    </Grid>

                    {/* REGISTER BUTTON */}
                    <Grid item xs={9} sm={9} md={7} lg={9} xl={9} sx={{ ...classes.itemGridmargin }}>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={classes.registerButton}
                            onClick={() => props.history.push("/signup")}
                        >
                            Create new account
                        </Button>
                    </Grid>

                    <Grid item xs={10} sm={10} md={8} lg={10} xl={10} sx={{ ...classes.itemGridmargin }}>
                        <Divider
                            sx={classes.divider}
                        >
                            Guest
                        </Divider>
                    </Grid>

                    {/* GUEST FEEDBACK BUTTON */}
                    <Grid item xs={9} sm={9} md={7} lg={9} xl={9} sx={{ ...classes.itemGridmargin }}>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{...classes.guestButton}}
                            onClick={() => props.history.push("/guest-feedback")}
                        >
                            Give Feedback as a guest
                        </Button>
                    </Grid>

                </Grid>

            </Grid>
        </Grid>

    </>);
};

const styles = (theme, windowheight) => {
    return ({
        mainContainer: {
            background: "#4d79ff",
            // height: windowheight
        },
        signInContainer: {
            background: "white",
            borderRadius: "15px",
            mt:{xl:10, lg:10, md:10,sm:5, xs:2},
            mb:{xl:10, lg:10, md:10,sm:5, xs:2},
            [theme.breakpoints.only("xs")]: {
                marginBottom: "100px"
            }
        },
        itemGridmargin: {
            marginTop: "2vh",
            marginBottom: "2vh",

        },
        iconsGeneral: {
            color: "#4d79ff"
        },
        headingsContainer: {
            [theme.breakpoints.down("md")]: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            },
        },
        headingsGeneral: {
            color: "white",
            fontWeight: "bold",
            marginLeft: "15%",
            [theme.breakpoints.down("md")]: { marginLeft: 0 }
        },
        starimage: {
            marginLeft: "15%",
            [theme.breakpoints.down("md")]: { marginLeft: 0, width: "30%" },
            [theme.breakpoints.down("sm")]: { display: "none" }
        },
        divider: {
            "& .MuiDivider-wrapper": { color: "#737373" },
            "&.MuiDivider-root:before": { borderColor: "#c3c3c3" },
            "&.MuiDivider-root:after": { borderColor: "#c3c3c3" },
        },
        registerButton: {
            background: "green",
            height: "60px",
            marginBottom: "10px"
        },
        guestButton: {
            height: "60px",
            marginBottom: "10px"
        },
    });
};


export default withRouter(HomePage);