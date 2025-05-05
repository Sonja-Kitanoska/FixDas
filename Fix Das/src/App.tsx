import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
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
import Homepage from "./pages/Homepage/Homepage";
import Categories from "./pages/Categories/Categories";
import SignUp from "./pages/Auth/SignUp/SignUp";
import SignIn from "./pages/Auth/SignIn/SignIn";
import HandymanPublicProfile from "./pages/HandymanPublicProfile/HandymanPublicProfile";
import Chat from "./pages/Chat/Chat/Chat";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import CalendarPage from "./pages/SendRequestToHandyman/CalendarPage";

function App() {
	return (
		<div style={{ backgroundColor: "#FAFAFA" }}>
			<BrowserRouter>
				<Routes>
					{/* PUBLIC ROUTES */}
					{/* Landing page */}
					<Route path="/" element={<LandingPage />} />
					<Route path="/find-handyman" element={<FindHandyman />} />
					<Route path="/menu" element={<Menu />} />
					{/* Public Profile Handyman */}
					<Route
						path="/homepage/handyman-public-profile"
						element={<HandymanPublicProfile />}
					/>

					<Route element={<PublicRoute />}>
						{/* Login and sign up */}
						<Route path="/sign-up" element={<SignUp />} />
						<Route path="/sign-up-email" element={<SignUpWithEmail />} />
						<Route path="/sign-in" element={<SignIn />} />
						<Route path="/reset-password" element={<ResetPassword />} />
					</Route>

					{/* PROTECTED ROUTES */}

					{/* Bookings */}
					<Route element={<ProtectedRoute />}>
						<Route path="/bookings" element={<NewProposals />} />
						<Route path="/bookings/ongoing" element={<OngoingBooking />} />
						<Route path="/bookings/review/:proposalId" element={<Review />} />
						<Route path="/bookings/completed" element={<CompletedBookings />} />
						{/* Send request to handyman */}
						<Route path="/bookings/calendar" element={<CalendarPage />} />

						{/* Categories*/}
						<Route path="/categories" element={<Categories />} />
						<Route path="/categories/filter" element={<>Categories filter</>} />

						{/* Chat */}
						<Route path="/chat" element={<Chat />} />
						<Route path="/chat/start" element={<>Chat start</>} />
						<Route path="/chat/ongoing" element={<>Chat ongoing</>} />

						{/* Homepage */}
						<Route path="/homepage" element={<Homepage />} />

						{/* Profile */}
						<Route path="/profile" element={<Profile />} />
						<Route path="/profile/edit" element={<EditProfile />} />
						<Route path="/profile/post-add" element={<PostAdd />} />
						<Route path="/profile/notifications" element={<Notifications />} />
					</Route>

					{/* Catch-all route for non-existent pages */}
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
