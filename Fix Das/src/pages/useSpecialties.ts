import { useEffect, useState } from "react";
import { Specialty } from "../types/types";

const useSpecialties = () => {
	const [specialties, setSpecialties] = useState<Specialty[]>([]);

	useEffect(() => {
		const fetchSpecialties = async () => {
			try {
				const response = await fetch("http://localhost:5000/specialties");
				const data: Specialty[] = await response.json();
				setSpecialties(data);
			} catch (error) {
				console.error("Error fetching specialties:", error);
			}
		};

		fetchSpecialties();
	}, []);

	return specialties;
};

export default useSpecialties;
