import { Navigate, Outlet } from "react-router-dom";
import { User, useUserStore } from "../../store/userStore";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const ProtectedRoute = () => {
	const { user, setUser, setLoading, loading } = useUserStore();
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			setLoading(true);
			if (firebaseUser) {
				const user: User = {
					id: firebaseUser.uid,
					username: firebaseUser.displayName || "Unnamed",
					email: firebaseUser.email,
					role: "client",
				};
				setUser(user);
				setLoading(false);
			} else {
				setUser(null);
				setLoading(false);
			}
		});

		return () => unsubscribe();
	}, []);

	if (loading) {
		return <LoadingSpinner />;
	}

	if (!user) {
		return <Navigate to="/sign-up" replace />;
	}
	return <Outlet />;
};

export default ProtectedRoute;
