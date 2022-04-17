import { Grid, Typography, Button, TextField } from "@mui/material";
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from "react-router-dom";
import axios from "axios";
import cogoToast from 'cogo-toast';
import { useState } from "react";
import apiUrl from "../config/apiUrl"




const FeedbacksCard = ({ cardData, refetchData }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [userFeedback, setUserFeedback] = useState()
    // console.log(typeof reFetch)
    const history = useHistory();
    const theme = useTheme();
    const isWidth400px = useMediaQuery("(max-width:400px)");
    const classes = styles(theme);
    const user = JSON.parse(localStorage.getItem("user"));


    const date = cardData?.date + "  |  " + cardData?.time;
    const rating = cardData?.averageRating;
    const feedback = cardData?.userFeedback;
    const userName = cardData?.userId?.userName;
    const userEmail = cardData?.userId?.email;
    const userPhone = cardData?.userId?.phone1;
    const role = user.role;


    const onDelete = async () => {
        try {
            const res = await axios.delete(`${apiUrl}/api/feedbacks/${cardData?._id}`)
            cogoToast.success(<h4>{res?.data?.successMsg}</h4>);
            refetchData();

        } catch (err) {
            console.log(err?.response);

            if (err?.response?.status == 401) {
                localStorage.removeItem("user");
                history.push("/")
                cogoToast.error(<h4>{err?.response?.data?.errorMsg}</h4>);
            }
            cogoToast.error(<h4>{err?.response?.data?.errorMsg}</h4>);
        }
    }


    const onEdit = async () => {
        try {
            const body = { userFeedback }
            const res = await axios.patch(`${apiUrl}/api/feedbacks/${cardData?._id}`, body)
            cogoToast.success(<h4>{res?.data?.successMsg}</h4>);
            refetchData();
            
        } catch (err) {
            console.log(err);
            console.log(err?.response);

            if (err?.response?.status == 401) {
                localStorage.removeItem("user");
                history.push("/")
                cogoToast.error(<h4>{err.response.data.errorMsg}</h4>);
            }
            cogoToast.error(<h4>{err.response?.data?.errorMsg}</h4>);
        }
    }


    return (<>
        <Grid
            container
            justifyContent="center"
            sx={classes.conatiner}
        >

            {/* Date/rating container */}
            <Grid
                item
                container
                justifyContent="start"
                xs={11} sm={11} md={11} lg={11} xl={11}
                sx={{ ...classes.date_RatingContainer }}
            >
                <Typography color="white" variant="subtitle1">
                    Date: {date}
                </Typography>

                <Typography color="white" variant="subtitle1" sx={{ marginLeft: "3%" }}>
                    Rating: {rating}/5
                </Typography>
            </Grid>




            {/* divider */}
            <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
                <Divider sx={{ ...classes.dividerGeneral }} />
            </Grid>

            {/* user-name container */}
            {
                role == "admin" ? (<>

                    <Grid item container xs={11} sm={11} md={11} lg={11} xl={11}>
                        <Typography color="white" variant="subtitle1" sx={{ fontWeight: "bold", mb: 1, fontSize: "18px" }} >
                            Name: {userName} &nbsp;&nbsp; | &nbsp;&nbsp;
                        </Typography>
                        <Typography color="white" variant="subtitle1" sx={{ fontWeight: "bold", mb: 1, fontSize: "18px" }} >
                            Email: {userEmail} &nbsp;&nbsp; | &nbsp;&nbsp;
                        </Typography>
                        <Typography color="white" variant="subtitle1" sx={{ fontWeight: "bold", mb: 1, fontSize: "18px" }} >
                            Phone {userPhone}
                        </Typography>
                    </Grid>
                </>) : null
            }

            {/* Feedback container */}
            {
                isEdit ? (<>
                    <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>

                        <TextField
                            type={"text"}
                            multiline
                            defaultValue={feedback}
                            fullWidth
                            onChange={(e) => setUserFeedback(e.target.value)}
                            sx={{ border: "2px solid white", borderRadius: "5px", background: "white" }}
                        />
                    </Grid>

                </>) : (<>

                    <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
                        <Typography color="white" variant="subtitle1" >
                            {feedback}
                        </Typography>
                    </Grid>

                </>)
            }


            <Grid
                item
                container
                xs={11} sm={11} md={11} lg={11} xl={11}
                sx={classes.btnsGrid}
                justifyContent={isWidth400px ? "center" : null}
            >

                {/* checking user role  */}
                {role == "user" ? (
                    null
                    // <Button onClick={()=> onDelete(cardData?._id) } sx={{ ...classes.deleteBtn }}>
                    //     Delete
                    // </Button>
                ) : (<>


                    {/* edit options */}
                    {
                        isEdit ? (<>
                            <Button onClick={onEdit} sx={{ ...classes.editBtn }}>
                                Save
                            </Button>
                            <Button onClick={() => setIsEdit(false)} sx={{ ...classes.editBtn }}>
                                Cancel
                            </Button>

                        </>) :
                            (<>
                                <Button onClick={() => setIsEdit(true)} sx={{ ...classes.editBtn }}>
                                    Edit
                                </Button>
                            </>)

                    }

                    <Button onClick={() => onDelete()} sx={{ ...classes.deleteBtn }}>
                        Delete
                    </Button>



                </>)}

            </Grid>

        </Grid>
    </>);
};

const styles = (theme) => ({
    conatiner: {
        background: "#4d79ff",
        borderRadius: "10px",
        marginTop: "25px",
        pb: 1.5
    },
    date_RatingContainer: {
        marginTop: "8px",
        marginBottom: "5px",
    },
    dividerGeneral: {
        margin: "5px",
        marginBottom: "10px",
        "&.MuiDivider-root": { borderColor: "white" },
    },
    editBtn: {
        background: "white",
        padding: "2px",
        border: " 2px solid white",
        margin: "10px",
        marginLeft: "0px",
        "&:hover": {
            color: "white",
        }
    },
    deleteBtn: {
        background: "#ff3333",
        padding: "2px",
        color: "white",
        margin: "10px",
        marginLeft: "0px",
        border: "2px solid #ff3333",
        "&:hover": { border: "2px solid white" }
    },
    btnsGrid: {
        // [theme.breakpoints.only("xs")]: {
        //     display:"flex",
        //     justifyContent:"center",
        //     alignItems:"center",
        //     margin:"15px"
        // }
    }
});

export default FeedbacksCard;