import { IoCloseSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const Filter = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const previousPath = location.state?.from || "/";
	navigate(previousPath);

	return (
		<div className="vh-100 container py-2">
			<div className="d-flex justify-content-end">
				<IoCloseSharp
					className=""
					style={{ fontSize: "20px" }}
					onClick={() => navigate(previousPath)}
				/>
			</div>
		</div>
	);
};

export default Filter;
