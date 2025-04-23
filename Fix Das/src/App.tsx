import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import MyBookings from "../src/pages/bookings/MyBookings";
import { SignUp } from "./pages/Auth/SignUp/SignUp";
import SignUpWithEmail from "./pages/Auth/SignUpWithEmail/SignUpWithEmail";
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="sign-up" element={<SignUp />} />
				<Route path="sign-up-email" element={<SignUpWithEmail />} />
				{/* <MyBookings /> */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
