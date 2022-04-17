import { Route, Switch } from "react-router-dom";
import HomePage from "../user/home.Page";
import SignUpPage from "../user/signUp.Page";
import FeedBackPage from "../user/feedback.Page";
import PreviousFeedbackPage from "../user/previousFeedback.Page"
import UserProfilePage from "../user/userProfile.Page"
import Footer from "../components/footer.Component"
import AdminFeedbacksPage from "../admin/adminFeedbacks.Page"
import AdminProfilePage from "../admin/adminProfile.Page"
import AdminQuestionsPage from "../admin/adminQuestions.Page";
import { useRouteMatch, withRouter } from "react-router-dom";
import PublicFeedbacksPage from "../user/publicFeedbacks.Page";
import GuestFeedBackPage from "../user/guestFeedback"
import AdminGuestFeedbacksPage from "../admin/adminGuestsFeedbacks"


const AppRoutes = (props) => {


    return (<>
        <Switch>

            {/* User Routes */}
            <Route exact path="/" component={HomePage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/user-profile" component={UserProfilePage} />
            <Route path="/feedback" component={FeedBackPage} />
            <Route path="/previous-feedbacks" component={PreviousFeedbackPage} />
            <Route path="/public-reviews" component={PublicFeedbacksPage} />
            <Route path="/guest-feedback" component={GuestFeedBackPage} />


            {/* Admin routes */}
            <Route path="/admin-profile" component={AdminProfilePage} />
            <Route path="/admin-feedbacks" component={AdminFeedbacksPage} />
            <Route path="/admin-questions" component={AdminQuestionsPage} />
            <Route path="/admin-guest-feedbacks" component={AdminGuestFeedbacksPage} />

        </Switch>
        {/* <Footer /> */}

    </>);
}

export default AppRoutes;