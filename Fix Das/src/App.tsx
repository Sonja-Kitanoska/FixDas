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

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="sign-up" element={<SignUp />} />
				<Route path="sign-up-email" element={<SignUpWithEmail />} />
				{/* <MyBookings /> */}

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
