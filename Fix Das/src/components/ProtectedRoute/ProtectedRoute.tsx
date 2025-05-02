import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

const ProtectedRoute = () => {
	const { user } = useUserStore();

	if (!user) {
		return <Navigate to="/sign-up" replace />;
	}
	return <Outlet />;
};

export default ProtectedRoute;
