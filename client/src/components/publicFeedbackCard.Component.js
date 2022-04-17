import React from "react"
import { Grid, Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Rating from '@mui/material/Rating';


const PublicFeedbackCard = ({cardValue}) => {
    console.log(cardValue)
    const theme = useTheme();
    const isWidth340 = useMediaQuery("(max-width:340px)");
    const isWidth400 = useMediaQuery("(max-width:400px)");
    const windowheight = window.innerHeight;
    const classes = styles(theme, windowheight);

    const userName = cardValue?.userId.userName;
    const value = cardValue?.averageRating;
    const feedback = cardValue?.userFeedback ;
    const date = cardValue?.date
    return (
        <>
            <Grid container sx={classes.mainContainer}>

                <Grid
                    item
                    container
                    justifyContent={"center"}
                    alignItems={"center"}
                    xs={3} sm={2} md={2} lg={2} xl={2}
                >
                    <img src="/assets/userImage.jpg" width="70%" style={classes.image} />
                </Grid>

                <Grid
                    item
                    xs={isWidth340 ? 9 : 7} sm={5} md={6} lg={4} xl={4}
                >
                    <Rating
                        readOnly
                        size={isWidth400 ? "small" : "large"}
                        sx={classes.rating}
                        value={value}
                    />
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>@{userName}</Typography>
                    <Typography variant="subtitle1" fontSize={"small"} > date: {date}</Typography>
                </Grid>

                <Grid
                    item
                    sx={{ mt: 2 }}
                    xs={11} sm={11} md={11} lg={11} xl={11}
                >
                    <Typography variant="subtitle1">
                        {feedback}
                    </Typography>
                </Grid>



            </Grid>
        </>
    );
}

const styles = (theme, windowheight) => {
    return ({
        mainContainer: {
            background: "white",
            p: 2,
            boxShadow: "1px 0px 10px 1px rgba(0,0,0,0.30)",
            mb: 4
        },
        image: {
            borderRadius: "50%",
            border: "2px solid #4d79ff",
            padding: "1px"
        }
    });
};



export default PublicFeedbackCard;