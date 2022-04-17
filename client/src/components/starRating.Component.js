import react, { useState } from "react";
import { useTheme } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import { Grid, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';



const StarRatingComponent = (props) => {
    const [value, setValue] = useState(1);
    const theme = useTheme();
    const classes = styles(theme);
    return (<>
        <Grid
            container
            direction="row"
            justifyContent="start"
            alignItems="center"
        >

            <Grid
                item
                textAlign={"start"}
                xs={11} sm={11} md={11} lg={11} xl={11}
                sx={{ ...classes.questionGrid }}>
                <Typography variant="h6">
                    {props.question}
                </Typography>
            </Grid>

            <Grid
                item
                container
                justifyContent="start"
                alignItems='center'
                xs={11} sm={11} md={11} lg={11} xl={11}
            >
                <Rating
                    sx={classes.rating}
                    onChange={(e) => {
                        props.setRating(parseInt(e.target.value))
                        setValue(e.target.value)
                    }}
                    value={value}
                />
                <Typography variant="body1" sx={classes.ratingNumber}>
                    {value}/5
                </Typography>
            </Grid>

        </Grid>
        <Divider sx={{ ...classes.dividerGeneral }} />
    </>)
};

const styles = (theme) => {
    return ({
        rating: {
            color: "#4d79ff",
            fontSize: "40px",
            [theme.breakpoints.down("sm")]: { fontSize: '30px' }
        },
        questionGrid: {
            margin: "5px",
            marginLeft: "0.7%"
        },
        ratingNumber: {
            marginLeft: "2%"
        },
        dividerGeneral: {
            margin: "15px", "&.MuiDivider-root": { borderColor: "#c3c3c3" }
        },
    });
};

export default StarRatingComponent;