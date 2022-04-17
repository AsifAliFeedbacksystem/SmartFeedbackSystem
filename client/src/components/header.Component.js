import react, { useState, useEffect } from "react";
import { AppBar, Toolbar, Grid, Typography, Button, Hidden, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { Link, NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux"
import cogoToast from 'cogo-toast';


const Header = (props) => {
    const [dropDownMenu, setDropDownMenu] = useState(false);
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem("user"));
    const theme = useTheme();
    const classes = styles(theme);
    // const role = "user";

    // useEffect(async () => {
    //     if (!user){
    //         history.push("/")
    //     }
    // }, [])

    if (!user) return null

    const role = user ? user.role : null;

    const logout = () => {
        localStorage.removeItem("user");
        history.push("/")
        cogoToast.success(<h3>logged out</h3>);

    }

    return (<>
        <AppBar position="sticky">
            <Toolbar>

                {/* desktop size menu bar */}
                <Hidden only="xs">
                    <Grid
                        container
                        direction="row"
                    >
                        {
                            role == "user" ?
                                <>
                                    {/* User Navlinks */}

                                    <Grid
                                        item
                                        container
                                        justifyContent="flex-start"
                                        alignItems="flex-end"
                                        sm={9} md={9} lg={9} xl={9}
                                    >
                                        <NavLink
                                            to="/user-profile"
                                            activeStyle={classes.navlinksGeneral}
                                            style={classes.linksGeneral}
                                        >
                                            <Typography variant="subtitle1" >
                                                Profile
                                            </Typography>
                                        </NavLink>

                                        <NavLink
                                            to="/previous-feedbacks"
                                            activeStyle={classes.navlinksGeneral}
                                            style={classes.linksGeneral}
                                        >
                                            <Typography variant="subtitle1" >
                                                Previous Feedbacks
                                            </Typography>
                                        </NavLink>

                                        <NavLink
                                            to="/feedback"
                                            activeStyle={classes.navlinksGeneral}
                                            style={classes.linksGeneral}
                                        >
                                            <Typography variant="subtitle1" >
                                                Feedback
                                            </Typography>
                                        </NavLink>
                                    </Grid>
                                </> :
                                <>
                                    {/* Admin Navlinks */}

                                    <Grid
                                        item
                                        container
                                        justifyContent="flex-start"
                                        alignItems="flex-end"
                                        sm={9} md={9} lg={9} xl={9}
                                    >
                                        <NavLink
                                            to="/admin-profile"
                                            activeStyle={classes.navlinksGeneral}
                                            style={classes.linksGeneral}
                                        >
                                            <Typography variant="subtitle1" >
                                                Profile
                                            </Typography>
                                        </NavLink>

                                        <NavLink
                                            to="/admin-feedbacks"
                                            activeStyle={classes.navlinksGeneral}
                                            style={classes.linksGeneral}
                                        >
                                            <Typography variant="subtitle1" >
                                                Feedbacks
                                            </Typography>
                                        </NavLink>

                                        <NavLink
                                            to="/admin-guest-feedbacks"
                                            activeStyle={classes.navlinksGeneral}
                                            style={classes.linksGeneral}
                                        >
                                            <Typography variant="subtitle1" >
                                                Guest Feedbacks
                                            </Typography>
                                        </NavLink>

                                        <NavLink
                                            to="/admin-questions"
                                            activeStyle={classes.navlinksGeneral}
                                            style={classes.linksGeneral}
                                        >
                                            <Typography variant="subtitle1" >
                                                Questions
                                            </Typography>
                                        </NavLink>

                                    </Grid>
                                </>

                        }

                        <Grid
                            item
                            container
                            justifyContent="flex-end"
                            alignItems="center"
                            sm={3} md={3} lg={3} xl={3}
                        >
                            <Button onClick={() => logout()} sx={classes.logoutBtn} variant="contained">
                                <Typography variant="caption">
                                    Logout
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Hidden>



                {/* Mobile size menu bar */}
                <Hidden smUp={true}>
                    <Grid container direction="column">

                        <Grid item sx={{ marginTop: dropDownMenu ? "12px" : 0 }}>
                            <IconButton
                                onClick={() => setDropDownMenu(!dropDownMenu)}
                                sx={classes.menuIconButton} >
                                <MenuIcon sx={{ color: "white" }} />
                            </IconButton>
                        </Grid>

                        <Grid item container direction="column" sx={{ marginY: "10px", display: dropDownMenu ? "block" : "none" }}>

                            {
                                role == "user" ?
                                    <>
                                        <Grid
                                            item
                                            container
                                            direction="column"
                                            justifyContent="space-evenly"
                                            alignItems="flex-start"
                                            sx={{ marginBottom: "30px", marginTop: "10px" }}
                                        >


                                            <NavLink
                                                to="/user-profile"
                                                activeStyle={classes.navlinksGeneral}
                                                style={classes.linksGeneral}
                                            >
                                                <Typography variant="subtitle1" >
                                                    Username
                                                </Typography>
                                            </NavLink>

                                            <NavLink
                                                to="/previous-feedbacks"
                                                activeStyle={classes.navlinksGeneral}
                                                style={classes.linksGeneral}
                                            >
                                                <Typography variant="subtitle1" >
                                                    Previous Feedbacks
                                                </Typography>
                                            </NavLink>

                                            <NavLink
                                                to="/feedback"
                                                activeStyle={classes.navlinksGeneral}
                                                style={classes.linksGeneral}
                                            >
                                                <Typography variant="subtitle1" >
                                                    Feedback
                                                </Typography>
                                            </NavLink>

                                        </Grid>
                                    </> :
                                    <>
                                        <Grid
                                            item
                                            container
                                            direction="column"
                                            justifyContent="space-evenly"
                                            alignItems="flex-start"
                                            sx={{ marginBottom: "30px", marginTop: "10px" }}
                                        >

                                            <NavLink
                                                to="/admin-profile"
                                                activeStyle={classes.navlinksGeneral}
                                                style={classes.linksGeneral}
                                            >
                                                <Typography variant="subtitle1" >
                                                    Profile
                                                </Typography>
                                            </NavLink>

                                            <NavLink
                                                to="/admin-feedbacks"
                                                activeStyle={classes.navlinksGeneral}
                                                style={classes.linksGeneral}
                                            >
                                                <Typography variant="subtitle1" >
                                                    Feedbacks
                                                </Typography>
                                            </NavLink>

                                            <NavLink
                                                to="/admin-guest-feedbacks"
                                                activeStyle={classes.navlinksGeneral}
                                                style={classes.linksGeneral}
                                            >
                                                <Typography variant="subtitle1" >
                                                    Guest Feedbacks
                                                </Typography>
                                            </NavLink>

                                            <NavLink
                                                to="/admin-questions"
                                                activeStyle={classes.navlinksGeneral}
                                                style={classes.linksGeneral}
                                            >
                                                <Typography variant="subtitle1" >
                                                    Questions
                                                </Typography>
                                            </NavLink>

                                        </Grid>
                                    </>
                            }

                            <Grid
                                item
                                container
                                justifyContent="flex-strat"
                                alignItems="center"
                            >
                                <Button onClick={() => logout()} sx={classes.logoutBtn} variant="contained">
                                    <Typography variant="caption">
                                        Logout
                                    </Typography>
                                </Button>
                            </Grid>

                        </Grid>
                    </Grid>
                </Hidden>

            </Toolbar>
        </AppBar>

    </>)
};


const styles = (theme) => {
    return ({
        logoutBtn: {
            background: "white",
            color: "blue",
            borderRadius: "20px",
            "&:hover": {
                background: "lightgray"
            }
        },
        linksGeneral: {
            color: "white",
            textDecoration: "none",
            padding: "3px",
            marginLeft: "5%"
        },
        navlinksGeneral: {
            color: "white",
            textDecoration: "none",
            borderBottom: "3px solid white",
        },
        menuIconButton: {
            border: "2.5px solid white",
            padding: "2px",
            borderRadius: "8px",
        }
    });
};

export default Header;