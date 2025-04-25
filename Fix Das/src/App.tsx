import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import MyBookings from "../src/pages/bookings/MyBookings";
import { SignUp } from "./pages/Auth/SignUp/SignUp";
import SignUpWithEmail from "./pages/Auth/SignUpWithEmail/SignUpWithEmail";
import LandingPage from "./pages/LandingPage/LandingPage";
import Profile from "./pages/Profile/Profile/Profile";
import EditProfile from "./pages/Profile/EditProfile/EditProfile";
import PostAdd from "./pages/Profile/PostAdd/PostAdd";
import Notifications from "./pages/Profile/Notifications/Notifications";
import FindHandyman from "./pages/FindHandyman/FindHandyman";
import Menu from "./pages/Menu/Menu";
import NewProposals from "./pages/bookings/NewProposals/NewProposals";
import OngoingBooking from "./pages/bookings/OngoingBooking/OngoingBooking";
import CompletedBookings from "./pages/bookings/CompletedBookings/CompletedBookings";
import Review from "./pages/bookings/Review/Review";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Landing page */}
				<Route path="/" element={<LandingPage />} />
				<Route path="/find-handyman" element={<FindHandyman />} />
				<Route path="/menu" element={<Menu />} />

				{/* Login and sign up */}
				<Route path="sign-up" element={<SignUp />} />
				<Route path="sign-up-email" element={<SignUpWithEmail />} />

				{/* Bookings */}
				<Route path="bookings/new-proposals" element={<NewProposals />} />
				<Route path="bookings/ongoing" element={<OngoingBooking />} />
				<Route path="bookings/review" element={<Review />} />
				<Route path="bookings/completed" element={<CompletedBookings />} />

				{/* Profile */}
				<Route path="/profile" element={<Profile />} />
				<Route path="/profile/edit" element={<EditProfile />} />
				<Route path="/profile/post-add" element={<PostAdd />} />
				<Route path="/profile/notifications" element={<Notifications />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
