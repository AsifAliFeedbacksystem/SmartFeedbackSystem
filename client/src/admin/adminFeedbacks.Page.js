import React, { useEffect, useRef, useState } from "react";
import { Grid, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Switch from '@mui/material/Switch';
import Header from "../components/header.Component"
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FeedbacksCard from "../components/feedbackCard.Compnent"
import axios from "axios";
import apiUrl from "../config/apiUrl"





const AdminFeedbacksPage = () => {
    const [generalFeedbacks, setGeneralFeedbacks] = useState([]);
    const [rating, setRating] = React.useState();
    const [date, setDate] = React.useState();
    const [feedbacksByDate, setFeedbacksByDate] = React.useState([]);
    const [feedbacksByRating, setFeedbacksByRating] = React.useState([]);

    const theme = useTheme();
    const sortBylatestFeedbacks = useRef();
    const sortByDate = useRef();
    const sortByRating = useRef();
    const searchingContainerRef = useRef();
    const classes = styles(theme);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const [day, setDay] = React.useState();
    console.log(date)
    console.log(rating)
    console.log(day);

    // sorting dropdown
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // sorting handlers
    const handelDateDisplay = () => {
        searchingContainerRef.current.style.display = "block"
        sortByDate.current.style.display = "block"
        sortByRating.current.style.display = "none"
        sortBylatestFeedbacks.current.style.display = "none"
    };
    const handelRatingDisplay = () => {
        searchingContainerRef.current.style.display = "block"
        sortByRating.current.style.display = "block"
        sortByDate.current.style.display = "none"
        sortBylatestFeedbacks.current.style.display = "none"
    };
    const handelLatestFeedbackDisplay = async () => {
        searchingContainerRef.current.style.display = "none"
        sortBylatestFeedbacks.current.style.display = "none"
        sortByRating.current.style.display = "none"
        sortByDate.current.style.display = "none"
        try {
            const res = await axios.get(apiUrl+"/api/feedbacks/");
            setGeneralFeedbacks(res.data.reverse());
            setFeedbacksByRating([]);
            setFeedbacksByDate([]);
        } catch (err) {
            console.log(err.response)
        }

    };



    useEffect(async () => {
        try {
            const res = await axios.get(apiUrl+"/api/feedbacks/");
            setGeneralFeedbacks(res.data.reverse());
        } catch (err) {
            console.log(err.response)
        }

    }, []);


    const getFeedbacksByDate = async () => {
        try {
            const body = { date }
            const res = await axios.post(apiUrl+"/api/feedbacks/feedbacksByDate", body)
            setFeedbacksByDate(res.data.reverse());
            setGeneralFeedbacks([]);
            setFeedbacksByRating([]);

        } catch (err) {
            console.log(err.response);
        }
    }

    const getFeedbacksByRating = async () => {
        try {
            const body = { rating }
            const res = await axios.post(apiUrl+"/api/feedbacks/feedbacksByRating", body)
            setFeedbacksByRating(res.data.reverse());
            setFeedbacksByDate([]);
            setGeneralFeedbacks([]);

        } catch (err) {
            console.log(err.response);
        }
    }



    // REFETCH DATA FROM API

    const refetchFeedbacksByRating = async () => {
        try {
            const body = { rating }
            const res = await axios.post(apiUrl+"/api/feedbacks/feedbacksByRating", body)
            setFeedbacksByRating(res.data.reverse());
            setFeedbacksByDate([]);
            setGeneralFeedbacks([]);

        } catch (err) {
            console.log(err.response);
        }
    }


    const refetchFeedbacksByDate = async () => {
        try {
            const body = { date }
            const res = await axios.post(apiUrl+"/api/feedbacks/feedbacksByDate", body)
            setFeedbacksByDate(res.data.reverse());
            setGeneralFeedbacks([]);
            setFeedbacksByRating([]);

        } catch (err) {
            console.log(err.response);
        }
    }


    const refetchGeneralFeedback = async () => {
        try {
            const res = await axios.get(apiUrl+"/api/feedbacks/");
            setGeneralFeedbacks(res.data.reverse());
            setFeedbacksByRating([]);
            setFeedbacksByDate([]);
        } catch (err) {
            console.log(err.response)
        }
    }

    return (<>
        <Header />
        <br />
        <br />
        <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={classes.secondaryNav}
        >

            <Grid
                item
                container
                justifyContent="center"
                xs={12} sm={5} md={5} lg={5} xl={5}
                sx={classes.showPublicFeedBacksContainer}
            >
                <Typography>
                    Show Feedbacks to public
                    <Switch />
                </Typography>
            </Grid>

            <Grid
                item
                container
                justifyContent="center"
                xs={12} sm={4} md={4} lg={4} xl={4}
                sx={classes.sortingContainer}
            >
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{ borderRadius: "0px", background: "#d9d9d9", width: "160px", color: "black" }}
                >
                    <Typography >Sort By</Typography>
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handelDateDisplay}>Sort By Date</MenuItem>
                    <MenuItem onClick={handelRatingDisplay}>Sort By Rating</MenuItem>
                    <MenuItem onClick={handelLatestFeedbackDisplay}>Latest</MenuItem>
                </Menu>
            </Grid>
        </Grid>

        {/* Sorting Grid */}
        <Grid
            container
            sx={classes.searchingContainer}
            ref={searchingContainerRef}
        >

            {/* Date Picker container */}
            <Grid
                item
                container
                justifyContent={"start"}
                alignItems={"center"}
                xs={12} sm={12} md={12} lg={12} xl={12}
                sx={classes.DatePickerGrid}
            >
                <Grid container direction="row" justifyContent={"center"} alignItems={"center"} ref={sortByDate} sx={{ ...classes.datePicker }}>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                        <TextField
                            id="date"
                            label="Sort By Date"
                            type="date"
                            defaultValue={date}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => setDate(e.target.value)}
                        // ref={sortByDate}
                        />
                    </Grid>

                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                        <Button onClick={() => getFeedbacksByDate()} variant="contained" sx={classes.searchBtn}>
                            search
                        </Button>
                    </Grid>


                </Grid>


                {/* Rating Box */}
                <Box ref={sortByRating} sx={{ ...classes.ratingBox }}>
                    <Grid container flexDirection={"row"} justifyContent={"center"} alignItems={"center"}>
                        <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Rating</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={rating}
                                    label="Select Rating"
                                    onChange={(e) => setRating(e.target.value)}
                                >
                                    <MenuItem value={0}>0 Star</MenuItem>
                                    <MenuItem value={1}>1 Star</MenuItem>
                                    <MenuItem value={2}>2 Star</MenuItem>
                                    <MenuItem value={3}>3 Star</MenuItem>
                                    <MenuItem value={4}>4 Star</MenuItem>
                                    <MenuItem value={5}>5 Star</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Search Button */}
                        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} >
                            <Button onClick={() => getFeedbacksByRating()} variant="contained" sx={classes.searchBtn}>
                                search
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                {/* latest Feedbacks search */}
                <Box ref={sortBylatestFeedbacks} sx={{ ...classes.latestFeedbacks }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Day</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={day}
                            label="Select day"
                            onChange={(e) => setDay(e.target.value)}
                        >
                            <MenuItem value={1}>1 day ago</MenuItem>
                            <MenuItem value={2}>2 day ago</MenuItem>
                            <MenuItem value={3}>3 day ago</MenuItem>
                            <MenuItem value={4}>4 day ago</MenuItem>
                            <MenuItem value={5}>5 day ago</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* Search Button */}
                {/* <Button variant="contained" sx={classes.searchBtn}>
                    search
                </Button> */}


            </Grid>

        </Grid>


        <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
            {
                ((() => {
                    if (generalFeedbacks.length !== 0) return <Typography variant="h4" sx={classes.sortingHeading}>latest Feedbacks</Typography>
                    if (feedbacksByDate.length !== 0) return <Typography variant="h4" sx={classes.sortingHeading}>Sorted By Date</Typography>
                    if (feedbacksByRating.length !== 0) return <Typography variant="h4" sx={classes.sortingHeading}>Sorted By Rating</Typography>
                })())
            }
        </Grid>

        {/* USER FEEDBACKS */}
        <Grid container >

            {/* <Grid
                item
                sx={{ border: "5px solid green" }}
                xs={0.5} sm={0.5} md={0.5} lg={0.5} xl={0.5}
            /> */}

            <Grid
                item
                container
                flexDirection={"row"}
                xs={12} sm={12} md={12} lg={12} xl={12}
            // style={{ border: "5px solid green" }}
            >

                {
                    generalFeedbacks?.map((val, index) => {
                        return (
                            <Grid
                                key={index}
                                item
                                xs={11} sm={11} md={11} lg={11} xl={11}
                                // sx={{ mt: 0, ml: "2%", mb: 0, mr: 0 }}
                                sx={{ ml: "2%" }}
                            >
                                <FeedbacksCard
                                    refetchData={refetchGeneralFeedback}
                                    // refetchData={(refetchGeneralFeedback,refetchFeedbacksByDate,refetchFeedbacksByRating) => {
                                    //     if (generalFeedbacks.length !== 0) return refetchGeneralFeedback
                                    //     if (feedbacksByDate.length !== 0) return refetchFeedbacksByDate
                                    //     if (feedbacksByRating.length !== 0) return refetchFeedbacksByRating
                                    // }}
                                    cardData={val}
                                />
                            </Grid>
                        );
                    })
                }
                {
                    feedbacksByDate?.map((val, index) => {
                        return (
                            <Grid
                                key={index}
                                item
                                xs={11} sm={11} md={11} lg={11} xl={11}
                                // sx={{ mt: 0, ml: "2%", mb: 0, mr: 0 }}
                                sx={{ ml: "2%" }}
                            >
                                <FeedbacksCard
                                    refetchData={refetchFeedbacksByDate}
                                    // refetchData={(refetchGeneralFeedback,refetchFeedbacksByDate,refetchFeedbacksByRating) => {
                                    //     if (generalFeedbacks.length !== 0) return refetchGeneralFeedback
                                    //     if (feedbacksByDate.length !== 0) return refetchFeedbacksByDate
                                    //     if (feedbacksByRating.length !== 0) return refetchFeedbacksByRating
                                    // }}
                                    cardData={val}
                                />
                            </Grid>
                        );
                    })
                }
                {
                    feedbacksByRating?.map((val, index) => {
                        return (
                            <Grid
                                key={index}
                                item
                                xs={11} sm={11} md={11} lg={11} xl={11}
                                // sx={{ mt: 0, ml: "2%", mb: 0, mr: 0 }}
                                sx={{ ml: "2%" }}
                            >
                                <FeedbacksCard
                                refetchData={refetchFeedbacksByRating}
                                    // refetchData={(refetchGeneralFeedback, refetchFeedbacksByDate, refetchFeedbacksByRating) => {
                                    //     if (generalFeedbacks.length !== 0) return refetchGeneralFeedback
                                    //     if (feedbacksByDate.length !== 0) return refetchFeedbacksByDate
                                    //     if (feedbacksByRating.length !== 0) return refetchFeedbacksByRating
                                    // }}
                                    cardData={val}
                                />
                            </Grid>
                        );
                    })
                }













            </Grid>
        </Grid>


    </>);
};

