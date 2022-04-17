import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Grid, Button, TextField, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link , useHistory} from "react-router-dom";
import axios from 'axios';
import cogoToast from 'cogo-toast';
import apiUrl from "../../config/apiUrl"




export default function EditProfileModal({ userData ,refetchUser}) {
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [userName, setUserName] = React.useState();
    const [phone1, setPhone1] = React.useState();

    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const isWidth350 = useMediaQuery("(max-width:350px)");
    const windowheight = window.innerHeight;
    const classes = styles(theme, windowheight);

    //   handlers
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const submit = async (userName, email, phone1, password) => {
        try {
            const body = { userName, email, phone1 , password };
            const res = await axios.patch(apiUrl+"/api/user/", body);
            refetchUser();
            cogoToast.success(<h4>{res.data.successMsg}</h4>);
        } catch (err) {
            console.log(err.response);
            cogoToast.error(<h4>{err.response.data.errorMsg}</h4>);
        }
    };

    return (
        <div>
            <Button variant="contained" sx={{ background: "#4d79ff" }} onClick={handleOpen}>Change</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    {/* xxxxxxxxxxxxxxxxxxxxxxx */}


                    <Grid item container justifyContent={"end"}>
                        <CloseIcon sx={classes.crossIcon} onClick={handleClose} />
                    </Grid>
                    <br />
                    <br />
                    <Grid item>
                        <Typography variant='h6' fontWeight={"normal"} align='center'>
                            Edit profile
                        </Typography>
                    </Grid>

                    {/* SIGN UP CONTAINER */}
                    <Grid
                        item
                        container
                        justifyContent="center"
                        alignItems="center"
                        xs={isWidth350 ? 11 : 10.5} sm={12} md={12} lg={12} xl={12}
                        sx={classes.signUpContainer}>


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


                        {/*Phone */}
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
                                    type="text"
                                    variant="standard"
                                    fullWidth 
                                    label="Phone"
                                    onChange={(e) => setPhone1(e.target.value)}
                                    />
                            </Grid>

                        </Grid>

                        {/* save button BUTTON */}
                        <Grid item xs={10} sm={10} md={8} lg={10} xl={10} sx={{ ...classes.itemGridmargin }}>
                            <Button variant="contained" onClick={() => submit(userName, email, phone1, password)} >Save Changes</Button>
                        </Grid>

                    </Grid>
                    {/* xxxxxxxxxxxxxxxxxxxxxxx */}

                </Box>
            </Modal>
        </div>
    );
}

const styles = (theme, windowheight) => {
    return (
        {
            mainContainer: {
                background: "#4d79ff",
                height: windowheight
            },
            signUpContainer: {
                background: "white",
                borderRadius: "15px",
                // marginTop: "10vh",
                // marginBottom: "10vh"
            },
            itemGridmargin: {
                marginTop: "2vh",
                marginBottom: "2vh",

            },
            iconsGeneral: {
                color: "#4d79ff"
            },
            crossIcon: {
                color: "grey",
                borderRadius: "100%",
                p: 1,
                "&:hover": {
                    bgcolor: "lightgrey"
                }
            }

        }
    );
};
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: "75%", sm: "50%", md: "30%", lg: "30%", xl: "30%" },
    bgcolor: 'white',
    // border: '1px solid #000',
    borderRadius: "20px",
    boxShadow: 24,
    p: 3,
};
