import { IoCloseSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Filter.module.css";
import useSpecialties from "../../hooks/useSpecialties";
import { useState } from "react";

const Filter = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const previousPath = location.state?.from || "/";
	const specialties = useSpecialties();

	const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);

	const handleCheckboxChange = (specialty: string) => {
		setSelectedSpecialties((prev) =>
			prev.includes(specialty)
				? prev.filter((s) => s !== specialty)
				: [...prev, specialty]
		);
	};

	const handleApplyFilters = () => {
		if (selectedSpecialties.length === 0) return;

		const query = selectedSpecialties.join(",");
		if (previousPath === "/") {
			navigate(`/find-handyman?specialties=${encodeURIComponent(query)}`);
		} else {
			navigate(`${previousPath}?specialties=${encodeURIComponent(query)}`);
		}
	};

	return (
		<div className="vh-100 container py-2">
			<div className="d-flex justify-content-end">
				<IoCloseSharp
					className=""
					style={{ fontSize: "20px" }}
					onClick={() => navigate(previousPath)}
				/>
			</div>
			<div className="d-flex justify-content-between py-3">
				<p className="font-size-20 font-weight-700">Filter</p>
				<p
					style={{ color: "#2B67F6" }}
					onClick={() => setSelectedSpecialties([])}
				>
					Reset all
				</p>
			</div>
			<div className="font-size-14">
				<p className="mb-0 font-weight-700 py-2" style={{ color: "#939393" }}>
					Location
				</p>
				<div className="d-flex align-items-center justify-content-between">
					<div
						className="col-6"
						style={{
							backgroundColor: "#F2F4F7",
							borderTopLeftRadius: "13px",
							borderBottomLeftRadius: "13px",
						}}
					>
						<button className="orange-btn w-100">Phone prefix</button>
					</div>
					<div className="col-6">
						<button
							className="border-0 w-100"
							style={{
								color: "#939393",
								backgroundColor: "#F2F4F7",
								padding: "13px 10px",
								borderTopRightRadius: "13px",
								borderBottomRightRadius: "13px",
							}}
						>
							Distance
						</button>
					</div>
				</div>
				<div className="py-3">
					<input
						type="text"
						placeholder="Zip code"
						className={`form-control ${styles.inputField}`}
					/>
				</div>
			</div>
			<div>
				<p
					className="mb-0 font-weight-700 py-2 font-size-14"
					style={{ color: "#939393" }}
				>
					Type of Service
				</p>
				{specialties.map((specialty) => (
					<div
						key={specialty.id}
						className="d-flex gap-2 font-size-14 font-weight-500 mb-2"
					>
						<input
							type="checkbox"
							className="scale-150 mr-2"
							checked={selectedSpecialties.includes(specialty.name)}
							onChange={() => handleCheckboxChange(specialty.name)}
						/>
						<label htmlFor="" style={{ color: "#575757" }}>
							{specialty.name}
						</label>
					</div>
				))}
			</div>
			<div className="py-2">
				<button onClick={handleApplyFilters} className="orange-btn">
					Use the filters
				</button>
			</div>
		</div>
	);
};

export default Filter;