const styles = (theme) => ({
    secondaryNav: {
        // height: "50px",
        background: "#f2f2f2"
    },
    showPublicFeedBacksContainer: {
        [theme.breakpoints.only("xs")]: {
            paddingLeft: "20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
        }

    },
    sortingContainer: {
        [theme.breakpoints.only("xs")]: {
            paddingLeft: "20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
        }
    },
    searchingContainer: {
        background: "#f2f2f2",
        marginTop: "15px",
        paddingTop: "15px",
        paddingBottom: "15px",
        display: "none",
    },
    searchBtn: {
        height: "50px",
        marginLeft: "2%",
        [theme.breakpoints.only("xs")]: { marginTop: "5px" }
    },
    DatePickerGrid: {
        marginLeft: "5%",
        [theme.breakpoints.only("xs")]: {
            display: "flex",
            flexDirection: "column",
            alignItems: "start"
        },
    },
    datePicker: {
        width: { xs: "80%", sm: "30%" },
        display: "none",
    },
    ratingBox: {
        width: { xs: "40%", sm: "30%" },
        display: "none"
    },
    latestFeedbacks: {
        width: { xs: "45%", sm: "30%" },
        display: "none"
    },
    ratingSelect: {
        "& .MuiSelect-select:hover": { border: "none" }
    },
    sortingHeading: {
        ml: "3%",
        mt: 4
    }

});

export default AdminFeedbacksPage;