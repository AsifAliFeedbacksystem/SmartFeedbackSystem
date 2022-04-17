import React, { useState } from "react"
import { Grid, Typography, TextField, Button } from "@mui/material"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import axios from "axios";
import cogoToast from 'cogo-toast';
import { useHistory } from "react-router-dom";
import apiUrl from "../config/apiUrl"



const QuestionCardComponent = ({ cardvalue }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [question, setQuestion] = useState()
    const history = useHistory();

    const theme = useTheme();
    const classes = styles(theme);
    const isXS = useMediaQuery(theme.breakpoints.only("xs"));

    const onDelete = async (id) => {
        try {
            const res = await axios.delete(`${apiUrl}/api/questions/${id}`)
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


    const onUpdate = async (id) => {
        try {
            const body = {question};
            const res = await axios.patch(`${apiUrl}/api/questions/${id}`, body)
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
        <Grid container sx={classes.container}>

            {
                isEdit ?
                    (<>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <TextField 
                            type={"text"} 
                            defaultValue={cardvalue?.question}  
                            fullWidth
                            onChange={(e)=>setQuestion(e.target.value)}
                            />
                        </Grid>
                    </>) :
                    (<>
                        <Grid item>
                            <Typography >{cardvalue?.question}</Typography>
                        </Grid>

                    </>)
            }

            <Grid item container>
                {
                   !isEdit?
                    <Button onClick={() => setIsEdit(true)} variant="contained" sx={{ ...classes.editBtn }}>Edit</Button>
                    :
                    (<>
                    <Button onClick={() => onUpdate(cardvalue?._id)} variant="contained" sx={{ ...classes.editBtn }}>Update</Button>
                    <Button onClick={() => setIsEdit(false)} variant="contained" sx={{ ...classes.editBtn }}>Cancel</Button>
                    </>)
                }
                <Button onClick={() => onDelete(cardvalue?._id)} sx={{ ...classes.deleteBtn }}>Delete</Button>
            </Grid>

        </Grid>
    </>);
};

const styles = () => {
    return ({
        container: {
            border: "3px solid #4d79ff",
            p: "20px",
            borderRadius: "30px",
            mb: { xs: "10px", sm: "15px", md: "15px", lg: "15px", xl: "15px" }
        },
        deleteBtn: {
            background: "#ff3333",
            padding: "2px",
            color: "white",
            margin: "10px",
            marginLeft: "0px",
            border: "2px solid #ff3333",
            "&:hover": { border: "2px solid white", color: "red" }
        },
        editBtn: {
            // background: "white",
            padding: "2px",
            // border: " 2px solid lightblue",
            margin: "10px",
            marginLeft: "0px",
            "&:hover": {
                color: "white",
            }
        },
    })
};
export default QuestionCardComponent;