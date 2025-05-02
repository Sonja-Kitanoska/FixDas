import { Navigate, Outlet } from "react-router-dom";
import { User, useUserStore } from "../../store/userStore";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { doc, getDoc } from "firebase/firestore";

const ProtectedRoute = () => {
	const { user, setUser, setLoading, loading } = useUserStore();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
			setLoading(true);
			if (firebaseUser) {
				const docRef = doc(db, "users", firebaseUser.uid);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					const userData = docSnap.data() as User;
					setUser(userData);
				} else {
					console.warn("No user document found");
					setUser(null);
				}
			} else {
				setUser(null);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, [setLoading, setUser]);

	if (loading) {
		return <LoadingSpinner />;
	}

	if (!user) {
		return <Navigate to="/sign-up" replace />;
	}
	return <Outlet />;
};

export default ProtectedRoute;
