import React , {useEffect, useState}from "react"
import { Grid, Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PublicFeedbackCard from "../components/publicFeedbackCard.Component"
import axios from "axios";
import apiUrl from "../config/apiUrl"


const PublicFeedbacksPage = () => {
    const [generalFeedbacks, setGeneralFeedbacks] = useState([]);
    const theme = useTheme();
    const isWidth350 = useMediaQuery("(max-width:350px)");
    const windowheight = window.innerHeight;
    const classes = styles(theme, windowheight);


    useEffect(async () => {
        const res = await axios.get(apiUrl+"/api/feedbacks/");
        setGeneralFeedbacks(res.data.reverse());
    }, []);

    return (
        <>
            <Grid container sx={classes.mainContainer}>

                <Grid
                    item
                    xs={11} sm={11} md={11} lg={11} xl={11}
                    sx={classes.heading}
                >
                    <Typography variant="h4">
                        Public Reviews on ABC... Company
                    </Typography>
                </Grid>

                {
                    generalFeedbacks?.map((val, index) => {
                        return (
                            <>
                                <Grid
                                    key={index}
                                    item
                                    xs={11.5} sm={11} md={5.5} lg={5.5} xl={5.5}
                                    sx={{ ml: "2%" }}
                                >
                                    <PublicFeedbackCard cardValue={val}/>
                                </Grid>
                            </>
                        );
                    })
                }


            </Grid>
        </>
    );
}

const styles = (theme, windowheight) => {
    return ({
        mainContainer: {
            background: "#e6e6e6",
        },
        heading: {
            p: "4%",
        }
    });
};



export default PublicFeedbacksPage;