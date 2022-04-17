import react, { useEffect, useState } from "react";
import { Grid, Typography, Button, TextField } from "@mui/material";
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Header from "../components/header.Component.js"
import StarRatingComponent from "../components/starRating.Component.js";
import {useHistory } from "react-router-dom";
import apiUrl from "../config/apiUrl"
import axios from "axios";
import cogoToast from 'cogo-toast';


const FeedBackPage = (props) => {
    const [first, setFirst] = useState(0);
    const [second, setSecond] = useState(0);
    const [third, setThird] = useState(0);
    const [fourth, setfourth] = useState(0);
    const [fifth, setFifth] = useState(0);
    const [sixth, setSixth] = useState(0);
    const [seventh, setSeventh] = useState(0);
    const [eigth, setEigth] = useState(0);
    const [nineth, setNineth] = useState(0);
    const [tenth, setTenth] = useState(0);
    const [avgRating, setAvgRating] = useState();
    const [userFeedback, setUserFeedback] = useState();
    const [questions, setQuestions] = useState([]);
    const history = useHistory();
    const theme = useTheme();
    const classes = styles(theme);
    const user = JSON.parse(localStorage.getItem("user")) ;


    useEffect(async () => {

        if(!user){
            history.push("/")
        }

        try {
            const res = await axios.get(apiUrl+"/api/questions/");
            setQuestions(res.data)
        } catch (err) {
            console.log(err.response);
        }
    }, [])


    
    const onsubmit = async () => {
        const first1 = first ? first : 0
        const second1 = second ? second : 0
        const third1 = third ? third : 0
        const fourth1 = fourth ? fourth : 0
        const fifth1 = fifth ? fifth : 0
        const sixth1 = sixth ? sixth : 0
        const seventh1 = seventh ? seventh : 0
        const eigth1 = eigth ? eigth : 0
        const nineth1 = nineth ? nineth : 0
        const tenth1 = tenth ? tenth : 0
        const avg = (first1 + second1 + third1 + fourth1 + fifth1 + sixth1 + seventh1 + eigth1 + nineth1 + tenth1) / questions.length;
        const averageRating = Math.ceil(avg);
        const body = { userFeedback, averageRating }
        try {
            const res = await axios.post(`${apiUrl}/api/feedbacks/`, body)
            cogoToast.success(<h4>{res.data.successMsg}</h4>);
            
        } catch (err) {
            console.log(err.response);
            cogoToast.error(<h4>{err.response.data.errorMsg}</h4>,{hideAfter:5});
        }
    };

    return (<>
        <Header />
        <br />
        <Grid container justifyContent="space-evenly">

            <Grid
                item
                xs={11} sm={11} md={5.5} lg={5} xl={5}
            >
                {
                    questions[0] ?
                        <StarRatingComponent setRating={setFirst} question={questions[0]?.question} />
                        : null
                }
                {
                    questions[1] ?
                        <StarRatingComponent setRating={setSecond} question={questions[1]?.question} />
                        : null
                }
                {
                    questions[2] ?
                        <StarRatingComponent setRating={setThird} question={questions[2]?.question} />
                        : null
                }
                {
                    questions[3] ?
                        <StarRatingComponent setRating={setfourth} question={questions[3]?.question} />
                        : null
                }
                {
                    questions[4] ?
                        <StarRatingComponent setRating={setFifth} question={questions[4]?.question} />
                        : null
                }
                {
                    questions[5] ?
                        <StarRatingComponent setRating={setSixth} question={questions[5]?.question} />
                        : null
                }
                {
                    questions[6] ?
                        <StarRatingComponent setRating={setSeventh} question={questions[6]?.question} />
                        : null
                }
                {
                    questions[7] ?
                        <StarRatingComponent setRating={setEigth} question={questions[7]?.question} />
                        : null
                }
                {
                    questions[8] ?
                        <StarRatingComponent setRating={setNineth} question={questions[8]?.question} />
                        : null
                }
                {
                    questions[9] ?
                        <StarRatingComponent setRating={setTenth} question={questions[9]?.question} />
                        : null
                }

            </Grid>

            <Grid
                item
                xs={11} sm={11} md={5.5} lg={5} xl={5}
                sx={classes.textFieldGrid}
            >
                <Typography variant="h6">
                    Share your feedback
                </Typography>

                <TextField
                    fullWidth
                    multiline
                    rows={10}
                    placeholder="write here..."
                    sx={{ ...classes.xSpacing15, background: "#f2f2f2" }}
                    onChange={(e) => setUserFeedback(e.target.value)}
                />
                <Button variant="contained" onClick={() => onsubmit()}>Submit</Button>

            </Grid>

        </Grid>
    </>)
};


const styles = (theme) => {
    return ({
        dividerGeneral: {
            margin: "10px", "&.MuiDivider-root": { borderColor: "#c3c3c3" }
        },
        textFieldGrid: {
            [theme.breakpoints.down("md")]: { marginTop: '50px' }
        },
        xSpacing15: {
            marginTop: "15px",
            marginBottom: "15px"
        }
    });
};

export default FeedBackPage;