import React, { useState, useEffect } from "react"
import { Grid, Typography, TextField, Button } from "@mui/material"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import QuestionCardComponent from "../components/questionCard.Component"
import Header from "../components/header.Component"
import axios from "axios";
import cogoToast from 'cogo-toast';
import { useHistory } from "react-router-dom";
import apiUrl from "../config/apiUrl"


const AdminQuestionsPage = () => {
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState();
    const history = useHistory();

    const theme = useTheme();
    const classes = styles(theme);
    const isXS = useMediaQuery(theme.breakpoints.only("xs"));

    useEffect(async () => {
        const res = await axios.get(apiUrl+"/api/questions/");
        setQuestions(res.data);
    }, [questions]);

    const addQuestion = async () => {
        try {
            const body= {question}
            const res = await axios.post(`${apiUrl}/api/questions/`, body)
            cogoToast.success(<h4>{res.data.successMsg}</h4>);


        } catch (err) {
            console.log(err.response);

            if (err.response.status == 401) {
                localStorage.removeItem("user");
                history.push("/")
                cogoToast.error(<h4>{err.response.data.errorMsg}</h4>);
            }
            cogoToast.error(<h4>{err.response.data.errorMsg}</h4>);
        }
    }

    return (<>
        <Header />
        <Grid container justifyContent={"end"} sx={classes.addContainer}>

            <Grid item sx={classes.addHeading} xs={11.5} sm={11.5} md={11.5} lg={11.5} xl={11.5}>
                <Typography variant="body1">Add a question</Typography>
            </Grid>

            <Grid item container direction={isXS ? "column" : "row"} alignItems={isXS ? "start" : ""} xs={11.5} sm={11.5} md={11.5} lg={11.5} xl={11.5}>
                <TextField onChange={(e)=> setQuestion(e.target.value) } type="text" multiline rows={isXS ? 4 : 1} sx={classes.addTextField} size="small" label="Add question" variant="outlined" />
                <Button onClick={()=> addQuestion() } variant="contained" size="medium" sx={classes.addBtn}>Add</Button>
            </Grid>

        </Grid>

        <Grid container sx={classes.questionsContainer}>

            <Grid item xs={0.5} sm={0.5} md={0.5} lg={0.5} xl={0.5} />

            <Grid item xs={11} sm={8} md={8} lg={8} xl={8}>

                {
                    questions?.map((val) => {
                        return (
                            <QuestionCardComponent cardvalue={val} />
                        )
                    })
                }
            </Grid>

        </Grid>
    </>);
};

const styles = () => {
    return ({
        addContainer: {
            mt: { xs: "20px", sm: 5, md: 5, lg: 5, xl: 5 }
        },
        addBtn: {
            ml: "0.5%",
            mt: { xs: "5px", sm: 0, md: 0, lg: 0, xl: 0 }
        },
        addHeading: {
            mb: { xs: "8px", sm: "15px", md: "15px", lg: "15px", xl: "15px" }
        },
        addTextField: {
            width: { xs: "70%", sm: "50%", md: "50%", lg: "50%", xl: "50%" }
        },
        questionsContainer: {
            mt: { xs: 5, sm: 7, md: 7, lg: 7, xl: 7 }
        }
    })
};
export default AdminQuestionsPage;