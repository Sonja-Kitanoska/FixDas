import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

const PublicRoute = () => {
	const { user } = useUserStore();

	if (user) {
		return <Navigate to="/homepage" replace />;
	}

	return <Outlet />;
};

export default PublicRoute;
