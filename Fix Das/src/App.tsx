import {
	BrowserRouter,
	Navigate,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
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
import CalendarPage from "./pages/SendRequestToHandyman/CalendarPage/CalendarPage";
import Filter from "./pages/Filter/Filter";
import ChatRoom from "./pages/Chat/ChatRoom/ChatRoom";
import BookingDetails from "./pages/SendRequestToHandyman/BookingDetails/BookingDetails";
import EnterLocation from "./pages/SendRequestToHandyman/EnterLocation/EnterLocation";
import { useEffect, useState } from "react";
import MobileWarning from "./components/MobileWarning/MobileWarning";

function App() {
	const Wrapper = ({ children }: { children: React.ReactNode }) => {
		const location = useLocation();

		useEffect(() => {
			window.scrollTo({ top: 0, left: 0, behavior: "instant" });
		}, [location.pathname]);

		return <>{children}</>;
	};
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

	useEffect(() => {
		function handleResize() {
			setIsMobile(window.innerWidth < 768);
		}
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	if (!isMobile) {
		return <MobileWarning />;
	}

	return (
		<div style={{ backgroundColor: "#FAFAFA" }}>
			<BrowserRouter>
				<Wrapper>
					<Routes>
						{/* PUBLIC ROUTES */}
						{/* Landing page */}
						<Route path="/" element={<LandingPage />} />
						<Route path="/find-handyman" element={<FindHandyman />} />
						<Route path="/menu" element={<Menu />} />
						<Route path="/filter" element={<Filter />} />

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
							<Route
								path="/bookings/completed"
								element={<CompletedBookings />}
							/>
							{/* Send request to handyman */}
							<Route
								path="/bookings/calendar/:handymanId"
								element={<CalendarPage />}
							/>
							<Route
								path="/bookings/booking-details/:handymanId"
								element={<BookingDetails />}
							/>
							<Route
								path="/bookings/enter-location/:handymanId"
								element={<EnterLocation />}
							/>

							{/* Categories*/}
							<Route path="/categories" element={<Categories />} />

							{/* Chat */}
							<Route path="/chat" element={<Chat />} />
							<Route path="/chat/:id" element={<ChatRoom />} />

							{/* Homepage */}
							<Route path="/homepage" element={<Homepage />} />
							{/* Public Profile Handyman */}
							<Route
								path="/homepage/handyman-public-profile/:handymanId"
								element={<HandymanPublicProfile />}
							/>

							{/* Profile */}
							<Route path="/profile" element={<Profile />} />
							<Route path="/profile/edit" element={<EditProfile />} />
							<Route path="/profile/post-add" element={<PostAdd />} />
							<Route
								path="/profile/notifications"
								element={<Notifications />}
							/>
						</Route>

						{/* Catch-all route for non-existent pages */}
						<Route path="*" element={<Navigate to="/sign-up" replace />} />
					</Routes>
				</Wrapper>
			</BrowserRouter>
		</div>
	);
}

export default App;
