import react, { useEffect, useState } from "react";
import { Grid, Typography, Button, TextField } from "@mui/material";
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Header from "../components/header.Component.js"
import StarRatingComponent from "../components/starRating.Component.js";
import axios from "axios";
import cogoToast from 'cogo-toast';
import apiUrl from "../config/apiUrl"


const GuestFeedBackPage = (props) => {
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
    const [userName, setUserName] = useState();
    const [phone1, setPhone1] = useState();
    const [email, setEmail] = useState();
    const [questions, setQuestions] = useState([]);
    const theme = useTheme();
    const classes = styles(theme);

    useEffect(async () => {
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
        const body = { userFeedback, averageRating, phone1, email, userName }
        if(body.userFeedback == undefined || body.userFeedback == null){
            cogoToast.error("Kindly provide Feedback");
            return null;
        }
        if(body.userName == undefined || body.userName == null){
            cogoToast.error("Kindly provide Name");
            return null;
        }
        if(body.email == undefined || body.email == null){
            cogoToast.error("Kindly provide Email");
            return null;
        }
        if(body.phone1 == undefined || body.phone1 == null){
            cogoToast.error("Kindly provide Phone#");
            return null;
        }
        try {
            const res = await axios.post(`${apiUrl}/api/guestFeedbacks/`, body)
            cogoToast.success(
                <div>
                    <center>
                    <h3>Thank you For your Feedback</h3>
                    <h4>Get yourself Register to show your feedback to public and get points</h4>
                    </center>
                </div>,
                { hideAfter: 5 });

        } catch (err) {
            console.log(err.response);
            cogoToast.error(<h4>{err.response.data.errorMsg}</h4>);
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
                    label="Feedback"
                    fullWidth
                    type={"text"}
                    multiline
                    rows={10}
                    placeholder="write here..."
                    sx={{ ...classes.xSpacing15, background: "#f2f2f2" }}
                    onChange={(e) => setUserFeedback(e.target.value)}
                />
                <Typography variant="h6">
                    Share your Details
                </Typography>

                <TextField
                    label="Name"
                    type="text"
                    placeholder="write here..."
                    sx={{ ...classes.xSpacing15, background: "#f2f2f2" }}
                    fullWidth
                    onChange={(e) => setUserName(e.target.value)}

                />

                <TextField
                    label="Email"
                    type="email"
                    placeholder="write here..."
                    sx={{ ...classes.xSpacing15, background: "#f2f2f2" }}
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}

                />

                <TextField
                    label="Phone"
                    type="text"
                    placeholder="write here..."
                    sx={{ ...classes.xSpacing15, background: "#f2f2f2" }}
                    fullWidth
                    onChange={(e) => setPhone1(e.target.value)}

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

export default GuestFeedBackPage;