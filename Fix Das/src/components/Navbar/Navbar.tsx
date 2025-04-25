import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
	// const location = useLocation();
	// const currentPath = location.pathname;
	// const profileRoutes = [
	// 	"/profile",
	// 	"/profile/edit",
	// 	"/profile/add-post",
	// 	"profile/notifications",
	// ];
	// const isProfileActive = profileRoutes.some((route) =>
	// 	currentPath.startsWith(route)
	// );

	return (
		<div className="container-fluid position-fixed bottom-0 bg-white">
			<div className="d-flex justify-content-between align-items-center py-2">
				<NavLink to="/aaa" className="text-decoration-none">
					{({ isActive }) => (
						<div
							className={`d-flex flex-column gap-1 align-items-center py-2 ${
								isActive ? styles.orangeBorder : ""
							}`}
						>
							<div
								className={`${styles.imgContainer} d-flex align-items-center justify-content-center`}
							>
								<img
									src={
										isActive
											? "/navigation-icons/bookings-orange-icon.svg"
											: "/navigation-icons/bookings-icon.svg"
									}
									alt="Bookings icon"
									className="w-100 h-100"
								/>
							</div>
							{isActive && <p className="font-size-12 mb-0 orange">Bookings</p>}
						</div>
					)}
				</NavLink>

				<NavLink to="/aaa" className="text-decoration-none">
					{({ isActive }) => (
						<div
							className={`d-flex flex-column gap-1 align-items-center py-2 ${
								isActive ? styles.orangeBorder : ""
							}`}
						>
							<div
								className={`${styles.imgContainer} d-flex align-items-center justify-content-center`}
							>
								<img
									src={
										isActive
											? "/navigation-icons/search-orange-icon.svg"
											: "/navigation-icons/search-icon.svg"
									}
									alt="Search icon"
									className="w-100 h-100"
								/>
							</div>
							{isActive && (
								<p className="font-size-12 mb-0 orange">Categories</p>
							)}
						</div>
					)}
				</NavLink>

				<NavLink to="/" className="text-decoration-none">
					{({ isActive }) => (
						<div
							className={`d-flex flex-column gap-1 align-items-center py-2 ${
								isActive ? styles.orangeBorder : ""
							}`}
						>
							<div
								className={`${styles.imgContainer} d-flex align-items-center justify-content-center`}
							>
								<img
									src={
										isActive
											? "/navigation-icons/home-orange-icon.svg"
											: "/navigation-icons/home-icon.svg"
									}
									alt="Home icon"
									className="w-100 h-100"
								/>
							</div>
							{isActive && <p className="font-size-12 mb-0 orange">Home</p>}
						</div>
					)}
				</NavLink>

				<NavLink to="/aaa" className="text-decoration-none">
					{({ isActive }) => (
						<div
							className={`d-flex flex-column gap-1 align-items-center py-2 ${
								isActive ? styles.orangeBorder : ""
							}`}
						>
							<div
								className={`${styles.imgContainer} d-flex align-items-center justify-content-center`}
							>
								<img
									src={
										isActive
											? "/navigation-icons/chat-orange-icon.svg"
											: "/navigation-icons/chat-icon.svg"
									}
									alt="Bookings icon"
									className="w-100 h-100"
								/>
							</div>
							{isActive && <p className="font-size-12 mb-0 orange">Chat</p>}
						</div>
					)}
				</NavLink>

				<NavLink to="/profile" className="text-decoration-none">
					{({ isActive }) => (
						<div
							className={`d-flex flex-column gap-1 align-items-center py-2 ${
								isActive ? styles.orangeBorder : ""
							}`}
						>
							<div
								className={`${styles.imgContainer} d-flex align-items-center justify-content-center`}
							>
								<img
									src={
										isActive
											? "/navigation-icons/user-orange-icon.svg"
											: "/navigation-icons/user-icon.svg"
									}
									alt="User icon"
									className="w-100 h-100"
								/>
							</div>
							{isActive && <p className="font-size-12 mb-0 orange">Profile</p>}
						</div>
					)}
				</NavLink>
			</div>
		</div>
	);
};

export default Navbar;
