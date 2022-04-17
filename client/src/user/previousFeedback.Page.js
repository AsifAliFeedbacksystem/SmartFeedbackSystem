import react, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Header from "../components/header.Component"
import FeedbacksCard from "../components/feedbackCard.Compnent"
import axios from "axios";
import apiUrl from "../config/apiUrl"


const PreviousFeedbackPage = (props) => {

    const [feedbacks, setFeedbacks] = useState();
    const theme = useTheme();
    const classes = styles(theme);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/feedbacks/${user._id}`)
            setFeedbacks(res.data.reverse());
        } catch (err) {
            console.log(err.response);
        }
    }, [])
    return (<>
        <Header />
        <Grid
            container
            sx={{ marginLeft: "4%" }}
        >

            <Grid
                item
                xs={11} sm={9} md={7} lg={7} xl={7}
                sx={{ marginTop: "20px" }}
            >
                <Typography variant="h4">
                    Previous Feedbacks
                </Typography>
            </Grid>

            <Grid
                item
                xs={11} sm={9} md={9} lg={9} xl={9}
            >
                {
                    feedbacks?.map((cardData) => {
                        return (

                            <FeedbacksCard cardData={cardData} />
                        )
                    })
                }

            </Grid>

        </Grid>

    </>)
};


const styles = (theme) => {
    return ({

    });
};

export default PreviousFeedbackPage;