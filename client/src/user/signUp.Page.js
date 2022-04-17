import { Grid, Button, TextField, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link, useHistory } from "react-router-dom";
import react, { useState } from "react"
import axios from "axios";
import cogoToast from 'cogo-toast';
import apiUrl from "../config/apiUrl"


const SignUpPage = () => {
    const [email, setEmail] = useState();
    const [userName, setUserName] = useState();
    const [phone1, setPhone1] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const history = useHistory();
    const theme = useTheme();
    const isWidth350 = useMediaQuery("(max-width:350px)");
    const windowheight = window.innerHeight;
    const classes = styles(theme, windowheight);


    // console.log(email, userName, phone1, password, confirmPassword);

    const onSubmit = async (email, userName, phone1, password, confirmPassword) => {

        if (password !== confirmPassword) {
            cogoToast.error(<h4>passwords must match</h4>);           
             return null;
        }

        try {
            const body = { email, userName, phone1, password, confirmPassword };
            const res = await axios.post(apiUrl+"/api/user/", body);
            cogoToast.success(<h4>{res.data.successMsg}</h4>);
            history.push("/");

        } catch (err) {
            console.log(err.response)
            cogoToast.error(<h4>{err.response.data.errorMsg}</h4>);
        }

    };

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={classes.mainContainer}>

                {/* SIGN UP CONTAINER */}
                <Grid
                    item
                    container
                    justifyContent="center"
                    alignItems="center"
                    xs={isWidth350 ? 11 : 10.5} sm={7} md={5} lg={5} xl={4}
                    sx={classes.signUpContainer}>

                    {/* SIGN UP HEADING */}
                    <Grid item xs={10} sm={10} md={8} lg={10} xl={10} sx={{ ...classes.itemGridmargin }}>
                        <Typography variant="h4" fontWeight="bold" align="center" >Sign Up</Typography>
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
                            <TextField onChange={(e) => setEmail(e.target.value)} type="email" required variant="standard" fullWidth label="E-mail" />
                        </Grid>

                    </Grid>

                    {/* USER NAME TXT FIELD */}
                    <Grid
                        item
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="end"
                        sx={{ ...classes.itemGridmargin }}
                    >
                        <Grid item xs={isWidth350 ? 1.5 : 1} sm={1} md={1} lg={1} xl={1}>
                            <PersonIcon sx={{ ...classes.iconsGeneral }} />
                        </Grid>

                        <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                            <TextField
                                type="text"
                                variant="standard"
                                fullWidth label="Username"
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </Grid>

                    </Grid>


                    {/* PHONEs TXT FIELD */}
                    <Grid
                        item
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="end"
                        sx={{ ...classes.itemGridmargin }}
                    >
                        <Grid item xs={isWidth350 ? 1.5 : 1} sm={1} md={1} lg={1} xl={1}>
                            <LocalPhoneIcon sx={{ ...classes.iconsGeneral }} />
                        </Grid>

                        <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                            <TextField
                                type="email"
                                variant="standard"
                                fullWidth
                                label="Phone"
                                onChange={(e) => setPhone1(e.target.value)}
                            />
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
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>

                    </Grid>


                    {/*CONFIRM PASSWORD TXT FIELD */}
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
                                fullWidth label="Confirm password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Grid>

                    </Grid>

                    {/* REGISTER BUTTON */}
                    <Grid item xs={10} sm={10} md={8} lg={10} xl={10} sx={{ ...classes.itemGridmargin }}>
                        <Button onClick={() => onSubmit(email, userName, phone1, password, confirmPassword)} variant="contained" fullWidth>
                            Register User
                        </Button>
                        <Typography variant="subtitle2" align="center" sx={{ marginTop: "15px" }} >
                            <Link to="/">
                                Already registerd? Signin
                            </Link>
                        </Typography>
                    </Grid>

                </Grid>
            </Grid>

        </>
    );
};


const styles = (theme, windowheight) => {
    return (
        {
            mainContainer: {
                background: "#4d79ff",
                // height: windowheight
            },
            signUpContainer: {
                background: "white",
                borderRadius: "15px",
                mt: {xs:2, sm:2, md:5, lg:5, xl:5 },
                marginBottom: "10vh"
            },
            itemGridmargin: {
                marginTop: "3vh",
                marginBottom: "3vh",

            },
            iconsGeneral: {
                color: "#4d79ff"
            }

        }
    );
};


export default SignUpPage;