import react from "react";
import { Grid } from "@mui/material";

const Footer = (props) => {
const classes =  styles();
    return (<>

        <Grid container sx={classes.mainContainer}>

        </Grid>

    </>)
};


const styles = () => {
    return ({
        mainContainer:{
            height:"100px",
            background:"black"
        }
    });
};

export default Footer;